import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';


import { Storage } from '@ionic/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private tokenRequest: string;
  constructor(private storage: Storage) {
    this.getToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenRequest) {
      let authHeader = this.tokenRequest;
      req = req.clone({ setHeaders: { authorization: authHeader } });
    }
    console.log(req);
    return next.handle(req);
  }

  async getToken() {
    let result = await this.storage.get('auth_token');
    this.tokenRequest = 'JWT ' + result;
  }

}
