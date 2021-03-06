import { Injectable } from '@angular/core';
import { NegocioModel } from '../../models/negocio.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class NegociosContactosService {
  token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  crearNegocio(negocio: NegocioModel): any {
    let url = URL_SERVICIOS + '/negociosContactos/';
    url += '?token=' + this.token;

    return this.http.post(url, negocio).pipe(
      map(
        (resp: any) => {
          let respuesta = resp.negocio.fkcontacto + '/' + resp.negocio.createdAt;
          return respuesta;
        }
      )
    );
  }


  eliminarNegocio(id: string): any {
    let url = URL_SERVICIOS + '/negociosContactos/' + id;
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

  actualizarNegocio(negocio: NegocioModel): any {

    let url = URL_SERVICIOS + '/negociosContactos/' + negocio.id_negocio;
    url += '?token=' + this.token;
    return this.http.put(url, negocio)
      .pipe(
        map(
          (resp: any) => {
            return resp.negocio;
          }
        )
      );
  }

  cargarNegociosConContacto(fkcontacto: string): any {
    let url = URL_SERVICIOS + '/negociosContactos/fkcontacto/' + fkcontacto;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.negocios;
          }
        )
      );
  }

  cargarNegocios(): any {
    let url = URL_SERVICIOS + '/negociosContactos/negocios/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.negocios;
          }
        )
      );
  }
}
