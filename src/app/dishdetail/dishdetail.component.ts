import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { Comment } from '../shared/comment';
import { expand, visibility } from '../animations/animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [visibility()]
})
export class DishdetailComponent implements OnInit {
  formErrors : any = {
    'author': '',
    'comment': ''
  };

  validationMessages : any = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 3 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 10 characters long.',
      'maxlength':     'Comment cannot be more than 105 characters long.'
    },
  };

  dish!: Dish | null;
  dishIds!: number[];
  prev!: number;
  next!: number;
  faLeft = faAngleLeft;
  faRight = faAngleRight;
  errMess! : string;
  dishcopy! : Dish;
  dishErrMess!: string;
  visibility = 'shown';

  commentsForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  comments!: Comment;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

    ngOnInit() {
      this.createForm();
    }

    setPrevNext(dishId: number) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.dishErrMess = <any>errmess);


    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)] ],
      rate:  5
    });

    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit(){
  this.comments = this.commentsForm.value;
  this.comments.date = new Date().toDateString;
  this.dishcopy.comments.push(this.comments);
  console.log(this.comments);
  this.dishservice.putDish(this.dishcopy)
    .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
        console.log(this.dishcopy);
      },
      errmess => { this.dish = null; this.dishErrMess = <any>errmess; });
  this.createForm();
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

}
