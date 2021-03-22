import { Component, OnInit } from '@angular/core';
import { faAddressCard, faBars, faHeart, faHome, faInfo, faJedi, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
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
  faLogin = faSignInAlt;
  faLogout = faSignOutAlt;
  faLove = faHeart;

  username: string = undefined as any;
  subscription!: Subscription;

  constructor(public dialog: MatDialog,
    private authService: AuthService ) { }

    ngOnInit() {
      this.authService.loadUserCredentials();
      this.subscription = this.authService.getUsername()
        .subscribe(name => { console.log(name); this.username = name; });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

      loginRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }

    logOut() {
      this.username = undefined as any;
      this.authService.logOut();
    }

}
