import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OrderMylistPage } from './order-mylist/order-mylist'
import { OrderCreatePage } from './order-create/order-create';

/**
 * Generated class for the OrdersPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {

  orderMylistRoot = OrderMylistPage
  orderCreateRoot = OrderCreatePage


  constructor(public navCtrl: NavController) {}

}
