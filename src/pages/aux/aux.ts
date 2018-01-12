import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AuxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aux',
  templateUrl: 'aux.html',
})
export class AuxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuxPage');
  }

}
