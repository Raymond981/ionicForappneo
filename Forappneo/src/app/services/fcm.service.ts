import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  URLSEND: string = 'https://fcm.googleapis.com/fcm/send';
  URLSUBSCRIBETOPIC: string = 'https://iid.googleapis.com/iid/v1:batchAdd';
 

  constructor(
    private http: HttpClient
  ) { 

  }

  subscribeTopic(token: string): Observable<any> { 
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAZlX_8oE:APA91bFAABvUfjdbDlzIYERb7dlvpXfead5AKRsQjqNWDKEJJkZKYUw-RAq-lWhMCBA9Vh_xXuXX_Fv-tbxLkVbJXs3l_KX500VN0M64P-S6ST3ObCmFyKAlR8BvfU_8O149_eKgGczP'
      })
    };

    const data = {
      to: "/topics/cuartos",
      registration_tokens: [token]
    }

    return this.http.post(this.URLSUBSCRIBETOPIC, data, headers)
  }

  sendNotification(idSender): Observable<any> {
    console.log('(3)the idSender is',idSender);
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAZlX_8oE:APA91bFAABvUfjdbDlzIYERb7dlvpXfead5AKRsQjqNWDKEJJkZKYUw-RAq-lWhMCBA9Vh_xXuXX_Fv-tbxLkVbJXs3l_KX500VN0M64P-S6ST3ObCmFyKAlR8BvfU_8O149_eKgGczP'
      })
    };

    const data = {
      data: {
        title: "¡Hechale un vistazo al nuevo cuarto!",
        message: "Se ha creado un cuarto pokemon",
        idSender: idSender
      },
      to: "/topics/cuartos"
    }

    return this.http.post(this.URLSEND, data, headers)
  }
}