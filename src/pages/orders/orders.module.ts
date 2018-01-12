import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { OrdersPage } from './orders';
import { OrderCreatePage } from './order-create/order-create';
import { OrderMylistPage } from './order-mylist/order-mylist';
import { ShoppingCartPage } from './order-create/shopping-cart/shopping-cart';
import { OrderInfoPage } from './order-create/order-info/order-info';
import { OrderProductsPage } from './order-create/order-products/order-products';
import { OrderResumePage } from './order-create/order-resume/order-resume';
import { OrderDetailsPage } from './order-mylist/order-details/order-details';

import { OrdersDataSharedProvider } from '../../providers/orders-data-shared/orders-data-shared';


@NgModule({
  declarations: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage,
    ShoppingCartPage,
    OrderInfoPage,
    OrderProductsPage,
    OrderResumePage,
    OrderDetailsPage
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
    OrderProductsPage,
    OrderResumePage,
    OrderDetailsPage
  ],
  providers: [
    OrdersDataSharedProvider,
  ],
  exports: [
    OrdersPage,
    OrderCreatePage,
    OrderMylistPage,
    ShoppingCartPage,
    OrderInfoPage,
    OrderProductsPage,
    OrderResumePage,
    OrderDetailsPage
  ]
})
export class OrdersPageModule {}
