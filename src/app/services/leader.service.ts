import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './ProcessHTTPMsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  leaderUrl = "http://localhost:3000/leadership/";

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(this.leaderUrl)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedleader(): Observable<Leader> {
    return this.http.get<Leader[]>(this.leaderUrl + '?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(this.leaderUrl + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
