import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import { CorreosEmpresasModel } from '../../models/correosEmpresas';

@Injectable({
  providedIn: 'root'
})
export class CorreosEmpresasService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  registrarCorreo(correo: CorreosEmpresasModel): any {
    let url = URL_SERVICIOS + '/correosempresas/';
    url += '?token=' + this.token;
    return this.http.post(url, correo).pipe(
      map(
        (resp: any) => {
          return resp.correo;
        }
      )
    );
  }


  eliminarCorreo(idCorreo: string): any {

    let url = URL_SERVICIOS + '/correosempresas/' + idCorreo;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            return true;
          }
        )
      );
  }


  // actualizarNota(correo: CorreosEmpresasModel): any {

  //   let url = URL_SERVICIOS + '/correosempresas/' + correo.id_rcorreo;
  //   url += '?token=' + this.token;

  //   return this.http.put(url, correo)
  //     .pipe(
  //       map(
  //         (resp: any) => {
  //           return resp.correo;
  //         }
  //       )
  //     );
  // }


  cargarCorreos(idContacto: string): any {

    let url = URL_SERVICIOS + '/correosempresas/' + idContacto;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.correos;
          }
        )
      );
  }

}
