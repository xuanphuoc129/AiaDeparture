
import { DepartureHomePage } from '../home/departure-home';

import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, MenuController } from 'ionic-angular';
 
@Component({
  templateUrl: 'departure-tabs.html',
  selector: 'page-departure-tabs'
})
export class DepartureTabsPage {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;
  tab1Params: any;

  constructor(private navParams: NavParams) {
    this.tab1Params = this.navParams.get('dataDeparture');
    this.tab1Root = 'DepartureHomePage';
    this.tab2Root = 'DepartureCalendarPage';
    this.tab3Root = 'DepartureChangeDatePage';
    this.tab4Root = 'DepartureTuViPage';
    this.tab5Root = 'DepartureMorePage';
  }
}