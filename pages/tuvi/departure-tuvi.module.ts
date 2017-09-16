import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartureTuViPage } from './departure-tuvi';

@NgModule({
  declarations: [
    DepartureTuViPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartureTuViPage),
  ],
  exports: [
    DepartureTuViPage
  ]
})
export class DepartureTuViPageModule {}
