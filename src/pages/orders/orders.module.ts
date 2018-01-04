import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { OrdersPage } from './orders';
import { OrderCreatePage } from './order-create/order-create';
import { OrderMylistPage } from './order-mylist/order-mylist';
import { ShoppingCartPage } from './order-create/shopping-cart/shopping-cart';
import { OrderInfoPage } from './order-create/order-info/order-info';
import { OrderProductsPage } from './order-create/order-products/order-products';


@NgModule({
  declarations: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage,
    ShoppingCartPage,
    OrderInfoPage,
    OrderProductsPage
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
  ],
  entryComponents: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage,
    ShoppingCartPage,
    OrderInfoPage,
    OrderProductsPage
  ],
  exports: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage,
    ShoppingCartPage,
    OrderInfoPage,
    OrderProductsPage
  ]
})
export class OrdersPageModule {}
