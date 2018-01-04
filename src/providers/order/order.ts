import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../../models/order/order.model';

import { APP_CONFIG } from "../app-config/app-config.constants";
import { IAppConfig } from "../app-config/app-config.interface";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderProvider {

  private orderUrl: string;

  constructor(@Inject( APP_CONFIG ) private config: IAppConfig, public http: HttpClient) {
    this.orderUrl = config.APP_URL + '/order';
    // console.log('Hello OrderProvider Provider');
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order, httpOptions).pipe(
      tap((order: Order) => console.log(`added order w/ id=${order.id}`)),
      // catchError(console.log('addHero'))
      // catchError(this.handleError<Order>('addHero'))
    );
  }

}
