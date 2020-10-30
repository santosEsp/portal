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

    console.log('Cargar llamadas empresas service', id);
    let url = URL_SERVICIOS + '/llamadasempresas/' + id;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Llamadas empresas service: ', resp.llamadas);
            return resp.llamadas;
          }
        )
      );
  }
}
