import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  luz:number;
  agua:number;
  internet:number;
  alimentacion:number;

  cuartos:any = []

  data = [
    {
      nombre: "Luz",
      seleccionado: false
    },
    {
      nombre: "Agua",
      seleccionado: false
    },
    {
      nombre: "Internet",
      seleccionado: false
    },
    {
      nombre: "Alimentación",
      seleccionado: false
    }
  ]


  constructor(
    private router : Router,
    private api: ApiService
  ) { }

  ngOnInit() {

  }

  salir(){
    localStorage.clear()
    this.router.navigateByUrl("/home")
  }

  buscar(){
    
    if(this.data[0].seleccionado){
      this.luz = 1;
    }else{
      this.luz = -1;
    }

    if(this.data[1].seleccionado){
      this.agua = 1;
    }else{
      this.agua = -1;
    }

    if(this.data[2].seleccionado){
      this.internet = 1;
    }else{
      this.internet = -1;
    }

    if(this.data[3].seleccionado){
      this.alimentacion = 1;
    }else{
      this.alimentacion = -1;
    }

    let query = {
      agua: this.agua,
      luz: this.luz,
      internet: this.internet,
      alimentacion: this.alimentacion,
      mensualidad: -1,
      tipoPago:-1,
      banoPropio: -1,
      sexo: "null",
      capacidad: -1,
      amueblado: -1,
      cocina: "null",
      tamano: -1,
      casa: 1
    }
  

    console.log(query)

    this.api.filtrarCuartos(query, localStorage.getItem('token')).subscribe(response=>{
      console.log("entro")
      console.log(response)
      this.cuartos = response
    }, error=>{
      console.log(error)
    })

  }

  perfil(){
    this.router.navigateByUrl("/perfil")
  }

}
