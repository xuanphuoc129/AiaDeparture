import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartureChangeDatePage } from './departure-changedate';

@NgModule({
  declarations: [
    DepartureChangeDatePage,
  ],
  imports: [
    IonicPageModule.forChild(DepartureChangeDatePage),
  ],
  exports: [
    DepartureChangeDatePage
  ]
})
export class DepartureChangeDatePageModule {}
