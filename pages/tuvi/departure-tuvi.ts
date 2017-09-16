import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';


@IonicPage()
@Component({
  selector: 'page-departure-tuvi',
  templateUrl: 'departure-tuvi.html',
})
export class DepartureTuViPage {

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private mDepartureModule: DepartureModule,
  ) {


  }
}
