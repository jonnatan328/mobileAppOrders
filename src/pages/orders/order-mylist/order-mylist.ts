import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { OrderDetailsPage } from "./order-details/order-details";

import { OrderProvider } from "../../../providers/order/order";
import { OrdersDataSharedProvider } from "../../../providers/orders-data-shared/orders-data-shared";
import { MessageProvider } from "../../../providers/message/message";

// @IonicPage()
@Component({
  selector: 'page-order-mylist',
  templateUrl: 'order-mylist.html',
})
export class OrderMylistPage {

  private orders: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public modalCtrl: ModalController,
    private ordersDataSharedProvider: OrdersDataSharedProvider,
    private messageProvider: MessageProvider,
    public loadingCtrl: LoadingController,) {
      console.log('order my list')
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    console.log('order my list will enter');
    this.getOrders();
  }

  getOrders() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();
    this.orderProvider.getOrdersByClient()
      .subscribe(
      data => {
        loading.dismiss();
        this.orders = data;
      },
      error => {
        this.messageProvider.error('verifique la conexión a internet', loading);
        console.log(error)
      });
  }

  showDetails(order: any){
    let orderDetailsModal = this.modalCtrl.create(OrderDetailsPage, {order: order}, {
      enableBackdropDismiss: true,
      cssClass: 'order-details-modal'
    });
    orderDetailsModal.present();
  }

}
