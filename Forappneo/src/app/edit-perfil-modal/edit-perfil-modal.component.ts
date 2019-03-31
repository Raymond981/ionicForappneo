import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-perfil-modal',
  templateUrl: './edit-perfil-modal.component.html',
  styleUrls: ['./edit-perfil-modal.component.scss'],
})
export class EditPerfilModalComponent implements OnInit {
  formEdit:FormGroup

  arreglo:any = []

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modal: ModalController
  ) {
    this.formEdit = formBuilder.group({
      'name': ['', Validators.required]
    })
  }

  ngOnInit() {
    this.api.getPerfil(localStorage.getItem('token'), localStorage.getItem('userId')).subscribe(response =>{
      console.log(response) //Imprime perfil
      this.arreglo = response

    }, error=>{
      console.log(error)
    })
  }

  finalizarEdit(){

    let query = {
      name : this.formEdit.get('name').value,
      user: localStorage.getItem('userId'),
      type_user: 1
    }

    this.api.editarProfile(query, localStorage.getItem('token'), localStorage.getItem('userId')).subscribe(response =>{
      console.log("Editado: " + response)
      this.modal.dismiss()
    }, error=>{
      console.log(error)
    })
  }



}
