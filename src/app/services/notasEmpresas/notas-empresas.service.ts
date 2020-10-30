import { Injectable } from '@angular/core';
import { NotasEmpresasModel } from '../../models/notasEmpresas';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class NotasEmpresasService {
  token: string;
  constructor(private http: HttpClient) { this.token = localStorage.getItem('token'); }

  crearNota(nota: NotasEmpresasModel): any {
    let url = URL_SERVICIOS + '/notasempresas/';
    url += '?token=' + this.token;

    return this.http.post(url, nota).pipe(
      map(
        (resp: any) => {
          Swal.fire('Nota', 'Nota agregada correctamente', 'success');
          return resp.nota;
        }
      )
    );
  }

  eliminarNota(id: string): any {

    let url = URL_SERVICIOS + '/notasempresas/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Nota eliminada',
              text: 'Eliminada correctamente',
              icon: 'success',
            });

            return true;
          }
        )
      );
  }

  actualizarNota(nota: NotasEmpresasModel): any {

    let url = URL_SERVICIOS + '/notasempresas/' + nota.id;
    url += '?token=' + this.token;

    return this.http.put(url, nota)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Nota actualizada',
              text: 'Actualizada correctaente',
              icon: 'success',
            });

            return resp.nota;
          }
        )
      );
  }

  cargarNotas(id: string): any {

    console.log('Notas Empre ID recibido', id);
    let url = URL_SERVICIOS + '/notasempresas/' + id;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Notas service: ', resp.notas);
            return resp.notas;
          }
        )
      );
  }
}
