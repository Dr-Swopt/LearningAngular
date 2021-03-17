import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Promotion } from '../shared/promotion';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './ProcessHTTPMsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

promoUrl = "http://localhost:3000/promotions/"

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(this.promoUrl)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(this.promoUrl + '?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: number): Observable<Promotion>{
  return this.http.get<Promotion>(this.promoUrl + id)
  .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  constructor(private http: HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) { }
}
