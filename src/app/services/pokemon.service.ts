import { Injectable } from "@angular/core";
import { Pokemon } from "../shared/pokemon";
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from "./ProcessHTTPMsg.service";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: "root"
})
export class PokemonService {

  pokemonsURL = 'http://localhost:3000/pokemon/';

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService){}

    getPokemons(): Observable<Pokemon[]> {
      return this.http.get<Pokemon[]>(this.pokemonsURL)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPokemon(id: number): Observable<Pokemon> {
        return this.http.get<Pokemon>(this.pokemonsURL + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPokemonIds(): Observable<number[] | any >{
      return this.getPokemons().pipe(map(pokemons => pokemons.map(pokemon => pokemon.id)))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}


