import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {


  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(1000));
  }

  getFeaturedleader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(800));
  }

  getLeader(id: number): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(800));
  }


  constructor() { }
}
