import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';
import { RegistrarReunionModel } from '../../models/registrarReunion.model';
@Injectable({
  providedIn: 'root'
})
export class RegistrarReunionService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  registrarReunion(reunion: RegistrarReunionModel): any {
    let url = URL_SERVICIOS + '/reuniones/';
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


  eliminarReunion(id: string): any {
    let url = URL_SERVICIOS + '/reuniones/' + id;
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


  actualizarReunion(reunion: RegistrarReunionModel): any {
    let url = URL_SERVICIOS + '/reuniones/' + reunion.id;
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
    let url = URL_SERVICIOS + '/reuniones/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.reuniones;
          }
        )
      );
  }

  reporteReuniones(): any {
    let url = URL_SERVICIOS + '/reuniones/reporte';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.reporteReuniones;
          }
        )
      );
  }
}
