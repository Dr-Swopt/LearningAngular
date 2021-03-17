import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSkype } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { flyInOut } from '../animations/animation';
import { FeedbackService } from '../services/feedback.service';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class ContactComponent implements OnInit {

  formErrors : any = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages : any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 3 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 3 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;
  faSkype = faSkype;

  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  feedbackComment! : any ;
  feedErrMess!: string;
  activeSpinner: boolean = false;
  activeFeedbackPreview = false;

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.activeSpinner = true;
    this.feedbackService.putFeedback(this.feedbackForm.value)
      .subscribe(data => {
        this.feedbackComment = data;
     },
        errmess => {
      console.log(<any>errmess);
    }, () => {
        this.activeSpinner = false;
        this.handleFeedbackPreview();
    });
    this.feedbackForm.reset();
  }

  handleFeedbackPreview() {
    this.activeFeedbackPreview = true;
    setTimeout(() => {
      this.activeFeedbackPreview = false;
    }, 5000);
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
