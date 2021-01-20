import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LeaderdetailComponent } from './leaderdetail/leaderdetail.component';
import { DynamicsComponent } from './dynamics/dynamics.component';
import { PromiseComponent } from './promise/promise.component';
import { PokemondetailComponent } from './pokemondetail/pokemondetail.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'about', component:AboutComponent },
  { path: 'leaderdetail/:id', component: LeaderdetailComponent},
  { path: 'dynamics', component: DynamicsComponent},
  { path: 'promise', component: PromiseComponent },
  { path: 'pokemondetail/:id', component:PokemondetailComponent }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
