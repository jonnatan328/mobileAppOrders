import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OrderMylistPage } from './order-mylist/order-mylist'
import { OrderCreatePage } from './order-create/order-create';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  private tabs: Array<{ title: string, component: any, icon: string }>;

  constructor(public navCtrl: NavController) {
    this.tabs = [
      { title: 'Ver mis pedidos', component: OrderMylistPage, icon: 'list' },
      { title: 'Crear pedido', component: OrderCreatePage, icon: 'create' }
    ];
  }

}
