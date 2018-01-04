import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { ClientProvider } from "../../../../providers/client/client";
import { DataSharedProvider } from "../../../../providers/data-shared/data-shared";
import { MessageProvider } from "../../../../providers/message/message";

import { ProductEnabled } from "../../../../models/product/product-enabled.model";

@Component({
  selector: 'page-order-products',
  templateUrl: 'order-products.html',
})
export class OrderProductsPage {

  private productsEnabled: ProductEnabled[];
  private productsAdded: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private clientProvider: ClientProvider,
    private dataSharedProvider: DataSharedProvider,
    private messageProvider: MessageProvider,
    public events: Events) {
      event.subcribe.......
  }

  ionViewDidLoad() {
    this.setProductsVariables();
  }

  setProductsVariables() {
    this.productsEnabled = this.dataSharedProvider.getData('productsEnabled');
    this.productsAdded = this.dataSharedProvider.getData('productsAdded');
  }

  sendProductToCart(clientProduct: any) {
    if (!clientProduct.state) {
      this.messageProvider.error("Debe seleccionar horneado o congelado.", null);
      return;
    }
    if (!clientProduct.amount) {
      this.messageProvider.error("Debe ingresar la cantidad.", null);
      return;
    }

    let product = this.buildProduct(clientProduct);

    if (!this.productsAdded) {
      this.productsAdded = [];
      this.productsAdded.push(product);
      this.dataSharedProvider.setData('productsAdded', this.productsAdded);
    } else {
      let index = this.productsAdded.indexOf(product);
      if (index != -1) {
        this.messageProvider.error("Ya se agregó el producto", null);
        return;
      }
      this.productsAdded.push(product);
    }

    this.sendAmountProductsAdded()

  }


  buildProduct(clientProduct) {
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

    if (state == 'frozen' && !clientProduct.rawProduct) {
      rawProduct = {
        clientProduct: clientProduct.id,
        name: clientProduct.customName ? clientProduct.customName : clientProduct.product.shortName,
        amount: amount,
        price: clientProduct.customPrice,
        baked: false
      }
      clientProduct.rawProduct = rawProduct;
    } else if (state == 'baked' && !clientProduct.bakedProduct) {
      console.log('baked')
      bakedProduct = {
        clientProduct: clientProduct.id,
        name: clientProduct.customName ? clientProduct.customName : clientProduct.product.shortName,
        amount: amount,
        price: clientProduct.customPrice,
        baked: true
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
    this.sendAmountProductsAdded();
  }


  sendAmountProductsAdded() {
    let amountProducts = this.productsAdded.length;
    this.events.publish("amountProductsCart", amountProducts);
  }

}
