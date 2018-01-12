import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class MessageProvider {

  constructor(public toastCtrl: ToastController) {
    // console.log('Hello MessageProvider Provider');
  }

  succes(message: string, loading: any) {
    if (loading) {
      loading.dismiss();
    }
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  error(message: string, loading: any) {
    if (loading) {
      loading.dismiss();
    }
    let toast = this.toastCtrl.create({
      message: 'Error: ' + message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
