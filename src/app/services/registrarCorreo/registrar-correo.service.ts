import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import { RegistrarCorreoModel } from '../../models/registrarCorreo.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrarCorreoService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  registrarCorreo(correo: RegistrarCorreoModel): any {
    let url = URL_SERVICIOS + '/rcorreos/';
    url += '?token=' + this.token;
    return this.http.post(url, correo).pipe(
      map(
        (resp: any) => {
          var respuesta = resp.correo.fkcontacto + '/' + resp.correo.createdAt;
          return respuesta;
        }
      )
    );
  }


  eliminarCorreo(idCorreo: string): any {
    let url = URL_SERVICIOS + '/rcorreos/' + idCorreo;
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


  // actualizarCorreo(correo: RegistrarCorreoModel): any {
  //   let url = URL_SERVICIOS + '/rcorreos/' + correo.id;
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
    let url = URL_SERVICIOS + '/rcorreos/' + idContacto;
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