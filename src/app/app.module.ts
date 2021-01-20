import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { AppRootComponent } from './app-root/app-root.component';
import { MatListModule }from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { LeaderdetailComponent } from './leaderdetail/leaderdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DynamicsComponent } from './dynamics/dynamics.component';
import { PromiseComponent } from './promise/promise.component';
import { PokemondetailComponent } from './pokemondetail/pokemondetail.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AppRootComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LeaderdetailComponent,
    LoginComponent,
    DynamicsComponent,
    PromiseComponent,
    PokemondetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule ,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    LoginComponent
],
  providers: [ DishService , PromotionService, LeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
