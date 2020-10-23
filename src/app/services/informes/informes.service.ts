import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';
import { DiaModel } from '../../models/dia.model';



@Injectable({
  providedIn: 'root'
})
export class InformesService {
    URL = URL_SERVICIOS;

  private informes: Informe  [] = [
    {
      dia : "Lunes",
      num_contactos : 40
    },
    {
      dia : "Martes",
      num_contactos : 40
    },
    {
      dia : "Miércoles",
      num_contactos : 40
    },  
    {
      dia : "Jueves",
      num_contactos : 40
    },
    {
      dia : "Viernes",
      num_contactos : 40
    },
    {
      dia : "Sábado",
      num_contactos : 40
    },
  ];

  constructor(private http:HttpClient) { 
    console.log("Servicio de informaes funciona :) ")
  }
  getInformes(): Informe[]{
    return this.informes;
  }
  configUrl = URL_SERVICIOS;

getConfig() {
  return this.http.get(this.configUrl);
}
}

export interface Informe{
  dia:string;
  num_contactos:number;
}