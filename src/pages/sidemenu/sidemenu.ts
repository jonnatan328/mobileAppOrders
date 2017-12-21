import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { OrdersPage } from '../orders/orders';

@IonicPage()
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {
    rootPage: string = 'OrdersPage';

    items: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      { title: 'Inicio', component: 'OrdersPage' },
      { title: 'Pedidos', component: 'OrdersPage' }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SidemenuPage');
  }

  openPage(page) {
    this.rootPage = page.component;

  }

}
