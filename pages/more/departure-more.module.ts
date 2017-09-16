import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartureMorePage } from './departure-more';

@NgModule({
  declarations: [
    DepartureMorePage,
  ],
  imports: [
    IonicPageModule.forChild(DepartureMorePage),
  ],
  exports: [
    DepartureMorePage
  ]
})
export class DepartureMorePageModule {}
