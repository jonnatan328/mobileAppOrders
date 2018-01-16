import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Página auxiliar sin contenido html para cargar parcialmente.
 * Author: Jonnatan Ríos Vásquez- jrios328@gmail.com
 */

@Component({
  selector: 'page-aux',
  templateUrl: 'aux.html',
})
export class AuxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
