import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { OrdersPage } from './orders';
import { OrderCreatePage } from './order-create/order-create';
import { OrderMylistPage } from './order-mylist/order-mylist'


@NgModule({
  declarations: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
  ],
  entryComponents: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage
  ],
  exports: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage
  ]
})
export class OrdersPageModule {}
