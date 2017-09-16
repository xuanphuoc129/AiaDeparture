import { Injectable } from '@angular/core';
import { NavController, Platform, LoadingController, Loading, ToastController } from "ionic-angular";


export class AppController {

  private static _instance: AppController = null;

  private mNavController: NavController = null;

  private mPlatform: Platform = null;

  private mLoadingController: LoadingController = null;

  private mToastController: ToastController = null;


  private constructor() {

  }

  public static getInstance(): AppController {
    if (this._instance == null || this._instance == undefined) this._instance = new AppController();
    return this._instance;
  }
  public setNavController(nav: NavController) {
    if (this.mNavController) return;
    this.mNavController = nav;
  }
  public hasNavController() {
    return this.mNavController != null;
  }
  public getNavController() {
    return this.mNavController;
  }
  public setPlatform(platform: Platform) {
    this.mPlatform = platform;
  }
  public getPlatform(): Platform {
    return this.mPlatform;
  }

  public isAndroid() {
    if (this.mPlatform) {
      return this.mPlatform.is("android");
    }
    return false;
  }
  public isIOS() {
    if (this.mPlatform) {
      return this.mPlatform.is("ios");
    }
    return false;
  }
  public isOnMobileDevice() {
    if (this.mPlatform) {
      return this.mPlatform.is("mobile");
    }
    return false;
  }

  public setLoadingController(loadingController: LoadingController) {
    this.mLoadingController = loadingController;
  }

  public doExitApps() {
    if (this.mPlatform) {
      this.mPlatform.exitApp();
    }
  }

  public doShowToast(message: string, durration?: number, position?: string) {
    let mDuration = 2000;
    if (durration) mDuration = durration;
    let mPosition = "bottom";
    if (position) mPosition = position;
    let toast = this.mToastController.create({
      message: message,
      duration: mDuration,
      position: mPosition
    });
    toast.present();
  }


  private mLoading: Loading = null;
  public doShowLoading(duration?: number) {

    if (this.mLoading == null || this.mLoading == undefined) {
      let mDuration: number = 2000;
      if (duration) mDuration = duration;
      this.mLoading = this.mLoadingController.create({
        content: "Vui lòng đợi..",
        spinner: "ios",
        duration: mDuration
      });
      this.mLoading.onDidDismiss(() => {
        this.mLoading = null;
      });
      this.mLoading.present();
    }
  }

  public doCloseLoading() {
    if (this.mLoading) {
      this.mLoading.dismiss();
    } else {
      this.mLoading = null;
    }
  }

}
