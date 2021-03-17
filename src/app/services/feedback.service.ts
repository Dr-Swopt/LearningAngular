import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from './ProcessHTTPMsg.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable()
export class FeedbackService {

  baseURL = "http://localhost:3000/feedback";
    constructor(private http: HttpClient,
                private processHTTPMsgService: ProcessHTTPMsgService) { }

     putFeedback(feedback: Feedback) {
        return this.http.post(this.baseURL, feedback, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));
     }
}
