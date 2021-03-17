import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../animations/animation';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../shared/pokemon';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class PromiseComponent implements OnInit {

  pokemons!: Pokemon[];
  selectedPokemon!: Pokemon;
  errMess! : string;

  onSelect(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
   this.pokemonService.getPokemons()
    .subscribe((pokemons) => this.pokemons = pokemons,
    errmess => this.errMess = <any>errmess);
  }
}
