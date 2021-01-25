import { Injectable } from '@angular/core';
import { NotaModel } from '../../models/nota.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  token: string
  accionUltima: String;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  crearNota(nota: NotaModel): any {
    let url = URL_SERVICIOS + '/notas/';
    url += '?token=' + this.token;
    return this.http.post(url, nota).pipe(
      map(
        (resp: any) => {
         // this.accionUltima = resp.nota.createdAt + "/" + resp.nota.fkcontactos;
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
            return true;
          }
        )
      );
  }

  // actualizarNota(nota: NotaModel): any {
  //   let url = URL_SERVICIOS + '/notas/' + nota.id;
  //   url += '?token=' + this.token;

  //   return this.http.put(url, nota)
  //     .pipe(
  //       map(
  //         (resp: any) => {
  //           return resp.nota;
  //         }
  //       )
  //     );
  // }

  cargarNotas(id: string): any {

    let url = URL_SERVICIOS + '/notas/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.notas;
          }
        )
      );
  }
}
