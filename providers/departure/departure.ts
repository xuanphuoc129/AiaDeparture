
import { Injectable } from '@angular/core';
import { DepartureHttpService } from "./departure-http-service";
import { HttpService } from "../http-service";
import { ResponseCode, RequestState, LoginStatus } from '../app-constant';
import { DepartureLoadData } from './departure-loaddata';
import { DepartureExchangeDay } from './departure-exchangeday';
import { Departure } from './class/departure';
import { Http, HttpModule } from '@angular/http';
import { BACKGROUND } from './departure-background';
import { BACKGROUNDCHANGE } from './departure-backgroundchange';
import { MOREOPTION } from "./departure-more-option";

@Injectable()
export class DepartureModule {

  private mDepartureHttpService: DepartureHttpService;
  private mDepartureLoadData: DepartureLoadData;
  private mDepartureExchangeDay: DepartureExchangeDay;
  private departureData: any;

  constructor(
    private mHttpService: HttpService,
    private http: Http) {
    this.mDepartureHttpService = new DepartureHttpService(this.mHttpService);
    this.mDepartureLoadData = new DepartureLoadData(this.http);
    this.mDepartureExchangeDay = new DepartureExchangeDay();
  }

  public getHttpService() {
    return this.mDepartureHttpService;
  }

  //đổi ngày dương về ngày âm
  public convertSolarToLunar(dd: any, mm: any, yy: any) {
    return this.mDepartureExchangeDay.convertSolar2Lunar(dd, mm, yy, 7);
  }

  public update() {
    this.getData();
  }

  getData() {
    return new Promise((resolve, reject) => {
      if (this.departureData) resolve(this.departureData);
      else {
        this.mDepartureLoadData.getDataFromJSON().subscribe((data) => {
          this.departureData = data;
          resolve(this.departureData);
        });
      }
    });
  }

  updateDepartureInfo(departures: Array<Departure>) { 
    if (this.departureData)
      departures.forEach(departure => {
        if (departure) {
          let data = this.getQuoteAndNameOfDay(departure.lunarDate, departure.lunarMonth);
          departure.nameOfDay = data[0];
          departure.comment = data[1];
        }
      });
    else {
      this.getData().then(() => {
        departures.forEach(departure => {
          if (departure) {
            let data = this.getQuoteAndNameOfDay(departure.lunarDate, departure.lunarMonth);
            departure.nameOfDay = data[0];
            departure.comment = data[1];
          }
        });
      })
    }
  }

  //lấy thông tin về ngày xuất hành
  public getDepartureData() {
    return this.mDepartureLoadData.getDataFromJSON();
  }

  //tính can chi cho giờ (theo ngày dương lịch)
  public getSexagesimalCycleByTime(dd: any, mm: any, yy: any, hour: number) {
    return this.mDepartureExchangeDay.getSexagesimalCycleByTime(dd, mm, yy, hour);
  }

  //tính can chi cho ngày (theo ngày dương lịch)
  public getSexagesimalCycleByDay(dd: any, mm: any, yy: any) {
    return this.mDepartureExchangeDay.getSexagesimalCycleByDay(dd, mm, yy);
  }
  //tính can chi cho tháng (theo ngày dương lịch)
  public getSexagesimalCycleByMonth(dd: any, mm: any, yy: any) {
    return this.mDepartureExchangeDay.getSexagesimalCycleByMonth(dd, mm, yy);
  }
  //tính can chi cho năm (theo ngày dương lịch)
  public getSexagesimalCycleByYear(dd: any, mm: any, yy: any) {
    return this.mDepartureExchangeDay.getSexagesimalCycleByYear(dd, mm, yy);
  }
  //lấy tên ngày và lời khuyên cho ngày theo lịch khổng minh
  public getQuoteAndNameOfDay(dd: any, mm: any, data?: any) {
    if (!data) {
      data = this.departureData;
    } 
    return this.mDepartureLoadData.getInfoDayInMonth(dd, mm, data);
  }
  //Tính ngày hoàng đạo, hắc đạo
  public getZodiacDay(dd: any, mm: any, yy: any) {
    return this.mDepartureExchangeDay.getZodiacDay(dd, mm, yy);
  }

  //lấy đường dẫn của ảnh
  public getBackgroundLink(index) {
    // let lenght: number = BACKGROUND.length;
    // let index: number = Math.floor(lenght * Math.random());
    
    return BACKGROUND[index];
  }

  //tạo ảnh nền giống nhau khi chuyển tabs
  public setBackgroundWhenChangeTabs(link: string) {
    BACKGROUNDCHANGE.push(link);
  }

  //lấy ảnh nền cho các tabs
  public getBackgroundWhenChangeTabs(): string {
    return BACKGROUNDCHANGE[BACKGROUNDCHANGE.length - 1];
  }

  // lấy more-option
  public getOptions(){
    return MOREOPTION;
  }








}


