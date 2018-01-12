import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AuxPage } from "../pages/aux/aux";

import { OrdersPageModule } from '../pages/orders/orders.module';

import { AuthInterceptor} from '../providers/interceptor/auth.interceptor';

import { AuthProvider } from '../providers/auth/auth';
import { MessageProvider } from '../providers/message/message';
import { OrderProvider } from '../providers/order/order';
import { APP_CONFIG, APP_DI_CONFIG } from "../providers/app-config/app-config.constants";
import { ClientProvider } from '../providers/client/client';
// import { DataSharedProvider } from '../providers/data-shared/data-shared';
import { ClientEmployeeProvider } from '../providers/client-employee/client-employee';

@NgModule({
  declarations: [
    MyApp,
    AuxPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ],
      dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    OrdersPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuxPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthProvider,
    MessageProvider,
    OrderProvider,
    ClientProvider,
    // DataSharedProvider,
    ClientEmployeeProvider,
  ]
})
export class AppModule { }
