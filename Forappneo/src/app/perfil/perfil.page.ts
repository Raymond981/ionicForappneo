import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { EditPerfilModalComponent } from '../edit-perfil-modal/edit-perfil-modal.component';
import { Camera, CameraOptions  } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  arreglo:any = []
  photo:string;
  photoElegida:string;
  constructor(
    private router : Router,
    private api: ApiService,
    private editModal: ModalController,
    private camara: Camera,
    private imagenPicker: ImagePicker
  ) {
   }

  ngOnInit() {
    this.api.getPerfil(localStorage.getItem('token'), localStorage.getItem('userId')).subscribe(response =>{
      console.log(response) //Imprime perfil
      this.arreglo = response

    }, error=>{
      console.log(error)
    })
  }

  opciones: CameraOptions = {
    quality: 50,
    destinationType: this.camara.DestinationType.DATA_URL,
    encodingType: this.camara.EncodingType.JPEG,
    mediaType: this.camara.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true,
  }

  elegirFoto(){
    let opciones = {
      maximumImagesCout:1,
      quality: 90,
      outputType:1
    };

    this.imagenPicker.getPictures(opciones).then(response =>{
      this.photoElegida = 'data:image/jpeg;base64,'+response[0]


      let query = {
        imagen: this.photoElegida,
        name: this.arreglo.name,
        type_user: 1,
        user: localStorage.getItem('userId')
      }

      this.api.editarProfile(query, localStorage.getItem('token'), localStorage.getItem('userId')).subscribe(response =>{
        console.log(response)
        this.ngOnInit()
      }, error=>{
        console.log(error)
      })

    }, error =>{
      console.log(error)
    })
  }


  tomarFoto(){
    this.camara.getPicture(this.opciones).then(ImageData =>{
      console.log(ImageData);
      console.log("Se tomó una foto.");
      this.photo = 'data:image/jpeg;base64,'+ImageData;
      console.log(this.photo);

      let query = {
        imagen: this.photo,
        name: this.arreglo.name,
        type_user: 1,
        user: localStorage.getItem('userId')
      }

      this.api.editarProfile(query, localStorage.getItem('token'), localStorage.getItem('userId')).subscribe(response =>{
        console.log(response)
        this.ngOnInit()
      }, error=>{
        console.log(error)
      })
      
    }).catch(error =>{
      console.log(error); 
    })
  }

  regresar(){
    this.router.navigateByUrl("/inicio")
  }

  async editar() {
    const modal = await this.editModal.create({
      component: EditPerfilModalComponent,
      cssClass: 'modal'
    });
    modal.onDidDismiss().then(()=>this.ngOnInit());
    return await modal.present();
  }
}
