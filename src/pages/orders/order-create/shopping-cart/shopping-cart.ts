import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, ViewController, ActionSheetController, AlertController } from 'ionic-angular';

import { DataSharedProvider } from "../../../../providers/data-shared/data-shared";
import { MessageProvider } from "../../../../providers/message/message";


@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  private productsAdded: Array<any>;

  constructor(public viewCtrl: ViewController,
    private dataSharedProvider: DataSharedProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getProductsCart();
  }

  getProductsCart() {
    this.productsAdded = this.dataSharedProvider.getData('productsAdded');
    console.log(this.productsAdded);
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
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
        },{
          text: 'Modificar cantidad',
          icon: 'create',
          handler: () => {
            this.modifyAmount(product);
          }
        },{
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
          placeholder: 'Cantidad'
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
            product.amount = data.amount;
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  removeProductCart(product: any) {
    let indexAdded = this.productsAdded.indexOf(product);
    this.productsAdded.splice(indexAdded, 1);
  }

}
