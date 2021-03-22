import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../shared/pokemon';
import { Location } from '@angular/common';
import { expand, flyInOut, visibility } from '../animations/animation';
import { switchMap } from 'rxjs/operators';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FavouriteService } from '../services/favourite.service';
@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.component.html',
  styleUrls: ['./pokemondetail.component.scss'],
  animations: [ visibility()]
})
export class PokemondetailComponent implements OnInit {

  pokemon!: Pokemon;
  pokemonIds!: string[];
  errMess!: string;
  pokemonErrMess!: string;
  visibility = 'shown';
  prev!: string;
  next!: string;
  faLeft = faAngleLeft;
  faRight = faAngleRight;
  favourite: boolean = false;
  constructor(private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonIds().subscribe(pokemonIds => this.pokemonIds = pokemonIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.pokemonService.getPokemon(params['id']); }))
    .subscribe(pokemon => {
      this.pokemon = pokemon;
      this.setPrevNext(pokemon._id);
      this.visibility = 'shown';
      this.favouriteService.isFavourite(this.pokemon._id)
      .subscribe(resp => { console.log(resp); this.favourite = <boolean>resp.exists; },
          err => console.log(err));
    },
    errmess => this.errMess = <any>errmess);
    }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(pokemonId: string) {
    const index = this.pokemonIds.indexOf(pokemonId);
    this.prev = this.pokemonIds[(this.pokemonIds.length + index - 1) % this.pokemonIds.length];
    this.next = this.pokemonIds[(this.pokemonIds.length + index + 1) % this.pokemonIds.length];
  }

}

