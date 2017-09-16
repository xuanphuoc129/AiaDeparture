import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { Departure } from '../../providers/departure/class/departure';
import { AppController } from '../../providers/app-controller';
import { Calendar } from '../../providers/departure/class/calendar';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-departure-calendar',
  templateUrl: 'departure-calendar.html',
})
export class DepartureCalendarPage {
  public departureDays: Array<Departure> = [];
  public dayOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  calendar: Calendar;
  // day_in_month = new Array<Calendar>();
  public selectedMonth = 7;//Index at 0;
  public selectedDate: Departure;
  public currentDate: Departure;
  //dữ liệu về ngày xuất hành
  departureData: any;
  showDatePicker = false;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private mDepartureModule: DepartureModule,
    private datePicker: DatePicker
  ) {
    this.currentDate = new Departure(new Date());
    this.selectedDate = new Departure(new Date());
    this.calendar = new Calendar(this.currentDate.date.getMonth(), this.currentDate.date.getFullYear());
    this.checkDepartureBlank();
    // this.calendar = this.calendar.
    console.log("calendar", this.calendar, this.selectedDate, this.currentDate);
    if (!this.departureData) {
      this.mDepartureModule.getData().then(
        data => {
          this.departureData = data;
        }, error => { }
      );
    }
    this.mDepartureModule.updateDepartureInfo(this.calendar.days);
    this.mDepartureModule.updateDepartureInfo([this.currentDate, this.selectedDate]);
    // this.getQuoteAndDayName(this.selectedDate);
  }
  checkDepartureBlank(){
      if(this.calendar.days[35]){
        this.departureDays=this.calendar.days;
      }else{
        this.departureDays = this.calendar.days.slice(0,35);
      }
  }
  //Load data
  onInputChange(month, year) {
    this.calendar.setTime(month, year);
    this.checkDepartureBlank();
    this.mDepartureModule.updateDepartureInfo(this.departureDays);
  }

  getDate(date: Date) {
    return date.getDate();
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  swipe(event) {
    let direction = event.offsetDirection; //2 = swipe right to left; 4 = swipe left to right;
    // console.log(direction, this.calendar.month, this.calendar.year);
    // console.log(this.calendar.days);
    if (direction == 2) {
      let month = this.calendar.month + 1;
      let year = this.calendar.year;
      if (month == 12) {
        month = 0;
        year++;
      }
      this.onInputChange(month, year);
    }
    if (direction == 4) {
      let month = this.calendar.month - 1;
      let year = this.calendar.year;
      if (month == -1) {
        month = 11;
        year--;
      }
      this.onInputChange(month, year);
    }
  }

  selectDeparture(departure, i) {
    if (departure)
      this.selectedDate = departure;
  }

  pickSolarDate(event) {
    this.showDatePicker = true;
    event.stopPropagation();
  }
  hideDatePicker(event) {
    this.showDatePicker = false;
    event.stopPropagation();
  }
  nextYear() {
    this.onInputChange(this.calendar.month, this.calendar.year + 1);
  }
  prevYear() {
    this.onInputChange(this.calendar.month, this.calendar.year - 1);
  }

  changeMonth(month, event) {
    this.onInputChange(month - 1, this.calendar.year);
    // event.target.classList.add('bordered');
    // setTimeout(() => {
    //   this.showDatePicker = false;
    //   event.target.classList.remove('bordered');
    // }, 500);
  }

  onClickHome() {
    //this.events.publish("HOME_PAGE");
    if (AppController.getInstance().getNavController()) {
      AppController.getInstance().getNavController().setRoot("HomePage");
    }
  }

}
