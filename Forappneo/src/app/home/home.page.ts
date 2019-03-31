import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  credenciales : FormGroup;
  subscription: Subscription;
  constructor(
    private http: HttpClient,
    private API: ApiService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router
  ){}

  ngOnInit(){
    this.credenciales = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    if(localStorage.getItem('token')){
      this.router.navigateByUrl("/inicio")
    }
  }

  async login(){
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: 'Cargando...',
      duration: 1500
    });

    this.subscription = this.API.login(this.credenciales.value).subscribe(response =>{
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user_id);
      localStorage.setItem('email', response.email);
      this.router.navigateByUrl("/inicio");
    }, error=>{
      console.log(error)
      this.ToastErrorCredenciales();
    });

    await loading.present().catch(error=>{
      console.log("Error" + error)
      this.ToastError()
    });

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!'); 
  }

  async ToastErrorCredenciales() {
    const toast = await this.toastController.create({
      message: '¡Credenciales incorrectas!',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Cerrar'
    });
    toast.present();
  }

  async ToastError() {
    const toast = await this.toastController.create({
      message: '¡Ocurrio un error inesperado!',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Cerrar'
    });
    toast.present();
  }

  register(){
    this.router.navigateByUrl('/registro');
  }
}
