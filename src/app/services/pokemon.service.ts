import { Injectable } from "@angular/core";
import { Pokemon } from "../shared/pokemon";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { POKEMONS } from "../shared/pokemons";
/* let POKEMONS : Pokemon[] = require("../shared/pokemon.json"); */

@Injectable({
    providedIn: "root"
})
export class PokemonService {

    getPokemons(): Observable<Pokemon[]> {
      return of(POKEMONS).pipe(delay(700));
    }

    getPokemon(id: number): Observable<Pokemon> {
        return of(POKEMONS.filter((pokemon) => pokemon.id === id)[0]).pipe(delay(500));
    }

}


