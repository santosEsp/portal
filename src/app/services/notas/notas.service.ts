import { Injectable } from '@angular/core';
import { NotaModel } from '../../models/nota.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  crearNota(nota: NotaModel): any {
    let url = URL_SERVICIOS + '/notas/';
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

    let url = URL_SERVICIOS + '/notas/' + id;
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


  actualizarNota(nota: NotaModel): any {

    let url = URL_SERVICIOS + '/notas/' + nota.id;
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

    console.log('Nota service miId', id);
    let url = URL_SERVICIOS + '/notas/' + id;
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
