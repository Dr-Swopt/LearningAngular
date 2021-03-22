import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ProcessHTTPMsgService } from './ProcessHTTPMsg.service';
import { baseURL } from '../shared/baseUrl';
import { FavouriteExists } from '../shared/favouriteExist';
import { Favourite } from '../shared/favourites';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient,
    public auth: AuthService,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFavourites(): Observable<Favourite> {
    if (!this.auth.isLoggedIn()) {
      return null as any;
    }
    return this.http.get<Favourite>(baseURL + 'favourites')
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  postFavourites(dishids: any) {
    return this.http.post(baseURL + 'favourites/', dishids)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  isFavourite(id: string): Observable<FavouriteExists> {
    if (!this.auth.isLoggedIn()) {
      return of({ exists: false, favorites: null }) as any;
    }
    return this.http.get<FavouriteExists>(baseURL + 'favourites/' + id)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  postFavourite(id: string) {
    return this.http.post(baseURL + 'favourites/' + id, {})
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  deleteFavourite(id: string) {
    return this.http.delete(baseURL + 'favourites/' + id)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }
}
