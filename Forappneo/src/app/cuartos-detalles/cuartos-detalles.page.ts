import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuartos-detalles',
  templateUrl: './cuartos-detalles.page.html',
  styleUrls: ['./cuartos-detalles.page.scss'],
})
export class CuartosDetallesPage implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  id:any;
  idCuarto:any;

  casa:any =[];
  cuarto:any =[];

  servicio:any =[];

  comentarios: FormGroup
  comentariosList: any =[];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {

    this.comentarios = this.formBuilder.group({
      'comentario': ['', Validators.required]
    })

    this.id = this.route.snapshot.paramMap.get("id");
    this.idCuarto = this.route.snapshot.paramMap.get("idCuarto");
    console.log(this.id);
    console.log(this.idCuarto)

    this.api.getCuarto(this.idCuarto, localStorage.getItem('token')).subscribe(response =>{
      console.log(response)
      this.cuarto = response
      this.recargarComentarios()
      this.servicio = [{
        nombre: "Agua",
        valor: this.cuarto.agua
      },{
        nombre: "Luz",
        valor: this.cuarto.luz
      },{
        nombre: "Internet",
        valor: this.cuarto.internet
      },{
        nombre: "Alimentacion",
        valor: this.cuarto.alimentacion
      },{
        nombre: "Baño propio",
        valor: this.cuarto.banoPropio
      },{
        nombre: "Amueblado",
        valor: this.cuarto.amueblado
      }]

      /*
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
      */
    }, error =>{
      console.log(error)
    })

    this.api.getCasa(this.id, localStorage.getItem('token')).subscribe(response =>{
      console.log(response)
      this.casa = response
      this.lat = this.casa[0].latitud
      this.lng = this.casa[0].longitud
      console.log(this.lat)
    }, erro=>{
      console.log(erro)
    })


  }


  recargarComentarios(){
    this.api.getComentario(this.cuarto.id, localStorage.getItem('token')).subscribe(response =>{
      console.log(response)
      this.comentariosList = response
    }, error=>{
      console.log(error)
    })
  }

  comentar(){
    let query = {
      comentario: this.comentarios.get('comentario').value,
      cuarto: this.cuarto.id,
      user: localStorage.getItem('userId')
    }

    this.api.hacerComentario(query, localStorage.getItem('token')).subscribe(response =>{
      console.log(query)
      console.log(response)
      this.recargarComentarios()
    })
    
  }

  getUsuario(id:any){
    this.api.getUserById(id, localStorage.getItem('token')).subscribe(response =>{
      console.log(response)
    }, error=>{ 
      console.log(error)
    })
  }


}
