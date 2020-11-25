import { Injectable } from '@angular/core';
import { LlamadasEmpresasModel } from '../../models/llamadasEmpresas';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';

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

  crearLlamada(llamada: LlamadasEmpresasModel): any {
    console.log('llamada empresa service', llamada);
    let url = URL_SERVICIOS + '/llamadasempresas/';
    url += '?token=' + this.token;

    return this.http.post(url, llamada).pipe(
      map(
        (resp: any) => {
          Swal.fire('Llamada', 'Llamada agregada correctamente', 'success');
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

  actualizarLlamada(llamada: LlamadasEmpresasModel): any {
    let url = URL_SERVICIOS + '/llamadasempresas/' + llamada.id_llamada;
    url += '?token=' + this.token;

    return this.http.put(url, llamada)
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
}
