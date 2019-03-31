import { Component } from '@angular/core';

import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

import * as firebase from 'firebase'; 
import { FcmService } from './services/fcm.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';


var config = {
  apiKey: "AIzaSyCvHFm8K8paDtNU7V7sU9K4S7FLNc5TegI",
  authDomain: "gps-maps-79e8b.firebaseapp.com",
  databaseURL: "https://gps-maps-79e8b.firebaseio.com",
  projectId: "gps-maps-79e8b",
  storageBucket: "gps-maps-79e8b.appspot.com",
  messagingSenderId: "439529501313"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})



export class AppComponent {

  myKeyRegistration:string = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push,
    private fcmService: FcmService,
    private storage: Storage,
    private localNotifications: LocalNotifications,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.notificacion();

    firebase.initializeApp(config);
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Hechale un vistazo al nuevo cuarto!',
      message: 'Han creado un nuevo Cuarto',
      buttons: ['OK']
    });

    await alert.present();
  }

  notificacion() {

    const options: PushOptions = {
      android: {
        senderID: '439529501313'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe( (notification: any) => {
      let idSender = String(notification.additionalData.idSender);
      let myKeyRegistration = String(this.myKeyRegistration);

      if( idSender == myKeyRegistration ){
        console.log('Received a notification of me', notification);
      }
      else{
        console.log('Received a notification of other device', notification);
        this.presentAlert();
        this.localNotifications.schedule({
          id: 1,
          text: '¡Hechale un vistazo al nuevo cuarto!',
          data: { msg: "Se ha creado un nuevo cuarto" }
        }); 
      }
      }
    );

    pushObject.on('registration').subscribe((registration: any) => 
    {
      this.fcmService.subscribeTopic(registration.registrationId).subscribe( response => {
        this.myKeyRegistration = registration.registrationId;
        this.storage.set('keyRegistration', this.myKeyRegistration);
        console.log("Suscrito: "  + this.myKeyRegistration);
      })
      console.log('Device registered', registration)
    }
    );

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
