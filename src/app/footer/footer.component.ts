import { Component, OnInit } from '@angular/core';
import { faEnvelope, faFax, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faYoutube = faYoutube;
  faLinkedin = faLinkedin;

  constructor() { }

  ngOnInit(): void {
  }

}
