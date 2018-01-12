import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import moment from 'moment';

@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  private order:any;
  private deliveryDate: any;
  private createdAt: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.order = navParams.get('order');
    console.log(this.order)
    this.createdAt = moment(this.order.created_at).utcOffset(0).format("DD/MM/YYYY h:mm A");
    this.deliveryDate = moment(this.order.delivery_date).utcOffset(0).format("DD/MM/YYYY");
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
