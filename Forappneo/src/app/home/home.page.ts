import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  credenciales : FormGroup;
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
  }

  async login(){
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: 'Cargando...',
      duration: 1500
    });

    this.API.login(this.credenciales.value).subscribe(response =>{
      console.log(response);
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
