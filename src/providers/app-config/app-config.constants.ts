import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./app-config.interface";

export const APP_DI_CONFIG: IAppConfig = {
    // APP_URL: '/api',
  APP_URL: 'https://www.lafournee.com.co',

};

export let APP_CONFIG = new InjectionToken< IAppConfig >( 'app.config' );
