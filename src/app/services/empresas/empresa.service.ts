import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { EmpresaModel } from 'src/app/models/empresa.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  crearEmpresa(empresa: EmpresaModel): any {
    let url = URL_SERVICIOS + '/empresas/';
    url += '?token=' + this.token;


    return this.http.post(url, empresa)
      .pipe(
        map(
          (resp: any) => {

            Swal.fire(empresa.nombre, 'Empresa agregada correctamente', 'success');
            return resp.empresa;
          }
        )
      );
  }

  cargarEmpresas(): any {
    let url = URL_SERVICIOS + '/empresas/';
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('Lista empresas, empresa service', resp.empresas);
            return resp.empresas;
          }
        )
      );
  }



  eliminarEmpresa(id: string): any {

    let url = URL_SERVICIOS + '/empresas/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Empresa eliminada',
              text: 'Eliminado correctamente',
              icon: 'success',
            });

            return true;
          }
        )
      );
  }

  actualizarEmpresa(empresa: EmpresaModel): any {

    let url = URL_SERVICIOS + '/empresas/' + empresa.id_empresa;
    url += '?token=' + this.token;

    return this.http.put(url, empresa)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Empresa actualizada',
              text: 'Actualizada correctamente',
              icon: 'success',
            });

            return resp.empresa;
          }
        )
      );
  }


  cargarMisEmpresas(miId: string): any {

    console.log('service miId', miId);
    let url = URL_SERVICIOS + '/empresas/misempresas/' + miId;
    url += '?token=' + this.token;

    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('mis empresas service: ', resp.misEmpresas);
            return resp.misEmpresas;
          }
        )
      );
  }


  cargarUnaEmpresa(idEmpresa: number): any {

    console.log('service idEmpresa', idEmpresa);
    let url = URL_SERVICIOS + '/empresas/' + idEmpresa;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('cargarUnaEmpresa service: ', resp.unaEmpresa);
            return resp.unaEmpresa;
          }
        )
      );
  }
}
