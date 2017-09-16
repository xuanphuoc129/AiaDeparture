
export class ResponseCode {
  public static FAILED: number = 0;
  public static SUCCESS: number = 1;
  public static TIMEOUT: number = 2;

}
export class ParamsKey {
  public static PLATFORM: string = "platform";
  public static VERSION: string = "version";
  public static DEVICE_NAME: string = "device_name";
  public static DEVICE_ID: string = "device_id";
  public static SIGN: string = "sign";
  public static STATUS: string = "status";
  public static MESSAGE: string = "message";
  public static ID: string = "id";
  public static USER_NAME: string = "user_name";
  public static USERNAME: string = "username";
  public static TITLE: string = "title";
  public static PHONE: string = "phone";
  public static AVATAR: string = "avatar";
  public static ADDRESS: string = "address";
  public static CONTENT: string = "content";
  public static TYPE: string = "type";
  public static TIME_START: string = "time_start";
  public static TIME_END: string = "time_end";
  public static FIELD: string = "field";
  public static RANK: string = "rank";
  public static COUNT: string = "count";
  public static LOTTERY: string = "lottery";
  public static LOTO: string = "loto";
  public static CODE: string = "code";
  public static RANGE: string = "range";
  public static KEYWORD: string = "keyword";
  public static META: string = "meta";
  public static AMOUNT: string = "amount";
  public static DAY_OF_WEEK: string = "day_of_week";
  public static WEEKS: string = "weeks";
  public static CATE_ID: string = "cate_id";
  public static START_DATE: string = "start_date";
  public static VALUE: string = "value";
  public static TONG: string = "tong";
  public static MONEY_BET: string = "money_bet";
  public static MONEY: string = "money";
  public static STATE: string = "state";
  public static LIMIT: string = "limit";
  public static TIME: string = "time";
  public static YEAR: string = "year";
  public static DATE: string = "date";
  public static LIST: string = "list";
  public static CAU_LOAI: string = "cau_loai";
  public static CAU_HAI_NHAY: string = "cau_hai_nhay";
}



export class RequestState {
  public static READY: number = 0;
  public static REQUESTING: number = 1;
  public static SUCCESS: number = 2;
  public static FAIL: number = 3;
  public static DONE: number = 4;
}

export class LoginStatus {
  public static LOGGED_IN: number = 0;
  public static LOGING: number = 1;
  public static LOGGED_OUT: number = 2;
}

export class AppInterface {
  startpage: string;
  icon: string;
  name: string;
}