import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartureLoadingPage } from './departure-loading';

@NgModule({
  declarations: [
    DepartureLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartureLoadingPage),
  ],
  exports: [
    DepartureLoadingPage
  ]
})
export class DepartureLoadingPageModule {}
