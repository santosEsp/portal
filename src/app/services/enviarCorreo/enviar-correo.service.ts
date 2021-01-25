import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { EnviarCorreoModel } from '../../models/enviarCorreo.model';

@Injectable({
  providedIn: 'root'
})
export class EnviarCorreoService {
  token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  enviarCorreo(modeloCorreo: EnviarCorreoModel): any {
    let url = URL_SERVICIOS + '/enviarCorreo/send';
    url += '?token=' + this.token;
    return this.http.post(url, modeloCorreo)
      .pipe(
        map(
          (resp: any) => {
            return resp.correos;
          }
        )
      );
  }

  obtenerCorreos(fkContacto: string) {
    let url = URL_SERVICIOS + '/enviarCorreo/enviados/' + fkContacto;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.eCorreos;
          }
        )
      );
  }


  reporteUltimosCorreosEnviados(): any {
    let url = URL_SERVICIOS + '/enviarCorreo/reporte';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.reporteCorreos;
          }
        )
      );
  }




}
