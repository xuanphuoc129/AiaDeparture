import { Departure } from './departure';
import { DepartureExchangeDay } from '../departure-exchangeday';

export class Calendar {
    month: number = 0;
    year: number = 0;
    days: Array<Departure> = [];
    constructor(month?: number, year?: number) {
        let departureExchangeDay = new DepartureExchangeDay();
        for (let i = 1; i <= 42; i++) {
            this.days.push(null);
        }
        if (month && year) {
            this.setTime(month, year);
        }
    }
    setTime(month: number, year: number) { 
        for (let i = 0; i < 42; i++) {
            this.days[i] = null;
        }
        if (year == 0) return;
        this.month = month;
        this.year = year;
        let startDate = new Date(year + "-" + (month < 9 ? "0" + (month + 1) : (month + 1)) + '-01');
        let index = startDate.getDay();
        while (startDate.getMonth() == this.month) {
            this.days[index] = new Departure(startDate); 
            startDate.setDate(startDate.getDate() + 1);
            index++;
        }
    }
}