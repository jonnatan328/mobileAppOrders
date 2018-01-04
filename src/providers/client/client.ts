import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { APP_CONFIG } from "../app-config/app-config.constants";
import { IAppConfig } from "../app-config/app-config.interface";

import { ProductEnabled } from "../../models/product/product-enabled.model"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClientProvider {

  private clientUrl: string;

  constructor(@Inject( APP_CONFIG ) private config: IAppConfig, public http: HttpClient) {
    this.clientUrl = config.APP_URL + '/client';
  }

  /** GET products enabled from the server */
  getProductsEnabled (): Observable<ProductEnabled[]> {
    return this.http.get<ProductEnabled[]>(this.clientUrl + '/getProductsEnabled')
      .pipe(
        // map(productsEnabled[] => console.log(productsEnabled[0])),
        tap(productsEnabled => console.log(`fetched heroes`)),
        // catchError(this.handleError('getHeroes', []))
      );
  }
}
