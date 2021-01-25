import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
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
          return resp.reunion;
        }
      )
    );
  }

  eliminarReunion(id: string): any {
    let url = URL_SERVICIOS + '/reunionesempresas/' + id;
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

  // actualizarReunion(reunion: ReunionesEmpresasModel): any {
  //   let url = URL_SERVICIOS + '/reunionesempresas/' + reunion.id;
  //   url += '?token=' + this.token;

  //   return this.http.put(url, reunion)
  //     .pipe(
  //       map(
  //         (resp: any) => {
  //           return resp.reunion;
  //         }
  //       )
  //     );
  // }

  cargarReuniones(id: string): any {
    let url = URL_SERVICIOS + '/reunionesempresas/' + id;
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
}
