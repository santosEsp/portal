import { Injectable } from '@angular/core';
import { RecuperarPaswordModel } from '../../models/recuperarPassword.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RecuperaPasswordService {
  constructor(private http: HttpClient) {
  }
  recuperarPass(correo: RecuperarPaswordModel): any {

    console.log('Esto recibo ppara enviar Service: ', correo);
    let url = URL_SERVICIOS + '/recuperarPassword/';
    return this.http.post(url, correo).pipe(
      map(
        (resp: any) => {
          console.log('Respuesta del server: ', resp);
          return resp;
        }
      )
    );
  }
}
