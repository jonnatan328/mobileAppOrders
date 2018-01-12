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
  }

  createOrder(order: Order): Observable<Order> {
    console.log(order);
    return this.http.post<Order>(this.orderUrl + '/create', order, httpOptions).pipe(
      tap((order: Order) => console.log(`added order w/ id=${order.id}`)),
      // catchError(console.log('addOrder'))
      // catchError(this.handleError<Order>('addOrder'))
    );
  }

  validateMinOrderPrice(productsToOrder: any): Observable<any> {
    return this.http.post<any>(this.orderUrl + '/validateMinOrderPrice', productsToOrder, httpOptions).pipe(
      tap((data: any) => console.log('Total price validated')),
      // catchError(console.log(''))
      // catchError(this.handleError<Order>(''))
    );
  }

  getOrdersByClient(): Observable<any[]> {
    return this.http.get<any>(this.orderUrl + '/getByClient')
      .pipe(
        tap(orders => console.log('fetched orders')),
      );
  }

}
