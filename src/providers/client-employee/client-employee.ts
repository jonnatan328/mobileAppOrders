import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { APP_CONFIG } from "../app-config/app-config.constants";
import { IAppConfig } from "../app-config/app-config.interface";

import { ClientEmployee } from "../../models/client-employee/client-employee.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClientEmployeeProvider {

  private clientEmployeeUrl: string;

  constructor(@Inject( APP_CONFIG ) private config: IAppConfig, public http: HttpClient) {
      this.clientEmployeeUrl = config.APP_URL + '/clientEmployee';
  }

  /** GET client employees from the server */
  getClientEmployees (): Observable<ClientEmployee[]> {
    return this.http.get<ClientEmployee[]>(this.clientEmployeeUrl + '/getEmployeesByClient')
      .pipe(
        tap(ClientEmployee => console.log('fetched client employees')),
      );
  }

}
