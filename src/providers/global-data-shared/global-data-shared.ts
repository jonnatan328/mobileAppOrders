import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class GlobalDataSharedProvider {

  dataObject: any = {};

  constructor(public http: HttpClient) {
    console.log('Hello GlobalDataSharedProvider Provider');
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
