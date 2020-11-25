import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';
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
    console.log('Registrar correoService', correo);
    let url = URL_SERVICIOS + '/correosempresas/';
    url += '?token=' + this.token;
    return this.http.post(url, correo).pipe(
      map(
        (resp: any) => {
          Swal.fire('Correo', 'Correo registrado', 'success');
          return resp.correo;
        }
      )
    );
  }


  eliminarCorreo(idNota: string): any {

    let url = URL_SERVICIOS + '/correosempresas/' + idNota;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Correo eliminado',
              text: 'Eliminado correctamente',
              icon: 'success',
            });

            return true;
          }
        )
      );
  }


  actualizarNota(correo: CorreosEmpresasModel): any {

    let url = URL_SERVICIOS + '/correosempresas/' + correo.id_rcorreo;
    url += '?token=' + this.token;

    return this.http.put(url, correo)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Nota actualizada',
              text: 'Actualizada correctaente',
              icon: 'success',
            });

            return resp.correo;
          }
        )
      );
  }


  cargarCorreos(idContacto: string): any {

    console.log('Correos empresa service Id', idContacto);
    let url = URL_SERVICIOS + '/correosempresas/' + idContacto;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Correos empresas service: ', resp.correos);
            return resp.correos;
          }
        )
      );
  }

}
