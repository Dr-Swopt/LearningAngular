import { Injectable } from "@angular/core";
import { Pokemon } from "../shared/pokemon";
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from "./ProcessHTTPMsg.service";
import { baseURL } from "../shared/baseUrl";
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

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService){}

    getPokemons(): Observable<Pokemon[]> {
      return this.http.get<Pokemon[]>(baseURL + 'pokemons/')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPokemon(id: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(baseURL + 'pokemons/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPokemonIds(): Observable<string[] | any> {
      return this.getPokemons().pipe(map(pokemons => pokemons.map(pokemon => pokemon._id)))
        .pipe(catchError(error => error));
    }
}


