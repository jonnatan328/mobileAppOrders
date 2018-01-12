import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrdersDataSharedProvider {

  dataObject: any = {};

  constructor(public http: HttpClient) {
  }

  setData(key: string, value: any) {
    this.dataObject[key] = value;
  }

  getData(key: string){
    return this.dataObject[key];
  }

  cleanData(){
    this.dataObject = {};
  }

}
