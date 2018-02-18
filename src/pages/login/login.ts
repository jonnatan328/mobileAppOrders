import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { MessageProvider } from '../../providers/message/message';

/**
* Page which the user add your credentials to authenticate in the app.
* Author: Jonnatan Ríos Vásquez- jrios328@gmail.com
*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private messageProvider: MessageProvider,
    public loadingCtrl: LoadingController,) {
  }
  /**
  * Function to get the username and password and sign in the app.
  */
  login() {
    if (!this.user.username || !this.user.password) {
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });

    loading.present();
    this.authProvider.login(this.user.username, this.user.password)
      .subscribe(
      data => {
        this.messageProvider.succes('Ha iniciado sesión', loading);
        this.navCtrl.setRoot('SidemenuPage');
      },
      error => {
        console.log(error);
        this.messageProvider.error('verifique nombre de usuario y contraseña', loading);
      });
  }

}
