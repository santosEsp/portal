import { Injectable } from '@angular/core';
import { NotasEmpresasModel } from '../../models/notasEmpresas';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';

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
            return true;
          }
        )
      );
  }

  // actualizarNota(nota: NotasEmpresasModel): any {
  //   let url = URL_SERVICIOS + '/notasempresas/' + nota.id;
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
    let url = URL_SERVICIOS + '/notasempresas/' + id;
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
