import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { configCorreoModel } from '../../models/configurarCorreo';
@Injectable({
  providedIn: 'root'
})
export class ConfigurarCorreoService {

  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  guardarConfiguracion(config: configCorreoModel): any {
    let url = URL_SERVICIOS + '/configurarCorreo/';
    url += '?token=' + this.token;

    return this.http.post(url, config).pipe(
      map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }

  actualizarConfiguracion(config: configCorreoModel): any {
    let url = URL_SERVICIOS + '/configurarCorreo/';
    url += '?token=' + this.token;

    return this.http.put(url, config).pipe(
      map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }

  verificaConfiguracion(id: number): any {
    let url = URL_SERVICIOS + '/configurarCorreo/?id=' + id + '&';
    url += 'token=' + this.token;

    return this.http.get(url).pipe(
      map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }
}
