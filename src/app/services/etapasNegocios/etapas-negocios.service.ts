import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { EtapasNegocio } from '../../models/etapasNegocio';

@Injectable({
  providedIn: 'root'
})
export class EtapasNegociosService {
  token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  cargarEtapas(): any {
    let url = URL_SERVICIOS + '/etapas/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.etapas;
          }
        )
      );
  }

  actualizarEtapa(etapas: EtapasNegocio): any {
    let url = URL_SERVICIOS + '/etapas/' + etapas.id_etapa;
    url += '?token=' + this.token;
    return this.http.put(url, etapas)
      .pipe(
        map(
          (resp: any) => {
            return resp.etapa;
          }
        )
      );
  }
}
