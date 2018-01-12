import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { MessageProvider } from '../../providers/message/message';

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
        this.messageProvider.error('Verifique nombre de usuario y contraseña', loading);
      });
  }

  ionViewDidLoad() {

  }

}
