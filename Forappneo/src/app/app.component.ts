import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase'; 

var config = {
  apiKey: "AIzaSyDceY02_NYos2dMehvSeY-U4r4BEDJqFgU",
  authDomain: "forappneo.firebaseapp.com",
  databaseURL: "https://forappneo.firebaseio.com",
  projectId: "forappneo",
  storageBucket: "forappneo.appspot.com",
  messagingSenderId: "127246607834"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})



export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
