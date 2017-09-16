export class UserDevice {
    cordova: string;
    model: string;
    platform: string;
    uuid: string;
    version: string;
    manufacture: string;
    serial: string;

    constructor() {
    }

    createDefault() {
        this.cordova = "4.4.0";
        this.model = "MacbookPro";
        this.platform = "web";
        this.uuid = "appinasia_macbook";
        this.version = "1.0";
        this.manufacture = "Macbook";
        this.serial = "appinasia_macbook";
    }
}