import {Platform, NavController, Alert, AlertController} from 'ionic-angular';
import {NgZone, Component} from '@angular/core';

declare var touchid: any;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  authenticated: boolean;
  constructor(ngZone: NgZone, platform: Platform, navController: NavController, alertController: AlertController) {
    this.authenticated = false;
    platform.ready().then(() => {
      touchid.checkSupport(() => {
        touchid.authenticate((result) => {
          ngZone.run(() => {
            this.authenticated = true;
          });
        }, (error) => {
          let alert = alertController.create({
            title: "Attention!",
            subTitle: error,
            buttons: ["Close"]
          });
          alert.present();
        }, "Please Authenticate");
      }, (error) => {
        let alert = alertController.create({
          title: "Attention!",
          subTitle: "Touch ID is not supported",
          buttons: ["Close"]
        });
        alert.present();
      });
    });
  }
}