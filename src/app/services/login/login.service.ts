import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { UsuarioModel } from '../../models/usuarios.model';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  usuario: UsuarioModel;
  token: any;
  constructor(private http: HttpClient) {

  }


  login(usuario: UsuarioModel, recordarme: boolean = false) {
    if (recordarme) {
      localStorage.setItem('email', usuario.email)
    }
    else
      localStorage.removeItem('email');

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map(
        (resp: any) => {
          this.guardarStorage(resp.token, resp.usuario);
          return true;
        }
      )
    );

  }

  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.setItem('token', this.token);
    localStorage.removeItem('usuario');

    // Agregar el redireccionamiento
  }

  guardarStorage(token: string, usuario: UsuarioModel) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;    
  }

  // private guardarToken(idToken: string) {
  //   this.userToken = idToken;
  //   localStorage.setItem('token', idToken);

  //   let hoy = new Date();
  //   hoy.setSeconds(3600);

  //   localStorage.setItem('expiraEn', hoy.getTime().toString());
  // }

  // leerToken() {
  //   if (localStorage.getItem('token')) {
  //     this.userToken = localStorage.getItem('token');
  //   } else {
  //     this.userToken = '';
  //   }
  // }

  estaAutenticado(): boolean {
    this.token = localStorage.getItem('token')
    return ( this.token.length > 5)? true : false; 

    // const expira = Number(localStorage.getItem('expiraEn'));
    // const horaExpira = new Date();
    // horaExpira.setTime(expira);

    // if (horaExpira > new Date()) {
    //   return true;
    // } else {
    //   return false;
    // }

  }
}
