import { Injectable } from '@angular/core';
import { RegistrarLlamadaModel } from '../../models/registrarLlamada.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LlamadasService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  cargarLlamadas(id: string): any {

    console.log('Cargar llamadas service', id);
    let url = URL_SERVICIOS + '/llamadas/' + id;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Llamadas service: ', resp.llamadas);
            return resp.llamadas;
          }
        )
      );
  }
}
