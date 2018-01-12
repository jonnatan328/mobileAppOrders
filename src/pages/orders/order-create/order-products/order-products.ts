import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { ClientProvider } from "../../../../providers/client/client";
import { OrdersDataSharedProvider } from "../../../../providers/orders-data-shared/orders-data-shared";
import { MessageProvider } from "../../../../providers/message/message";

import { ProductEnabled } from "../../../../models/product/product-enabled.model";

@Component({
  selector: 'page-order-products',
  templateUrl: 'order-products.html',
})
export class OrderProductsPage {

  private productsEnabled: ProductEnabled[];
  private productsAdded: any;
  private orderGeneral: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private clientProvider: ClientProvider,
    private ordersDataSharedProvider: OrdersDataSharedProvider,
    private messageProvider: MessageProvider,
    public events: Events) {

  }

  ionViewWillEnter() {
    this.setProductsVariables();
  }

  setProductsVariables() {
    this.productsEnabled = this.ordersDataSharedProvider.getData('productsEnabled');
    this.productsAdded = this.ordersDataSharedProvider.getData('productsAdded');
    this.orderGeneral = this.ordersDataSharedProvider.getData('orderGeneral');
    this.setTotal();
  }

  sendProductToCart(clientProduct: any, indexClientProduct: number) {
    if (!clientProduct.state) {
      this.messageProvider.error("Debe seleccionar horneado o congelado.", null);
      return;
    }
    if (!clientProduct.amount) {
      this.messageProvider.error("Debe ingresar la cantidad.", null);
      return;
    }

    let product = this.buildProduct(clientProduct, indexClientProduct);

    if (this.productsAdded.length == 0) {
      this.productsAdded.push(product);
    } else {
      let index = this.productsAdded.indexOf(product);
      if (index != -1) {
        this.messageProvider.error("Ya se agregó el producto", null);
        return;
      }
      this.productsAdded.push(product);
    }

    this.setTotal();
    this.sendAmountProductsAdded();

  }

  setTotal() {
    let total:number = 0;
    for (let product of this.productsAdded) {
      total += product.subtotal;
    }
    this.orderGeneral.total = total;
  }


  buildProduct(clientProduct, indexClientProduct) {
    let currentProduct = null;
    let rawProduct = null;
    let bakedProduct = null;
    let unitsPack = clientProduct.product.unitsPack;
    let amount = parseInt(clientProduct.amount);
    let state = clientProduct.state;

    delete clientProduct.product.items;
    delete clientProduct.product.price;
    delete clientProduct.product.name;
    delete clientProduct.state;
    clientProduct.amount = '';

    amount = this.roundAmount(amount, unitsPack);

    if (state == 'frozen' && !clientProduct.rawProduct) {
      rawProduct = {
        clientProduct: clientProduct.id,
        name: clientProduct.customName ? clientProduct.customName : clientProduct.product.shortName,
        amount: amount,
        price: clientProduct.customPrice,
        baked: false,
        indexClientProduct: indexClientProduct,
        unitsPack: unitsPack,
        subtotal: amount * clientProduct.customPrice,
      }
      clientProduct.rawProduct = rawProduct;
    } else if (state == 'baked' && !clientProduct.bakedProduct) {
      console.log('baked')
      bakedProduct = {
        clientProduct: clientProduct.id,
        name: clientProduct.customName ? clientProduct.customName : clientProduct.product.shortName,
        amount: amount,
        price: clientProduct.customPrice,
        baked: true,
        indexClientProduct: indexClientProduct,
        unitsPack: unitsPack,
        subtotal: amount * clientProduct.customPrice,
      }
      clientProduct.bakedProduct = bakedProduct;
    } else if (!state) {
      return;
    }

    if (state == 'baked') {
      currentProduct = clientProduct.bakedProduct;
    } else if (state == 'frozen') {
      currentProduct = clientProduct.rawProduct;
    }

    return currentProduct;

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


  removeProductCart(clientProduct: any, type: string) {
    let indexAdded: number;

    if (type == 'baked') {
      indexAdded = this.productsAdded.indexOf(clientProduct.bakedProduct);
      delete clientProduct.bakedProduct;
    } else {
      indexAdded = this.productsAdded.indexOf(clientProduct.rawProduct);
      delete clientProduct.rawProduct;
    }

    this.productsAdded.splice(indexAdded, 1);
    this.setTotal();
    this.sendAmountProductsAdded();
  }


  sendAmountProductsAdded() {
    let amountProducts = this.productsAdded.length;
    this.events.publish("amountProductsCart", amountProducts);
  }

}
