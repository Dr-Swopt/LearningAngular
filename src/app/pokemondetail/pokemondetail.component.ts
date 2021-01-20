import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../shared/pokemon';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.component.html',
  styleUrls: ['./pokemondetail.component.scss']
})
export class PokemondetailComponent implements OnInit {

  pokemon!: Pokemon;

  constructor(private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.pokemonService.getPokemon(id)
    .subscribe((pokemon) => this.pokemon = pokemon);
  }

  goBack(): void {
    this.location.back();
  }

}
