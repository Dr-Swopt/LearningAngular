import { Component, OnInit } from '@angular/core';
import { faAddressCard, faBars, faHome, faInfo, faJedi, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';
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
  faSignOut = faSignInAlt;
  faDynamics = faJedi;
  faPromise = faGalacticRepublic;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }

}
