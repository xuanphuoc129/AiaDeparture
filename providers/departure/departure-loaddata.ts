import { Http, HttpModule } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export class DepartureLoadData {

    constructor(private http: Http) {
    }

    getDataFromJSON() {
        return this.http.get("./assets/departure/departure.json")
            .map((res: any) => res.json());
    }
        
    getTypeOfDay(lunarMonth: any, data: any) {
        let type: any;
        if (lunarMonth == 1 || lunarMonth == 4 || lunarMonth == 7 || lunarMonth == 10) {
            type = data.Departure[0]
        } else if (lunarMonth == 2 || lunarMonth == 5 || lunarMonth == 8 || lunarMonth == 11) {
            type = data.Departure[1];
        } else if (lunarMonth == 3 || lunarMonth == 6 || lunarMonth == 9 || lunarMonth == 12) {
            type = data.Departure[2];
        }
        return type;
    }

    getInfoDayInMonth(lunarDate: any, lunarMonth: any, data: any) {
        let type = this.getTypeOfDay(lunarMonth, data);
        let day: any[] = type.day;
        for (let x of day) {
            for (let y of x.dayindex) {
                if (lunarDate == y) {
                    return new Array(x.nameofday, x.comment ,x.id)
                }
            }
        }
    }






}