import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';
import { NegociosEmpresaModel } from '../../models/negociosEmpresa';

@Injectable({
  providedIn: 'root'
})
export class NegociosEmpresasService {
  token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  crearNegocio(negocio: NegociosEmpresaModel): any {
    let url = URL_SERVICIOS + '/negociosEmpresas/';
    url += '?token=' + this.token;

    return this.http.post(url, negocio).pipe(
      map(
        (resp: any) => {
          Swal.fire(negocio.createdAt,  'Negocio agregado correctamente', 'success');
          return resp.negocio;
        }
      )
    );
  }


  eliminarNegocio(id: string): any {
    let url = URL_SERVICIOS + '/negociosEmpresas/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Negocio eliminado',
              text: 'Eliminado correctamente',
              icon: 'success',
            });
            return true;
          }
        )
      );
  }

  actualizarNegocio(negocio: NegociosEmpresaModel): any {

    let url = URL_SERVICIOS + '/negociosEmpresas/' + negocio.id_negocio;
    url += '?token=' + this.token;

    return this.http.put(url, negocio)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Negocio actualizado',
              text: 'Actualizado correctamente',
              icon: 'success',
            });

            return resp.negocio;
          }
        )
      );
  }

  cargarNegociosConEmpresa(fkempresa: string): any {
    let url = URL_SERVICIOS + '/negociosEmpresas/fkempresa/' + fkempresa;
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
    let url = URL_SERVICIOS + '/negociosEmpresas/negocios/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Negocios Empresas Service', resp.negocios);
            return resp.negocios;
          }
        )
      );
  }
}
