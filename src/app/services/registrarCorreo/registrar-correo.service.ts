import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';
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
          Swal.fire('Nota', 'Correo registrado', 'success');
          return resp.correo;
        }
      )
    );
  }


  eliminarCorreo(idNota: string): any {

    let url = URL_SERVICIOS + '/rcorreos/' + idNota;
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


  actualizarNota(correo: RegistrarCorreoModel): any {

    let url = URL_SERVICIOS + '/rcorreos/' + correo.id;
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

    console.log('R correo service miId', idContacto);
    let url = URL_SERVICIOS + '/rcorreos/' + idContacto;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Correos service: ', resp.correos);
            return resp.correos;
          }
        )
      );
  }


}
