import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { faAngleLeft, faAngleRight, faBackspace, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { Comment } from '../shared/comment';
import { expand, flyInOut, visibility } from '../animations/animation';
import { FavouriteService } from '../services/favourite.service';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  formErrors : any = {
    'comment': ''
  };

  validationMessages : any = {
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 10 characters long.',
      'maxlength':     'Comment cannot be more than 105 characters long.'
    },
  };

  @ViewChild('cform') commentFormDirective: any;
  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;
  faLeft = faAngleLeft;
  faRight = faAngleRight;
  faBack = faBackspace;
  faLike = faHeart;
  faUnlike = faHeartBroken;
  errMess! : string;
  dishcopy! : Dish;
  dishErrMess!: string;
  visibility = 'shown';
  favourite = false;

  commentsForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  comments!: Comment;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private favouriteService: FavouriteService) { }

    ngOnInit() {
      this.createForm();

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish._id);
      this.visibility = 'shown';
      this.favouriteService.isFavourite(this.dish._id)
      .subscribe(resp => { console.log(resp); this.favourite = <boolean>resp.exists; },
          err => console.log(err));
    },
    errmess => this.errMess = <any>errmess);
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentsForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.dishservice.postComment(this.dish._id, this.commentsForm.value)
      .subscribe(dish => this.dish = <Dish>dish);
    this.commentFormDirective.resetForm();
    this.commentsForm.reset({
      rating: 5,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentsForm) { return; }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  addToFavourites() {
    if (!this.favourite) {
      this.favouriteService.postFavourite(this.dish._id)
        .subscribe(favourites => { console.log(favourites); this.favourite = true; });
    }
  }
}
