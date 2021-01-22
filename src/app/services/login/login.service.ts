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
  rol: string;
  constructor(private http: HttpClient) {

  }


  login(usuario: UsuarioModel, recordarme: boolean = false): any {
    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map(
        (resp: any) => {
          this.guardarStorage(resp.token, resp.usuario, resp.calculatedExpiresIn);
          return true;
        }
      )
    );

  }

  logout(): any {

    this.usuario = null;
    this.token = '';

    localStorage.setItem('token', this.token);
    localStorage.removeItem('usuario');

    // Agregar el redireccionamiento
  }

  guardarStorage(token: string, usuario: UsuarioModel, expiraEn: string): any {
    localStorage.setItem('token', token);
    localStorage.setItem('calculatedExpiresIn', expiraEn);
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
    this.token = localStorage.getItem('token');
    // const expira = Number(localStorage.getItem('calculatedExpiresIn'));
    // const horaExpira = new Date();
    // horaExpira.setTime(expira);

    // if (horaExpira > new Date()) {
    //   return true;
    // } else {
    //   return false;
    // }

    return (this.token.length > 5) ? true : false;

  }


  rolAdmin(): boolean {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.rol = this.usuario['rol'];
    return (this.rol === 'ADMIN') ? true : false;

  }
}
