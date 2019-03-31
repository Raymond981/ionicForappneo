import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registrarFrom: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrarFrom = this.formBuilder.group({
      'username': ['', Validators.required],
      'email':['', Validators.required],
      'password1': ['', Validators.required],
      'password2': ['', Validators.required],
      'type_user': ['', Validators.required],
      'name': ['', Validators.required]
    })
  }

  registrar(){
    let params = {
      username: this.registrarFrom.get('username').value,
      email: this.registrarFrom.get('email').value,
      password1: this.registrarFrom.get('password1').value,
      password2: this.registrarFrom.get('password2').value,
    }

    this.api.register(params).subscribe(response =>{

      // Obtener el id del usuario
      var token = response.key;

      this.api.getUser(response.key).subscribe(response =>{
        let userId = response[0].id;

        //Registrar el profile del user
        let paramsProfile = {
          name: this.registrarFrom.get('name').value,
          type_user: this.registrarFrom.get('type_user').value,
          imagen: "https://image.flaticon.com/icons/png/512/163/163815.png",
          user: userId,
        }

        this.api.registerProfile(paramsProfile, token).subscribe(response =>{
          console.log(response);
          if( response ){
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('email', this.registrarFrom.get('email').value);
            console.log("Se registro correctamente")
            this.router.navigateByUrl("/inicio");
          }
        })
      })

    }, err=>{
      let errores = err.error;
      console.log(err.error);
    });
  }

  regresar(){
    this.router.navigateByUrl('/home');
  }
}
