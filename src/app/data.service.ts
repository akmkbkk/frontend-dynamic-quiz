import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  private REST_API_SERVER = "http://localhost:8080/quiz/";
  private slash = "/";

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(()=> new Error(errorMessage));
  }

  public sendGetRequest(fileToLoad:string,endPoint:string){
    return this.httpClient.get(this.REST_API_SERVER+
      endPoint+
      this.slash+
      fileToLoad).pipe(catchError(this.handleError));
  }
}
