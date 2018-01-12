import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import moment from 'moment';

@Component({
  selector: 'page-order-resume',
  templateUrl: 'order-resume.html',
})
export class OrderResumePage {

  private order: any;
  private deliveryDateFormat: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController) {

    this.order = navParams.get('order');
    this.deliveryDateFormat = moment(this.order.deliveryDate).format("DD/MM/YYYY");
  }

  dismiss(confirm) {
    this.viewCtrl.dismiss(confirm);
  }

}
