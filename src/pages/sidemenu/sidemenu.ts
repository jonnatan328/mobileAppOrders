import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {
    rootPage: string = 'HomePage';

    items: Array<{title: string, component: any, icon: string}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              private storage: Storage) {
    this.items = [
      { title: 'Inicio', component: 'HomePage', icon: 'home' },
      { title: 'Pedidos', component: 'OrdersPage', icon: 'list-box' }
    ];
  }

  ionViewDidLoad() {
    console.log(this.storage.get('auth_token'));
  }

  openPage(page) {
    this.rootPage = page.component;

  }

  logout() {
    this.authProvider.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
