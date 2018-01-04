import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataSharedProvider {

  dataObject: any = {};

  constructor(public http: HttpClient) {
    // console.log('Hello DataSharedProvider Provider');
  }

  setData(key: string, value: any) {
    this.dataObject[key] = value;
  }

  getData(key: string){
    return this.dataObject[key];
  }

}
