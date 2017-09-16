import { Injectable } from '@angular/core';
import { ParamBuilder, HttpService } from "../http-service";
import { DepartureCmd } from "./departure-cmd";
import { DepartureParamsKey } from "./departure-paramskey";
import { Headers } from '@angular/http';

@Injectable()
export class DepartureHttpService {

  private SERVICE_URL: string = "http://125.212.192.94:8080/departure_app/ws/";

  private CLIENT_KEY: string = "8c24516c23b611420defccf253598412";

  private DEVICE_ID: string = "appinasia_macbookpro";

  mHeaderWithKey: Headers;

  constructor(private mHttpService: HttpService) {

  }
  createHeaders() {
    if (this.mHeaderWithKey == null || this.mHeaderWithKey == undefined) {
      this.mHeaderWithKey = new Headers();
      this.mHeaderWithKey.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      this.mHeaderWithKey.append('device_id', this.DEVICE_ID);
    }
  }
  requestGet(url: string, params: string) {
    this.createHeaders();
    return this.mHttpService.requestGet(url, params, { headers: this.mHeaderWithKey });
  }

  requestPost(url: string, params: string) {
    this.createHeaders();
    return this.mHttpService.requestPost(url, params, { headers: this.mHeaderWithKey });
  }

  testRequest() { }

}
