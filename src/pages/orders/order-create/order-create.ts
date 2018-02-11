import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, LoadingController, ViewController } from 'ionic-angular';

import { ShoppingCartPage } from './shopping-cart/shopping-cart';
import { OrderProductsPage } from './order-products/order-products';
import { OrderInfoPage } from './order-info/order-info';
import { AuxPage } from '../../aux/aux';

import { OrdersDataSharedProvider } from "../../../providers/orders-data-shared/orders-data-shared";
import { ClientProvider } from "../../../providers/client/client";
import { ClientEmployeeProvider } from "../../../providers/client-employee/client-employee";
import { MessageProvider } from "../../../providers/message/message";

import moment from 'moment';

// @IonicPage()
@Component({
  selector: 'page-order-create',
  templateUrl: 'order-create.html',
})
export class OrderCreatePage {

  private amountProductsRequested: number = 0;
  private page: any = 'Productos';
  private rootCreateOrderPage: any;
  private options: Array<{ title: string, component: any, icon: string }>;
  private orderInfo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public modalCtrl: ModalController,
    private clientEmployeeProvider: ClientEmployeeProvider,
    private ordersDataSharedProvider: OrdersDataSharedProvider,
    private clientProvider: ClientProvider,
    public loadingCtrl: LoadingController,
    public messageProvider: MessageProvider) {

    this.options = [
      { title: 'Productos', component: OrderProductsPage, icon: 'cafe' },
      { title: 'Detalles', component: OrderInfoPage, icon: 'information-circle' }
    ];

    events.subscribe('amountProductsCart', (amountProducts) => {
      this.receiveProduct(amountProducts)
    });

  }

  ionViewDidEnter() {
    console.log('rootCreateOrderPage', this.rootCreateOrderPage)
    this.orderInfo = {};
    this.requestProductsEnabled();
    this.initialSettingOrderInfo();
    this.initialSettingOrderProducts();
    this.requestClientEmployees();
  }

  ionViewWillLeave() {
    this.cleanData();
    this.page = "Productos";
  }


  requestProductsEnabled() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();
    this.clientProvider.getProductsEnabled()
      .subscribe(productsEnabled => {
        this.ordersDataSharedProvider.setData('productsEnabled', productsEnabled);
        this.rootCreateOrderPage = OrderProductsPage;
        loading.dismiss();
        console.log(productsEnabled);
      },
      error => {
        this.messageProvider.error('No se pudo obtener los productos, verifique su conexión', loading);
      }
      );
  }

  requestClientEmployees() {
    this.clientEmployeeProvider.getClientEmployees()
      .subscribe(clientEmployees => {
        this.orderInfo.clientEmployees = clientEmployees;
        this.orderInfo.clientEmployee = this.orderInfo.clientEmployees[0].id;
        this.ordersDataSharedProvider.setData('orderInfo', this.orderInfo);
      }
      );
  }

  initialSettingOrderInfo(){
    let defaultInitialTime: any;
    let defaultFinalTime: any;
    let tomorrow: any;

    // Initial setting for the delivery date.
    tomorrow = moment().utcOffset(0).add(1, 'days').toISOString();
    this.orderInfo.deliveryDate = tomorrow;

    // Initial setting for the initial time.
    defaultInitialTime = moment().utcOffset(0);
    defaultInitialTime.set({ hour: 12, minute: 0, second: 0 });
    this.orderInfo.initialDeliveryTime = defaultInitialTime.format();
    let orderGeneral = {};
    this.ordersDataSharedProvider.setData('orderGeneral', orderGeneral);

    // Initial setting for the final time.
    defaultFinalTime = moment(this.orderInfo.initialDeliveryTime).utcOffset(0);
    defaultFinalTime.add(2, 'hours');
    this.orderInfo.finalDeliveryTime = defaultFinalTime.toISOString();
  }

  initialSettingOrderProducts(){
    this.ordersDataSharedProvider.setData('productsAdded', []);
  }

  cleanData(){
    this.ordersDataSharedProvider.cleanData();
    this.rootCreateOrderPage = AuxPage;
    this.amountProductsRequested = 0;
   }

  goToPage(page) {
    console.log(this.navCtrl.getAllChildNavs());
    this.rootCreateOrderPage = page.component;
  }

  receiveProduct(amountProducts) {
    this.amountProductsRequested = amountProducts;
  }

  showShoppingCart() {
    let shoppingCartModal = this.modalCtrl.create(ShoppingCartPage, {}, {
      enableBackdropDismiss: true,
      cssClass: 'shopping-cart-modal'
    });

    shoppingCartModal.onDidDismiss(amountProducts => {
      this.amountProductsRequested = amountProducts;
    });
    shoppingCartModal.present();
  }

}
