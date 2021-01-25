import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from './ProcessHTTPMsg.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseURL';

@Injectable()
export class FeedbackService {
    constructor(private http: HttpClient,
                private processHTTPMsgService: ProcessHTTPMsgService) { }

     putFeedback(feedback: Feedback) {
         const httpOptions = {
             headers: new HttpHeaders({
                 'Content-Type':  'application/json'
             })
         };
        return this.http.post(`${baseURL}feedback`, feedback, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));
     }
}
