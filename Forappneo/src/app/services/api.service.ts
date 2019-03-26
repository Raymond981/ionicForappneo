import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API: string = "http://192.168.0.18:8000";

  constructor(private http: HttpClient) { }

  login(params) : Observable<any>{
    return this.http.post(`${this.API}/api/v1/login/`, params)
  }

}
