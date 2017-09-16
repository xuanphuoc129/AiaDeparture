import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureExchangeDay } from '../../providers/departure/departure-exchangeday';
import { Departure } from '../../providers/departure/class/departure';

export class DayFilter{
    day: any;
    month: any;
    year: any;
    constructor(day: any,month: any, year: any){
      this.day = day;
      this.month = month;
      this.year = year;
    }
}

@IonicPage()
@Component({
  selector: 'page-departure-changedate',
  templateUrl: 'departure-changedate.html',
})

export class DepartureChangeDatePage {
  rowHeight = 56;//height of each row in px; Match to css; 
  dateOfMonths = [];
  months = [];
  years = [];
  timeoutObjects = [];
  animationFrameObjects = [];
  touchingObjects = [];
  currentIndex = 6;
  departureExchangeDay: DepartureExchangeDay;
  datas = [[], [], []];
  fps = 30;//frame per second. descrease it to increase speed of scroll;
  lunarMonth = [];
  today: Date;
  todayInLunar: any;
  todayInSolar: any;
  solar_date = [];
  lunar_date = [];
  day_filter = new Array<DayFilter>();
  load_filter : boolean = true;
  public selectedDate: Departure;
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private mDepartureModule: DepartureModule,
  ) {
    for (let i = 1; i <= 31; i++) {
      this.datas[0].push(i);
    }
    for (let i = 1; i <= 30; i++) {
      this.lunarMonth.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.datas[1].push(i);
    }
    for (let i = 1900; i <= 2200; i++) {
      this.datas[2].push(i);
    }
    this.departureExchangeDay = new DepartureExchangeDay();
    this.selectedDate = new Departure(new Date());
    this.todayInSolar = this.selectedDate;
    this.mDepartureModule.updateDepartureInfo([this.selectedDate]); 
  }
  ionViewDidEnter() {
    this.load_filter = true;
    this.day_filter = [];
    this.gotoToday();
    let scrollElms = document.getElementsByClassName('change-date-col');
    this.today = new Date();
    this.todayInLunar = this.departureExchangeDay.convertSolar2Lunar(this.today.getDate(), this.today.getMonth() + 1, this.today.getFullYear(), 7);
    this.day_filter.push(new DayFilter(this.today.getDate(),this.today.getMonth() + 1,this.today.getFullYear()));
    this.day_filter.push(new DayFilter(this.todayInLunar[0],this.todayInLunar[1],this.todayInLunar[2]));
    this.load_filter = false;
    if (scrollElms) {
      for (let i = 0; i < scrollElms.length; i++) {
        let scrollElm = <HTMLElement>scrollElms[i];
        let index = parseInt(scrollElm.getAttribute('index'));

        scrollElm.addEventListener('scroll', (event) => {
          if (!this.touchingObjects[index]) {
            this.scrollEnd(scrollElm, index);
            this.changeDate(index);
          }
        })
        scrollElm.addEventListener('touchstart', () => {
          this.touchingObjects[index] = true;
          this.currentIndex = index;
        })
        scrollElm.addEventListener('touchend', () => {
          this.touchingObjects[index] = false;
          this.scrollEnd(scrollElm, index);
          this.changeDate(index);
        })
        scrollElm.addEventListener('touchcancel', () => {
          this.touchingObjects[index] = false;
          this.scrollEnd(scrollElm, index);
          this.changeDate(index);
        })
      }
    }
  }

  gotoToday() {
    this.currentIndex = 6;
    let scrollElms = document.getElementsByClassName('change-date-col');
    this.today = new Date();
    this.todayInLunar = this.departureExchangeDay.convertSolar2Lunar(this.today.getDate(), this.today.getMonth() + 1, this.today.getFullYear(), 7);
    if (scrollElms) {
      if (scrollElms) {
        for (let i = 0; i < scrollElms.length; i++) {
          let scrollElm = <HTMLElement>scrollElms[i];
          let index = parseInt(scrollElm.getAttribute('index'));
          if (index == 0) {
            scrollElm.scrollTop = (this.today.getDate() - 1) * this.rowHeight;
          } else if (index == 1) {
            scrollElm.scrollTop = (this.today.getMonth()) * this.rowHeight;
          } else if (index == 2) {
            scrollElm.scrollTop = (this.today.getFullYear() - this.datas[2][0]) * this.rowHeight;
          } else if (index == 3) {
            scrollElm.scrollTop = (this.todayInLunar[0] - 1) * this.rowHeight;
          } else if (index == 4) {
            scrollElm.scrollTop = (this.todayInLunar[1] - 1) * this.rowHeight;
          } else if (index == 5) {
            scrollElm.scrollTop = (this.todayInLunar[2] - this.datas[2][0]) * this.rowHeight;
          }
        }
      }
    }
  }

  changeDate(index: number) {
    let solarElms = document.getElementsByClassName('solar-col');
    // console.log(solarElms);
    let lunarElms = document.getElementsByClassName('lunar-col');
    if (solarElms && lunarElms) {
      if (index <= 2 && this.currentIndex <= 2) {

        //Change solar to lunar
        //Get solar date        
        this.solar_date = [];
        if (solarElms) {
          for (let i = 0; i < solarElms.length; i++) {
            let solarElm = solarElms[i];
            let index = solarElm.getAttribute('index');
            let childIndex = Math.round(solarElm.scrollTop / this.rowHeight) + 1;
            this.solar_date[index] = parseInt(solarElm.children[childIndex].children[0].innerHTML);
          }
          // console.log(this.solar_date);
          this.lunar_date = this.departureExchangeDay.convertSolar2Lunar(this.solar_date[0], this.solar_date[1], this.solar_date[2], 7);
          //show result 
          this.day_filter = [];
          this.day_filter.push(new DayFilter(this.solar_date[0],this.solar_date[1],this.solar_date[2]));
          this.day_filter.push(new DayFilter(this.lunar_date[0],this.lunar_date[1],this.lunar_date[2]));
          for (let i = 0; i < lunarElms.length; i++) {
            let lunarElm = <HTMLElement>lunarElms[i];
            let index = parseInt(lunarElm.getAttribute('index'));
            this.scrollToTop(lunarElm, (this.lunar_date[index % 3] - this.datas[index % 3][0]) * this.rowHeight, index);
          }
          this.selectedDate = new Departure(new Date(this.solar_date[2] + "-" + this.solar_date[1] + "-" + this.solar_date[0]));
          // console.log(this.selectedDate);
          this.mDepartureModule.updateDepartureInfo([this.selectedDate]);
        }

      }

      if (index >= 3 && this.currentIndex >= 3 && this.currentIndex <= 5) {
        //Change lunar to solar
        //Get lunar date        
        this.lunar_date = [];
        if (lunarElms) {
          for (let i = 0; i < lunarElms.length; i++) {
            let lunarElm = lunarElms[i];
            let index = parseInt(lunarElm.getAttribute('index'));
            let childIndex = Math.round(lunarElm.scrollTop / this.rowHeight) + 1;
            this.lunar_date[index % 3] = parseInt(lunarElm.children[childIndex].children[0].innerHTML);
          }
          this.solar_date = this.departureExchangeDay.convertLunar2Solar(this.lunar_date[0], this.lunar_date[1], this.lunar_date[2], 0, 7);
          this.day_filter = [];
          this.day_filter.push(new DayFilter(this.solar_date[0],this.solar_date[1],this.solar_date[2]));
          this.day_filter.push(new DayFilter(this.lunar_date[0],this.lunar_date[1],this.lunar_date[2]));
          //show result 
          for (let i = 0; i < solarElms.length; i++) {
            let solarElm = <HTMLElement>solarElms[i];
            let index = parseInt(solarElm.getAttribute('index'));
            this.scrollToTop(solarElm, (this.solar_date[index % 3] - this.datas[index % 3][0]) * this.rowHeight, index);
          }
          this.selectedDate = new Departure(new Date(this.solar_date[2] + "-" + this.solar_date[1] + "-" + this.solar_date[0]));
          this.mDepartureModule.updateDepartureInfo([this.selectedDate]);
        }
      }
    }

  }

  scrollToTop(element: HTMLElement, scrollTop, index) {
    let deltaDistance = 10 //in px;
    let nowScrollTop = element.scrollTop;
    if (this.animationFrameObjects[index]) cancelAnimationFrame(this.animationFrameObjects[index]);
    if (Math.abs(nowScrollTop - scrollTop) <= deltaDistance) {
      element.scrollTop = scrollTop;
      return;
    }
    if (deltaDistance * this.fps < Math.abs(nowScrollTop - scrollTop)) deltaDistance = Math.round(Math.abs(nowScrollTop - scrollTop) / this.fps);
    let signal = Math.abs(nowScrollTop - scrollTop) / (scrollTop - nowScrollTop);//-1 or 1;
    this.animationFrameObjects[index] = requestAnimationFrame(() => {
      element.scrollTop = nowScrollTop + signal * deltaDistance;
      this.scrollToTop(element, scrollTop, index);
    })
  }

  scrollEnd(scrollElm: HTMLElement, index) {
    //end of touch. May be end of scrolling. Just reset timeout. 
    //Scroll event fire about every 30ms so 100ms timeout is fine
    if (this.currentIndex == index) {
      if (this.timeoutObjects[index]) clearTimeout(this.timeoutObjects[index]);
      if (this.animationFrameObjects[index]) cancelAnimationFrame(this.animationFrameObjects[index]);
      this.timeoutObjects[index] = setTimeout(() => {
        let scrollTop = scrollElm.scrollTop;
        this.scrollToTop(scrollElm, Math.round(scrollTop / this.rowHeight) * this.rowHeight, index);
      }, 100)
    }

  }
}
