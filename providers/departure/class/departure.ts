import { DepartureExchangeDay } from '../departure-exchangeday';
import { DepartureLoadData } from '../departure-loaddata';
import { Utils } from '../../app-utils';

export class Departure {
    date: Date;
    dateString: string;
    nameOfDay: string; //Tên của ngày theo lịch Khổng Minh
    comment: string; //Nhận xét về ngày theo lịch Khổng Minh
    zodiacStatus: number; //0 = Không có gì; 1 = Hoàng đạo; 2 = Hắc đạo
    lunarDate: number = 1; //Ngày âm lịch
    lunarMonth: number = 1; //Tháng âm lịch
    lunarYear: number = 2000; //Năm âm lịch
    canchiYear: string; //Can chi của năm
    canchiMonth: string; //Can chi của tháng
    canchiDay: string; //Can chi của ngày
    constructor(date?: Date, nameOfDay?: string, comment?: string, ) {
        let departureExchangeDay = new DepartureExchangeDay();
        this.date = new Date(date) || new Date();
        let params = [this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear()];
        this.dateString = Utils.getViewDate(this.date);
        this.nameOfDay = nameOfDay || "";
        this.comment = comment || "";
        [this.lunarDate, this.lunarMonth, this.lunarYear] = departureExchangeDay.convertSolar2Lunar(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear(), 7);
        this.zodiacStatus = departureExchangeDay.getZodiacDay(params[0], params[1], params[2]);
        this.canchiYear = departureExchangeDay.getSexagesimalCycleByYear(params[0], params[1], params[2]);
        this.canchiMonth = departureExchangeDay.getSexagesimalCycleByMonth(params[0], params[1], params[2]);
        this.canchiDay = departureExchangeDay.getSexagesimalCycleByDay(params[0], params[1], params[2]);
    }
    pair(departure: Departure) {
        this.date = departure.date;
        this.dateString = departure.dateString;
        this.nameOfDay = departure.nameOfDay;
        this.comment = departure.comment;
        this.zodiacStatus = departure.zodiacStatus;
        this.lunarDate = departure.lunarDate;
        this.lunarMonth = departure.lunarMonth;
        this.lunarYear = departure.lunarYear;
        this.canchiYear = departure.canchiYear;
        this.canchiMonth = departure.canchiMonth;
        this.canchiDay = departure.canchiDay;
    }

}