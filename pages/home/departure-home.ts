import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AppController } from '../../providers/app-controller';
import { DepartureModule } from '../../providers/departure/departure';


@IonicPage()
@Component({
  selector: 'page-departure-home',
  templateUrl: 'departure-home.html',
})
export class DepartureHomePage {

  //thời gian hiện tại
  nowtime: any;
  //giờ hiện tai
  nowhour: Date;
  //ngày thứ X trong tuần
  day_of_week: string = "";
  //ngày dương
  solarDate: number;
  //tháng dương
  solarMonth: number;
  //năm dương
  solarYear: number;
  //ngày âm
  lunarDate: number;
  //tháng âm
  lunarMonth: number;
  //năm âm
  lunarYear: number;
  //số ngày trong tháng của năm thường
  day_numbers_of_month_in_normal_year: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //số ngày trong tháng của năm nhuận
  day_numbers_of_month_in_leap_year: Array<number> = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];;
  //can chi của giờ
  sexagesimalCycleTime: string = "";
  //can chi của ngày
  sexagesimalCycleDate: string = "";
  //can chi của tháng
  sexagesimalCycleMonth: string = "";
  //can chi của năm:
  sexagesimalCycleYear: string = "";
  //dữ liệu về ngày xuất hành
  departureData: any;
  //tên của ngày theo lịch xuất hành
  name_of_date: string = "";
  //lời khuyên cho ngày:
  quote_of_date: string = "";
  //index background
  index_background : number = 0;
  //góc quay cho div ở phần ngày dương
  degree: number = 0;


  /* init all variable */
  constructor(
    private navCtrl: NavController,
    private mDepartureModule: DepartureModule,
    private mMenuController: MenuController,
    private datePicker: DatePicker
  ) {

    this.solarDate = new Date().getDate();
    this.solarMonth = new Date().getMonth() + 1;
    this.solarYear = new Date().getFullYear();
    this.degree = 0;
  }

  ngAfterViewInit() {


  }
  mHasEnter: boolean = false;
  ionViewDidEnter() {
    if (!this.mHasEnter) {
      this.mHasEnter = true;
      this.mMenuController.enable(false, "lottery");
      this.addCubeListener();
    }
    if (!this.departureData) {
      this.mDepartureModule.getData().then(
        data => {
          this.departureData = data;
          this.onLoadedData();
        }, error => { }
      );
    }
  }

  onLoadedData() {
    this.getDayOfWeek();
    this.getLunarDateTime();
    this.getSexagesimalCycle();
    this.getQuoteAndDayName();
    this.changeBackgroundImage();
    setInterval(() => {
      this.nowtime = new Date();
      this.sexagesimalCycleTime = this.mDepartureModule.getSexagesimalCycleByTime(this.solarDate, this.solarMonth, this.solarYear, this.nowtime.getHours());
    }, 1000);
  }
  onClickHome() {
    //this.events.publish("HOME_PAGE");
    if (AppController.getInstance().getNavController()) {
      AppController.getInstance().getNavController().setRoot("StoreHomePage");
    }
  }
  //chuyển đổi ngày âm dương
  getLunarDateTime() {
    let lunarDateTime: any[];
    lunarDateTime = this.mDepartureModule.convertSolarToLunar(this.solarDate, this.solarMonth, this.solarYear);
    this.lunarDate = lunarDateTime[0];
    this.lunarMonth = lunarDateTime[1];
    this.lunarYear = lunarDateTime[2];
  }
  //tính can chi cho ngày tháng năm
  getSexagesimalCycle() {
    this.sexagesimalCycleDate = this.mDepartureModule.getSexagesimalCycleByDay(this.solarDate, this.solarMonth, this.solarYear);
    this.sexagesimalCycleMonth = this.mDepartureModule.getSexagesimalCycleByMonth(this.solarDate, this.solarMonth, this.solarYear);
    this.sexagesimalCycleYear = this.mDepartureModule.getSexagesimalCycleByYear(this.solarDate, this.solarMonth, this.solarYear);
  }
  //tính ngày thứ mấy trong tuần
  getDayOfWeek() {
    let day: number = new Date(this.solarMonth.toString() + "/" + this.solarDate.toString() + "/" + this.solarYear.toString()).getDay();
    switch (day) {
      case 0:
        this.day_of_week = "Chủ nhật";
        break;
      case 1:
        this.day_of_week = "Thứ hai";
        break;
      case 2:
        this.day_of_week = "Thứ ba";
        break;
      case 3:
        this.day_of_week = "Thứ tư";
        break;
      case 4:
        this.day_of_week = "Thứ năm";
        break;
      case 5:
        this.day_of_week = "Thứ sáu";
        break;
      case 6:
        this.day_of_week = "Thứ bảy";
        break;
    }
  }
  //lấy tên và lời khuyên cho ngày
  getQuoteAndDayName() {
    let data = this.mDepartureModule.getQuoteAndNameOfDay(this.lunarDate, this.lunarMonth, this.departureData);
    this.name_of_date = data[0].toString();
    this.quote_of_date = data[1].toString();
    this.index_background = data[2];
  }
  //quay phải
  rotateRight() {
    let cube = document.getElementById("cube");
    if (!cube) return;
    cube.style.transform = "translateZ( -100px) rotateY( " + (this.degree -= 90) + "deg)";
    setTimeout(() => {
      this.forwardNextDate();
      this.getDayOfWeek();
      this.getLunarDateTime();
      this.getQuoteAndDayName();
      this.changeBackgroundImage();
      this.getSexagesimalCycle();
    }, 100)
  }
  //quay trái
  rotateLeft() {
    let cube = document.getElementById("cube");
    if (!cube) return;
    cube.style.transform = "translateZ( -100px) rotateY( " + (this.degree += 90) + "deg)";
    setTimeout(() => {
      this.backtoPreviousDate();
      this.getDayOfWeek();
      this.getLunarDateTime();
      this.getQuoteAndDayName();
      this.changeBackgroundImage();
      this.getSexagesimalCycle();
    }, 100);
  }

  //tính số ngày của 1 tháng trong năm
  getDayNumbersInOneMonth() {
    let result: number[];
    if (this.solarYear % 4 == 0) {
      result = this.day_numbers_of_month_in_normal_year;
    } else {
      result = this.day_numbers_of_month_in_leap_year;
    }
    return result;
  }

  //tiến về ngày kế tiếp
  forwardNextDate() {
    let day_numbers_of_month = this.getDayNumbersInOneMonth();
    this.solarDate++;
    if (this.solarDate > day_numbers_of_month[this.solarMonth - 1]) {
      this.solarMonth++;
      if (this.solarMonth > 12) {
        this.solarMonth = 1;
        this.solarYear++;
      }
      this.solarDate = 1;
    }
  }
  //lùi về ngày hôm trước
  backtoPreviousDate() {
    let day_numbers_of_month = this.getDayNumbersInOneMonth();
    this.solarDate--;
    if (this.solarDate < 1) {
      this.solarMonth--;
      if (this.solarMonth < 1) {
        this.solarMonth = 12;
        this.solarYear--;
      }
      this.solarDate = day_numbers_of_month[this.solarMonth - 1];
    }
  }

  //touch move event cho cube
  addCubeListener() {
    let cube = document.getElementById('iAppContent');
    if (!cube) return;
    let startx = 0;
    let dist = 0;
    cube.addEventListener('touchstart', (e) => {
      let touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
      startx = touchobj.clientX // get x position of touch point relative to left edge of browser
    }, false);

    cube.addEventListener('touchmove', (e) => {
      //let touchobj = e.changedTouches[0]; // reference first touch point for this event
    }, false);

    cube.addEventListener('touchend', (e) => {
      var touchobj = e.changedTouches[0]; // reference first touch point for this event
      dist = touchobj.clientX - startx;
      if (dist > 20) {
        this.rotateLeft();
      } else if (dist < -20) {
        this.rotateRight();
      }
    }, false);

    cube.addEventListener('touchcancel', (e) => {
      var touchobj = e.changedTouches[0]; // reference first touch point for this event
      dist = touchobj.clientX - startx;
      if (dist > 20) {
        this.rotateLeft();
      } else if (dist < -20) {
        this.rotateRight();
      }
    }, false);
  }

  // thay đổi background khi đổi ngày
  changeBackgroundImage() {
    let link = this.mDepartureModule.getBackgroundLink(this.index_background-1);
    // this.mDepartureModule.setBackgroundWhenChangeTabs(link.bg);
    let contentElms = document.getElementsByClassName("show-page");
    for (let i = 0; i < contentElms.length; i++) {
      let element = <HTMLElement>contentElms[i];
      if (element.nodeName == "PAGE-DEPARTURE-HOME") {
        // element.style.transition = "background-image .3s ease-in-out";
        let departure_background = <HTMLElement> document.getElementById("departure-background");
        let qoute_fg = <HTMLElement> document.getElementById("quote-fg");
        qoute_fg.style.color = link.fg;
        departure_background.style.backgroundImage = 'url(' + link.bg + ')';
      } 
      // else {
      //   element.style.backgroundImage = 'url(' + link.bg + ')';
      // }
    }
  }

  //chọn ngày bất kỳ
  pickSolarDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date'
    }).then(
      date => {
        this.solarDate = date.getDate();
        this.solarMonth = date.getMonth() + 1;
        this.solarYear = date.getFullYear();
        // this.changeBackgroundImage();
        this.getDayOfWeek();
        this.getLunarDateTime();
        this.getQuoteAndDayName();
        this.getSexagesimalCycle();
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }
}
