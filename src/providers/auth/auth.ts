import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthProvider {

  private authUrl = 'http://lafournee.com.co/auth';  // URL to web api

  constructor(public http: HttpClient, private storage: Storage, ) {
    console.log('Hello AuthProvider Provider');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + '/signinUser', { username: username, password: password }, httpOptions)
      .pipe(
      map((response: any) => {
        // login successful if there's a jwt token in the response
        let user = response;
        if (user && user.token) {
          console.log('logged');
          // store jwt token in ionic storage to keep user logged in between page refreshes
          this.storage.set('auth_token', user.token);
        }
      }),
      tap(_ => console.log('logged in user')),
      catchError(this.handleError('login_user'))
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.storage.remove('auth_token');
  }

  // verify if the user is authenticated.
  isAuthenticated(callback): any {
    this.storage.get('auth_token')
      .then((token) => {
        if (token) {
          callback(true);
        } else {
          callback(true);
        }
      })
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
