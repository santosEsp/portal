import { Injectable } from '@angular/core';
import { LlamadasEmpresasModel } from '../../models/llamadasEmpresas';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class LlamadasEmpresasService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  cargarLlamadas(id: string): any {
    let url = URL_SERVICIOS + '/llamadasempresas/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.llamadas;
          }
        )
      );
  }

  crearLlamada(llamada: LlamadasEmpresasModel): any {
    let url = URL_SERVICIOS + '/llamadasempresas/';
    url += '?token=' + this.token;

    return this.http.post(url, llamada).pipe(
      map(
        (resp: any) => {
          return resp.llamadaempresa;
        }
      )
    );
  }

  eliminarLlamada(id: string): any {
    let url = URL_SERVICIOS + '/llamadasempresas/' + id;
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

  // actualizarLlamada(llamada: LlamadasEmpresasModel): any {
  //   let url = URL_SERVICIOS + '/llamadasempresas/' + llamada.id_llamada;
  //   url += '?token=' + this.token;

  //   return this.http.put(url, llamada)
  //     .pipe(
  //       map(
  //         (resp: any) => {
  //           return resp.nota;
  //         }
  //       )
  //     );
  // }
}
