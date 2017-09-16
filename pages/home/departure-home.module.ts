import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartureHomePage } from './departure-home';

@NgModule({
  declarations: [
    DepartureHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DepartureHomePage),
  ],
  exports: [
    DepartureHomePage
  ]
})
export class DepartureHomePageModule {}
