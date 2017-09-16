import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, MenuController } from 'ionic-angular';
import { AppInterface, ResponseCode } from '../../providers/app-constant';
import { DeviceInfoProvider } from '../../providers/device-info/device-info';
import { Device } from "@ionic-native/device";
import { StatusBar } from "@ionic-native/status-bar";
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureTabsPage } from '../tabs/departure-tabs'


@IonicPage()
@Component({
  selector: 'page-departure-loading',
  templateUrl: 'departure-loading.html',
})
export class DepartureLoadingPage {
  app: AppInterface;
  departureData: any;
  constructor(
    private mStatusBar: StatusBar,
    private device: Device,
    private mPlatform: Platform,
    private mDeviceInfoProvider: DeviceInfoProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private mDepartureModule: DepartureModule,
    private mMenuController: MenuController) {

    this.app = this.navParams.get('app');
  }
  mViewDidEnter: boolean = false;
  ionViewDidEnter() {
    this.mStatusBar.styleLightContent();
    this.mStatusBar.overlaysWebView(false);
    this.mViewDidEnter = true;
    this.doCheckNetwork().then(
      data => { this.onHasNetwork(); },
      error => { }
    );
  }


  doCheckNetwork() {
    return new Promise((success, fail) => {
      success();
    });
  }
  onHasNetwork() {
    this.getDeviceInfos();

    // Load những dữ liệu cần thiết, thiết lập các đối tượng cần thiết.
    this.mDepartureModule.update();
    // sau khi load xong thì gọi hàm onLoadingDone

    setTimeout(() => {
      this.onLoadingDone();
    }, 1000);
  }
  getDeviceInfos() {
    this.mDeviceInfoProvider.mUserDevice.createDefault();
    if (this.device.uuid != null) {
      this.mDeviceInfoProvider.mUserDevice.cordova = this.device.cordova;
      this.mDeviceInfoProvider.mUserDevice.manufacture = this.device.manufacturer;
      this.mDeviceInfoProvider.mUserDevice.model = this.device.model;
      this.mDeviceInfoProvider.mUserDevice.platform = this.device.platform;
      this.mDeviceInfoProvider.mUserDevice.serial = this.device.serial;
      this.mDeviceInfoProvider.mUserDevice.uuid = this.device.uuid;
      this.mDeviceInfoProvider.mUserDevice.version = this.device.version;
    }
  }

  onLoadingDone() {
    this.navCtrl.setRoot(DepartureTabsPage, {

    }, {
        animate: true,
        duration: 400,
        animation: "forward"
      });
  }

}
