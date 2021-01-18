import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard, faBars, faHome, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faHome = faHome;
  faAddressCard = faAddressCard;
  faInfo = faInfo;
  faBars = faBars;

  constructor() { }

  ngOnInit(): void {
  }

}
