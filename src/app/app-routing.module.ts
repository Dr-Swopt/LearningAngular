import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DynamicsComponent } from './dynamics/dynamics.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemondetailComponent } from './pokemondetail/pokemondetail.component';
import { FavouriteComponent } from './favourite/favourite.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'about', component:AboutComponent },
  { path: 'favourites', component:FavouriteComponent},
  { path: 'dynamics', component: DynamicsComponent},
  { path: 'pokemon', component: PokemonComponent },
  { path: 'pokemondetail/:id', component:PokemondetailComponent }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
