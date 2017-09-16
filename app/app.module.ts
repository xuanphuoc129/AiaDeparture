import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DepartureTabsPage } from "../pages/tabs/departure-tabs";
import { DatePicker } from "@ionic-native/date-picker";
import { DepartureModule } from "../providers/departure/departure";
import { HttpService } from "../providers/http-service";
import { Device } from "@ionic-native/device";
import { DeviceInfoProvider } from "../providers/device-info/device-info";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    DepartureTabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      iconMode: 'ios',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DepartureTabsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DepartureModule,
    DatePicker,    
    HttpService,
    Device,
    DeviceInfoProvider,
  ]
})
export class AppModule {}
