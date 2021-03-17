import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../shared/pokemon';
import { Location } from '@angular/common';
import { expand, flyInOut, visibility } from '../animations/animation';
import { switchMap } from 'rxjs/operators';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.component.html',
  styleUrls: ['./pokemondetail.component.scss'],
  animations: [ visibility()]
})
export class PokemondetailComponent implements OnInit {

  pokemon!: Pokemon;
  pokemonIds!: number[];
  errMess!: string;
  pokemonErrMess!: string;
  visibility = 'shown';
  prev!: number;
  next!: number;
  faLeft = faAngleLeft;
  faRight = faAngleRight;
  constructor(private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonIds().subscribe(pokemonIds => this.pokemonIds = pokemonIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.pokemonService.getPokemon(+params['id']);}))
    .subscribe(pokemon => { this.pokemon = pokemon; this.setPrevNext(pokemon.id); this.visibility = 'shown';},
    errmess => this.pokemonErrMess = <any>errmess);
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    const index = this.pokemonIds.indexOf(dishId);
    this.prev = this.pokemonIds[(this.pokemonIds.length + index - 1) % this.pokemonIds.length];
    this.next = this.pokemonIds[(this.pokemonIds.length + index + 1) % this.pokemonIds.length];
  }

}

