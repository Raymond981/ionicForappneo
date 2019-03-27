import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API: string = "http://192.168.0.18:8000";

  constructor(private http: HttpClient) { }

  login(params:any) : Observable<any>{
    return this.http.post(`${this.API}/api/v1/login/`, params)
  }

  register(params:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }

    return this.http.post(`${this.API}/api/v2/auth/registration/`, params);
  }

  getUser(token):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.get(`${this.API}/api/v2/users/`, httpOptions);
  }
  
  registerProfile(params:any, token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.post(`${this.API}/api/v2/register/profile/`, params, httpOptions);
  }

}
