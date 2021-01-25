import { Injectable } from '@angular/core';
import { RegistrarLlamadaModel } from '../../models/registrarLlamada.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class LlamadasService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  cargarLlamadas(id: string): any {

    let url = URL_SERVICIOS + '/llamadas/' + id;
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

  crearLlamada(llamada: RegistrarLlamadaModel): any {
    let url = URL_SERVICIOS + '/llamadas/';
    url += '?token=' + this.token;

    return this.http.post(url, llamada).pipe(
      map(
        (resp: any) => {
          var respuesta = resp.llamada.fkcontacto + '/' + resp.llamada.createdAt;
          return respuesta;
        }
      )
    );
  }


  reporteLlamadas(): any {
    let url = URL_SERVICIOS + '/llamadas/reporte';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.reporteLlamadas;
          }
        )
      );
  }




  eliminarLlamada(idLlamada: string): any {
    let url = URL_SERVICIOS + '/llamadas/' + idLlamada;
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

}
