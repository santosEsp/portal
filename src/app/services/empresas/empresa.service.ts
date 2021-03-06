import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { EmpresaModel } from 'src/app/models/empresa.model';

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
            return resp.empresa;
          }
        )
      );
  }

  cargarEmpresas(inicio: number): any {
    let url = URL_SERVICIOS + '/empresas/paginacionEmpresas/' + inicio;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.empresas;
          }
        )
      );
  }

  cargarTodasLasEmpresas(): any {
    let url = URL_SERVICIOS + '/empresas/todasLasEmpresas/lista';
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.empresas;
          }
        )
      );
  }


  cargarListaEmpresas(): any {
    let url = URL_SERVICIOS + '/empresas/listaEmpresas/';
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
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
            return resp.empresa;
          }
        )
      );
  }


  cargarMisEmpresas(miId: number, desde: number): any {
    let url = URL_SERVICIOS + '/empresas/paginacionMisEmpresas/' + miId + '/' + desde;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.misEmpresas;
          }
        )
      );
  }

  cargarTodasMisEmpresas(miId: number): any {
    let url = URL_SERVICIOS + '/empresas/todasMisEmpresas/lista/' + miId;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.empresas;
          }
        )
      );
  }


  cargarUnaEmpresa(idEmpresa: number): any {
    let url = URL_SERVICIOS + '/empresas/' + idEmpresa;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.unaEmpresa;
          }
        )
      );
  }

  contadorEmpresasBD(): any {
    let url = URL_SERVICIOS + '/empresas/contadorEmpresas/';
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.contador[0].contador;
          }
        )
      );
  }

  contadorMisEmpresasBD(miId: number): any {
    let url = URL_SERVICIOS + '/empresas/contadorMisEmpresas/' + miId;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.contador[0].contador;
          }
        )
      );
  }

  buscarEmpresa(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/empresas/' + "'" + termino + "'";
    return this.http.get(url)
      .pipe(map((resp: any) => resp.empresas));
  }

  buscarMiEmpresa(termino: string, id: number) {

    let url = URL_SERVICIOS + '/busqueda/misempresas/' + id + '/' + "'" + termino + "'";
    return this.http.get(url)
      .pipe(map((resp: any) => resp.empresas));
  }

}
