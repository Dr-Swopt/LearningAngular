import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSkype } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faFax, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;
  faSkype = faSkype;

  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
  }

}
