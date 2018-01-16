import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController, Events } from 'ionic-angular';

import { OrdersDataSharedProvider } from "../../../../providers/orders-data-shared/orders-data-shared";
import { OrderProvider } from "../../../../providers/order/order";
import { MessageProvider } from "../../../../providers/message/message";

import { OrderResumePage } from '../order-resume/order-resume';
import { OrderMylistPage } from '../../order-mylist/order-mylist';

import { ClientEmployee } from "../../../../models/client-employee/client-employee.model";
import { Order } from "../../../../models/order/order.model";

import moment from 'moment';

@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage {

  // Declarations of the variables.
  private order: any;
  private clientEmployees: Array<ClientEmployee>;
  private tomorrow: string;
  private hourValues: Array<number>;
  private productsAdded: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ordersDataSharedProvider: OrdersDataSharedProvider,
    private orderProvider: OrderProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private messageProvider: MessageProvider,
    public events: Events) {

    /**
    * Create the order object.
    */
    this.order = {};
  }

  /**
  * Run the code when the page was load.
  */
  ionViewDidLoad() {
    this.initialSetting()
  }

  /**
  * set the initial setting.
  */
  initialSetting() {
    // Initial setting for the delivery date.
    this.tomorrow = moment().add(1, 'days').toISOString();

    // Get the order data from the service.
    this.order = this.ordersDataSharedProvider.getData('orderInfo');
    this.clientEmployees = this.order.clientEmployees;

    // Validate the initial deliveryDate.
    this.validateDeliveryDate(this.order.deliveryDate);

    // The hours enabled to request the delivery time.
    this.hourValues = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }

  /**
  * Set the final delivery time from the initial delivery time.
  */
  setFinalDeliveryTime = () => {
    let defaultFinalTime: any;
    defaultFinalTime = moment(this.order.initialDeliveryTime).utcOffset(0);
    defaultFinalTime.add(2, 'hours');
    this.order.finalDeliveryTime = defaultFinalTime.toISOString();
  }

  /**
  * Function to validate the initial or final time in order to that the final time wont be smaller than
  * initial time and the initial time wont be higher than final time.
  */
  validateTime(currentDeliveryTime, type) {
    let finalTimeMoment: any;
    let initialTimeMoment: any;
    let finalHour: number;
    let initialHour: number;

    if (type == 'final') {
      finalTimeMoment = moment(currentDeliveryTime).utcOffset(0);
      initialTimeMoment = moment(this.order.initialDeliveryTime).utcOffset(0);
    } else {
      finalTimeMoment = moment(this.order.finalDeliveryTime).utcOffset(0);
      initialTimeMoment = moment(currentDeliveryTime).utcOffset(0);
    }

    finalHour = finalTimeMoment.hours();
    initialHour = initialTimeMoment.hours();

    if (finalHour <= initialHour || initialHour >= finalHour) {
      setTimeout(() => {
        this.setFinalDeliveryTime();
      }, 15)
    }
  }

  /**
  * Function to validate that the delivery date is not sunday.
  */
  validateDeliveryDate(currentDeliveryDate) {
    let deliveryDateMoment: any;
    deliveryDateMoment = moment(currentDeliveryDate).utcOffset(0);
    if (deliveryDateMoment.days() == 0) {
      setTimeout(() => {
        this.order.deliveryDate = deliveryDateMoment.add(1, 'days').toISOString();
      }, 15)
    }
  }

  /**
  * Function to show modal with the resume of the order.
  */
  showOrderResume() {
    this.productsAdded = this.ordersDataSharedProvider.getData('productsAdded');
    console.log(this.productsAdded);
    if (this.productsAdded.length == 0) {
      let alertProducts = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Debe seleccionar al menos un producto.',
        buttons: ['OK']
      });
      alertProducts.present();
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();

    let productsToOrder = {};

    for (let product of this.productsAdded) {
      if (!productsToOrder[product.clientProduct]) {
        productsToOrder[product.clientProduct] = { id: product.clientProduct, amount: product.amount };
      } else {
        productsToOrder[product.clientProduct].amount += product.amount;
      }
    }

    this.orderProvider.validateMinOrderPrice({productsToOrder: productsToOrder})
      .subscribe(data => {
        loading.dismiss();
        if (!data.isValid) {
          let alertTotalPrice = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'El valor minimo del pedido debe ser de $' + data.minOrderPrice,
            buttons: ['OK']
          });
          alertTotalPrice.present();
          return;
        } else {
          let params = {
            order: this.buildOrderObject(false)
          }

          let orderResume = this.modalCtrl.create(OrderResumePage, params, {
            enableBackdropDismiss: true,
            cssClass: 'order-resume-modal'
          });

          orderResume.onDidDismiss(confirm => {
            if (confirm) {
              this.createOrder();
            }
          });
          orderResume.present();
        }

      }
      );

  }

  /**
  * Function to create an order.
  */
  createOrder() {
    console.log('Creando pedido...')
    let orderParams = this.buildOrderObject(true);

    let loading = this.loadingCtrl.create({
      content: 'Creando el pedido...'
    });

    loading.present();
    this.orderProvider.createOrder(orderParams as Order)
      .subscribe(response => {
        loading.dismiss();
        this.cleanData();
        let alertSuccessCreate = this.alertCtrl.create({
          title: 'Proceso exitoso!',
          subTitle: "El pedido ha quedado registrado con fecha de entrega: " + moment(response.deliveryDate).utcOffset(0).format("DD/MM/YYYY"),
          buttons: ['OK']
        });
        alertSuccessCreate.present();
      },
      error => {
        this.messageProvider.error('No se pudo crear el pedido, intente más tarde.', loading);
      });

  }

  /**
  * Build the order project with attributes necessary.
  */
  buildOrderObject(toCreate: boolean): any {
    let productsToOrder: Array<any> = [];
    let product: any;

    let initialTimeMoment: any;
    let finalTimeMoment: any;

    let initialHour: number;
    let finalHour: number;
    let initialMinute: number;
    let finalMinute: number;

    let tmpInitialTime: string;
    let tmpFinalTime: string;
    let tmpDeliveryDate: number;
    let tmpClientEmployee: number;
    let tmpAdditionalInformation: string;

    let orderCredentials: any;

    initialTimeMoment = moment(this.order.initialDeliveryTime).utcOffset(0);
    finalTimeMoment = moment(this.order.finalDeliveryTime).utcOffset(0);

    initialHour = initialTimeMoment.hours();
    finalHour = finalTimeMoment.hours();
    initialMinute = initialTimeMoment.minutes();
    finalMinute = finalTimeMoment.minutes();

    for (let productAdded of this.productsAdded) {
      product = {
        client_product: productAdded.clientProduct,
        amount: productAdded.amount,
        baked: productAdded.baked,
      }
      if(!toCreate){
        product.name = productAdded.name;
      }
      productsToOrder.push(product);
    }

    tmpDeliveryDate = moment(this.order.deliveryDate).valueOf();
    tmpClientEmployee = this.order.clientEmployee;
    tmpAdditionalInformation = this.order.additionInformation;

    if (initialMinute <= 9) {
      tmpInitialTime = initialHour + ':0' + initialMinute;
    } else {
      tmpInitialTime = initialHour + ':' + initialMinute;
    }

    if (finalMinute <= 9) {
      tmpFinalTime = finalHour + ':0' + finalMinute;
    } else {
      tmpFinalTime = finalHour + ':' + finalMinute;
    }

    orderCredentials = {
      deliveryDate: tmpDeliveryDate,
      clientEmployee: tmpClientEmployee,
      initialSuggestedTime: tmpInitialTime,
      finalSuggestedTime: tmpFinalTime,
      additionalInformation: tmpAdditionalInformation,
      productsToOrder: productsToOrder
    }

    console.log(orderCredentials);
    return orderCredentials;

  }

  cleanData(){
    let productsEnabled = this.ordersDataSharedProvider.getData('productsEnabled');
    let productAdded: any;
    for (productAdded of this.productsAdded) {
      if (productAdded.baked) {
        delete productsEnabled[productAdded.indexClientProduct].bakedProduct;
      } else {
        delete productsEnabled[productAdded.indexClientProduct].rawProduct;
      }
    }
    this.productsAdded.splice(0);
    let amountProducts = this.productsAdded.length;
    this.events.publish("amountProductsCart", amountProducts);
  }

}
