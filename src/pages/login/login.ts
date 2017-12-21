import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
              private authProvider: AuthProvider) {
  }

  login() {
      // this.loading = true;
      this.authProvider.login(this.user.username, this.user.password)
          .subscribe(
              data => {
                  console.log('Bien hecho mk.')
                  this.navCtrl.push('SidemenuPage');
              },
              error => {
                  // this.alertService.error(error);
                  // this.loading = false;
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // reset login status
    //this.authProvider.logout();
  }

}
