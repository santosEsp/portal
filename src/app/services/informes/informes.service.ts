import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { DiaModel } from '../../models/dia.model';
import { map } from 'rxjs/Operators';


@Injectable({
  providedIn: 'root'
})
export class InformesService {
  URL = URL_SERVICIOS;
  token: any;

  private informes: Informe[] = [

  ];

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }
  getInformes(): Informe[] {
    return this.informes;
  }
  configUrl = URL_SERVICIOS;

  getConfig() {
    return this.http.get(this.configUrl);
  }

  cargarContactos(): any {
    let url = URL_SERVICIOS + '/informes/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.informes;
          }
        )
      );
  }

  cargarMejorSemana(): any {
    let url = URL_SERVICIOS + '/informes/mejorsemana/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.informes;
          }
        )
      );
  }

  cargarContactossuma(): any {
    let url = URL_SERVICIOS + '/informes/suma/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.informes;
          }
        )
      );
  }

  cargarFechaMinMax(): any {
    let url = URL_SERVICIOS + '/informes/fechaminmax/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.informes;
          }
        )
      );
  }

  cargarHistorico(fecha: string): any {

    let url = URL_SERVICIOS + '/informes/historico/' + "'" + fecha + "'";
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => { return resp.informes; }
        )
      );
  }
}

export interface Informe {
  match(regex: RegExp): any;
  dia: string;
  num_contactos: number;
}