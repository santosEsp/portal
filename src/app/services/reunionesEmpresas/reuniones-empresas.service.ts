import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';
import { ReunionesEmpresasModel } from '../../models/reunionesEmpresas';

@Injectable({
  providedIn: 'root'
})
export class ReunionesEmpresasService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }



   registrarReunion(reunion: ReunionesEmpresasModel): any {
    let url = URL_SERVICIOS + '/reunionesempresas/';
    url += '?token=' + this.token;
    return this.http.post(url, reunion).pipe(
      map(
        (resp: any) => {
          Swal.fire('Reunión', 'Reunión registrado', 'success');
          return resp.reunion;
        }
      )
    );
  }


  eliminarCorreo(id: string): any {

    let url = URL_SERVICIOS + '/reunionesempresas/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Reunión eliminado',
              text: 'Eliminado correctamente',
              icon: 'success',
            });

            return true;
          }
        )
      );
  }


  actualizarReunion(reunion: ReunionesEmpresasModel): any {

    let url = URL_SERVICIOS + '/reunionesempresas/' + reunion.id;
    url += '?token=' + this.token;

    return this.http.put(url, reunion)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Reunión actualizado',
              text: 'Actualizado correctaente',
              icon: 'success',
            });

            return resp.reunion;
          }
        )
      );
  }


  cargarReuniones(id: string): any {

    console.log('Reuniones Empresa service ID', id);
    let url = URL_SERVICIOS + '/reunionesempresas/' + id;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Reuniones service: ', resp.reuniones);
            return resp.reuniones;
          }
        )
      );
  }
}
