import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API: string = "http://192.168.0.26:8000";

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

    return this.http.post(`${this.API}/api/v2/auth/registration/`, params, httpOptions);
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

  getUserById(id, token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }
    return this.http.get(`${this.API}/api/v2/users/lists/${id}/`, httpOptions)
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

  getPerfil(token, id){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }
    
    return this.http.get(`${this.API}/api/v2/register/profile/${id}/`, httpOptions)
  }

  editarProfile(params:any, token, id){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.put(`${this.API}/api/v2/register/profile/${id}/`, params, httpOptions);
  }

  filtrarCuartos(params:any, token){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.post(`${this.API}/api/v2/cuartos/buscador/`, params, httpOptions)
  }

  getCasa(id:any, token){

    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.get(`${this.API}/api/v2/casas/lists/${id}/`, httpOptions)
  }


  getCuarto(id:any, token){

    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.get(`${this.API}/api/v2/cuartos/home/${id}/`, httpOptions)
  }


  hacerComentario(params:any, token){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.post(`${this.API}/api/v2/comentarios/home/`, params, httpOptions)
  }

  getComentario(idCuarto, token){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : `Token ${token}`
      })
    }

    return this.http.get(`${this.API}/api/v2/comentarios/lists/${idCuarto}/`, httpOptions)
  }
}
