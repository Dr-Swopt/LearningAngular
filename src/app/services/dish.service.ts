import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Promise<Dish[]>{
    return of(DISHES).pipe(delay(1000)).toPromise();
  }

  getDish(id: number): Promise<Dish>{
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(1000)).toPromise();
  }

  getFeaturedDish(): Promise<Dish>{
    return of (DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(800)).toPromise();
  }

  constructor() { }
}
