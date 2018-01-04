import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { OrdersPageModule } from '../pages/orders/orders.module';

import { AuthInterceptor} from '../providers/interceptor/auth.interceptor';

import { AuthProvider } from '../providers/auth/auth';
import { MessageProvider } from '../providers/message/message';
import { OrderProvider } from '../providers/order/order';
import { APP_CONFIG, APP_DI_CONFIG } from "../providers/app-config/app-config.constants";
import { ClientProvider } from '../providers/client/client';
import { DataSharedProvider } from '../providers/data-shared/data-shared';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    OrdersPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    DataSharedProvider,
  ]
})
export class AppModule { }
