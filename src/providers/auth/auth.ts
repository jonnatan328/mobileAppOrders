import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
// import { HTTP } from '@ionic-native/http';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { APP_CONFIG } from "../app-config/app-config.constants";
import { IAppConfig } from "../app-config/app-config.interface";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthProvider {

  private authUrl: string;  // URL to web api
  private user: any;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig,
    public http: HttpClient,
    // private http: HTTP,
    private storage: Storage) {
    this.authUrl = config.APP_URL + '/auth';
    this.user = {};
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + '/signinUser', { username: username, password: password }, httpOptions)
      .pipe(
      map((response: any) => {
        // login successful if there's a jwt token in the response
        let user = response;
        if (user && user.token) {
          // store jwt token in ionic storage to keep user logged in between page refreshes
          localStorage.setItem('auth_token', user.token)
          // return this.storage.set('auth_token', user.token);
        }
      }),
      tap(_ => console.log('logged in user')),
    );
  }

  logout() {
    localStorage.clear();

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

}
