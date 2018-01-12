import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, ViewController, ActionSheetController, AlertController } from 'ionic-angular';

import { OrdersDataSharedProvider } from "../../../../providers/orders-data-shared/orders-data-shared";
import { MessageProvider } from "../../../../providers/message/message";


@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  private productsAdded: Array<any>;
  private productsEnabled: Array<any>;
  private orderGeneral: any;

  constructor(public viewCtrl: ViewController,
    private ordersDataSharedProvider: OrdersDataSharedProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public events: Events,
    private messageProvider: MessageProvider,) {

      this.productsAdded = [];
      this.productsEnabled = [];
      this.orderGeneral = {};
  }

  ionViewDidLoad() {
    this.setProductsVariables();
  }

  setProductsVariables() {

    this.productsAdded = this.ordersDataSharedProvider.getData('productsAdded');
    this.productsEnabled = this.ordersDataSharedProvider.getData('productsEnabled');
    this.orderGeneral = this.ordersDataSharedProvider.getData('orderGeneral');
  }

  dismiss() {
    let amountProducts = this.productsAdded.length;
    this.viewCtrl.dismiss(amountProducts);
  }

  openOptions(product: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: product.name,
      buttons: [
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeProductCart(product);
          }
        }, {
          text: 'Modificar cantidad',
          icon: 'create',
          handler: () => {
            this.modifyAmount(product);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  modifyAmount(product: any) {
    let prompt = this.alertCtrl.create({
      title: 'Modificar cantidad de ' + product.name,
      message: "Ingrese la cantidad que desea asignar al producto.",
      inputs: [
        {
          name: 'amount',
          placeholder: 'Cantidad',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            // product.amount = data.amount;
            product.amount = this.roundAmount(parseInt(data.amount), product.unitsPack);
            product.subtotal = product.amount * product.price;
            this.setTotal();
          }
        }
      ]
    });
    prompt.present();
  }

  removeProductCart(product: any) {
    let indexAdded = this.productsAdded.indexOf(product);
    let clientProduct = this.productsEnabled[product.indexClientProduct];

    this.productsAdded.splice(indexAdded, 1);

    if (product.baked) {
      delete clientProduct.bakedProduct;
    } else {
      delete clientProduct.rawProduct;
    }

    this.setTotal();
  }

  roundAmount(amount: number, unitsPack: number): number {
    if (unitsPack) {
      let mod = amount % unitsPack;

      // Si la cantidad a pedir no es multiplo de las unidades por paquete
      // a la cantidad a pedir se suma la cantidad faltante requerida.
      if (mod != 0) {
        let halfUnitsPack = Math.round(unitsPack / 2);
        let rest = unitsPack - mod;
        if (mod >= halfUnitsPack || amount < unitsPack) {
          amount += rest;
        } else {
          amount -= mod;
        }
        this.messageProvider.succes('La cantidad se redondeó a ' + amount, null);
      }
    }
    return amount;
  }

  setTotal() {
    this.orderGeneral.total = 0;
    for (let product of this.productsAdded) {
      this.orderGeneral.total += product.subtotal;
    }
  }

}
