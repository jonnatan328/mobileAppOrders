import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

import { ShoppingCartPage } from './shopping-cart/shopping-cart';
import { OrderProductsPage } from './order-products/order-products';
import { OrderInfoPage } from './order-info/order-info';

import { DataSharedProvider } from "../../../providers/data-shared/data-shared";
import { ClientProvider } from "../../../providers/client/client";

// @IonicPage()
@Component({
  selector: 'page-order-create',
  templateUrl: 'order-create.html',
})
export class OrderCreatePage {

  amountProductsRequested: number = 0;
  page: any = 'Productos';
  rootCreateOrderPage: any;
  options: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public modalCtrl: ModalController,
    private dataSharedProvider: DataSharedProvider,
    private clientProvider: ClientProvider) {

    this.options = [
      { title: 'Productos', component: OrderProductsPage },
      { title: 'Detalles', component: OrderInfoPage }
    ];

    events.subscribe('amountProductsCart', (amountProducts) => {
      this.receiveProduct(amountProducts)
    });

    this.requestProductsEnabled();
  }


  requestProductsEnabled() {
    this.clientProvider.getProductsEnabled()
      .subscribe(productsEnabled => {
        this.dataSharedProvider.setData('productsEnabled', productsEnabled);
        this.rootCreateOrderPage = OrderProductsPage;
        console.log(productsEnabled);
      }
      );
  }

  goToPage(page) {
    this.rootCreateOrderPage = page.component;
  }

  receiveProduct(amountProducts) {
    this.amountProductsRequested = amountProducts;
  }

  showShoppingCart() {
    console.log('shoppingCartModal')
    let modal = this.modalCtrl.create(ShoppingCartPage, {}, {
      enableBackdropDismiss: true,
      cssClass: 'shopping-cart-modal'
    });
    modal.present();
  }

}
