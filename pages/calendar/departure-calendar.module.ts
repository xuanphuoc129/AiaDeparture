import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartureCalendarPage } from './departure-calendar';

@NgModule({
  declarations: [
    DepartureCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartureCalendarPage),
  ],
  exports: [
    DepartureCalendarPage
  ]
})
export class DepartureCalendarPageModule {}
