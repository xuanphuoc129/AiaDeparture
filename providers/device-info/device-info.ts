import { Injectable } from '@angular/core';
import { UserDevice } from "./user-device";
@Injectable()
export class DeviceInfoProvider {
  mUserDevice: UserDevice = new UserDevice();
  constructor() {

  }
  getDeviceName() {
    return this.mUserDevice.model;
  }
  getDeviceID() {
    return this.mUserDevice.uuid;
  }
  getPlatform() {
    return this.mUserDevice.platform;
  }
  getVersion() {
    return this.mUserDevice.version;
  }

}
