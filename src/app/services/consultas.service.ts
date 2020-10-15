import { Injectable } from '@angular/core';
import { ContactoModel } from '../models/contacto.model';
import { EmpresaModel } from '../models/empresa.model';

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
    propietario: 'Admin', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'raul456@oxxo.com', nombre: 'Raúl', apellido: 'Vázquez',
    propietario: 'Usuario1', departamento: 'Desarrollo', telefono: 2334534595, empresa: 'OXXO, S.A. de C.V.'
  },

  {
    correo: 'yopppp@outlook.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Admin', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
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
    propietario: 'Admin', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
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
    propietario: 'Admin', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },

  {
    correo: 'lusitocomunica@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Admin', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
  },
  {
    correo: 'werever@gmail.com', nombre: 'Santos', apellido: 'Espíritu',
    propietario: 'Admin', departamento: 'Desarrollo', telefono: 2311004595, empresa: 'ClickSoft'
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
  }

  ];



  arregloEmpresas: EmpresaModel[] = [
    {
      nombre: 'Walmart', propietario: 'Usuario 1 ', industria: 'Aviación', telefono: '4563452312', tipo: 'Revendedor',
      ciudad: 'Panzacola', estado: 'Tlaxacala', cp: '345456', noEmpleados: '1600', ingresos: '10,000,000',
      zonaHoraria: 'Zona Mexico UTC', descripcion: 'Nueva empresa', pagina: 'walmartsadecv@wmt.com'
    },
    {
      nombre: 'Bancomer', propietario: 'Usuario 2 ', industria: 'Banca', telefono: '4563452456', tipo: 'Cliente potencial',
      ciudad: 'Mexico', estado: 'Mexico', cp: '59545', noEmpleados: '20000', ingresos: '900,000,000',
      zonaHoraria: 'Zona Mexico UTC', descripcion: 'Nueva empresa', pagina: 'bancomer@bcm.com'
    }

  ];

  constructor() {

    // console.log('Servicio creado para las consultas y asignaciones');

  }

  getContactos() {
    return this.arregloContactos;
  }

  getContacto(idx: string) {

    return this.arregloContactos[idx] ;
  }


  getEmpresas() {
    return this.arregloEmpresas;
  }

  getEmpresa(idx: string) {
    return this.arregloEmpresas[idx];
  }

}
