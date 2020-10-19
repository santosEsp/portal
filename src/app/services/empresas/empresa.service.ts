import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { URL_SERVICIOS } from 'src/app/config/config';
import { EmpresaModel } from 'src/app/models/empresa.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  token : any;
  
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token');
  }


  crearEmpresa(empresa : EmpresaModel){
    let url = URL_SERVICIOS + '/empresas/';    
    // url += '?token=' + this.token;


    return this.http.post(url, empresa)
      .pipe(
        map(
          (resp : any) =>{
            Swal.fire(empresa.nombre, 'Empresa agregada correctamente', 'success');
            return resp.empresa;
          }
        )
      )
  }

  cargarEmpresas(){
    let url = URL_SERVICIOS + '/empresas/';    
    // url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp : any) =>{
            return resp.empresas;
          }
        )
      )
  }
}
