import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

/**
* Page to load the side menu with the main options present in the app.
* Author: Jonnatan Ríos Vásquez- jrios328@gmail.com
*/

@IonicPage()
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {

  rootPage: string = 'OrdersPage';
  items: Array<{ title: string, component: any, icon: string }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider) {

    /**
    * Create the array with the options of the side menu.
    */
    this.items = [
      //{ title: 'Inicio', component: 'HomePage', icon: 'home' },
      { title: 'Pedidos', component: 'OrdersPage', icon: 'list-box' }
    ];
  }

  /**
  * Function to open the page received as parameter.
  */
  openPage(page) {
    this.rootPage = page.component;
  }

  /**
  * Function to sign out the user.
  */
  logout() {
    this.authProvider.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
