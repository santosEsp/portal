import { Injectable } from '@angular/core';
import { ContactoModel } from '../models/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  arregloContactos: ContactoModel[] = [{
    correo: 'santos@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'Gerardo@walmart.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'raul456@oxxo.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'yopppp@outlook.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'heyey@twitter.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'andres456@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'angel@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'manuel@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'maria@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'mariadelosangeles@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'mamalucha@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'elescorpiondorado@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'lusitocomunica@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'werever@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'holasoygerman@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },


  {
    correo: 'aleivanova@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'yalitza@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'amlo@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'loquesea@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'yabose123@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'edfrs456@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'pelicula@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'cine123@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'teatro456@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'musica@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'rolas123@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'gansito456@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'doritos@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'marinela123@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'gapsa456@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  }

];

  constructor() {

    console.log('Servicio creado para las consultas y asignaciones');

  }

  getContactos(){
    return this.arregloContactos;
  }

  getContacto(idx: string){
    
    return this.arregloContactos[idx];
  }

}
