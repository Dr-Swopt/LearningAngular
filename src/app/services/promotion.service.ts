import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(700));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).pipe(delay(800));
  }

  getPromotion(id: number): Observable<Promotion>{
    return of(PROMOTIONS.filter((promotion) => promotion.id === id)[0]).pipe(delay(700));
  }

  constructor() { }
}
