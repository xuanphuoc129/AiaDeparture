
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
export class HeaderKey {
    key: string;
    value: string;
}
export class ParamBuilder {
    fields = [];
    private static _instance: ParamBuilder;
    constructor() { }

    public static builder() {
        if (this._instance == null || this._instance == undefined) this._instance = new ParamBuilder();
        this._instance.resetFields();
        return this._instance;
    }
    public static newBuilder() {
        return new ParamBuilder();
    }
    private resetFields() {
        this.fields = [];
    }
    public add(key, value) {
        this.fields.push({
            key: key,
            value: value
        });
        return this;
    }

    public addIgnoreNull(key, value) {
        if (value != null) {
            this.fields.push({
                key: key,
                value: value
            });
        }
        return this;
    }
    public addStringIgnoreEmpty(key, value: string) {
        if (value.length > 0) {
            this.fields.push({
                key: key,
                value: value
            });
        }
        return this;
    }
    public build(): string {
        let params: string = '';
        for (var i = 0; i < this.fields.length; i++) {
            params += this.fields[i].key + '=' + this.fields[i].value;
            if (i != this.fields.length - 1) {
                params += '&';
            }
        }
        return params;
    }
}
@Injectable()
export class HttpService {
    mHeader: Headers = new Headers();
    mDebugEnable: boolean = false;
    constructor(private http: Http) {
        this.mHeader.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    }

    public setDebugEnable(enable: boolean) {
        this.mDebugEnable = enable;
    }

    public getHttp(): Http {
        return this.http;
    }

    public requestGet(url: string, params: string, options?: RequestOptionsArgs) {
        if (this.mDebugEnable) console.log("request get : " + url + "?" + params);

        return new Promise((success, fail) => {
            this.http.get(url + "?" + params, options ? options : { headers: this.mHeader }).subscribe(data => { success(data.json()); }, error => { fail(error.json()); });
        }); 
    }

    public requestPost(url: string, params: string, options?: RequestOptionsArgs) {
        params = params.replace(/ /g, "%20");
        if (this.mDebugEnable) console.log("request post : " + url + "?" + params);

        return new Promise((success, fail) => {
            this.http.post(url, params, options ? options : { headers: this.mHeader }).subscribe(data => { success(data.json()); }, error => { fail(error.json()); });
        });
    }

    public requestPut(url: string, params: string, options?: RequestOptionsArgs) {
        params = params.replace(/ /g, "%20");
        if (this.mDebugEnable) console.log("request put : " + url + "?" + params);

        return new Promise((success, fail) => {
            this.http.put(url, params, options ? options : { headers: this.mHeader }).subscribe(data => { success(data.json()); }, error => { fail(error.json()); });
        });
    }
}

