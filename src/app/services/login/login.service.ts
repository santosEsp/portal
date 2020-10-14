import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { UsuarioModel } from '../../models/usuarios.model';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root',
})
export class LoginService {



  private url = URL_SERVICIOS + '/login/';

  userToken: string;
  nombre: string;
  email: string;


  constructor(private http: HttpClient) {


  }

  
  login(usuario: UsuarioModel) {

    return this.http.post(this.url, usuario).pipe(
      map((resp: any) => {
        this.guardarToken(resp['token']);
        console.log(resp.token);
        return resp;

      })
    );

    

    // return this.http.post(`${this.url}`, authData).pipe(
    //   map((resp) => {
    //     console.log('Entró en el mapa de rxjs');
    //     this.guardarToken(resp['idToken']);
    //     return resp;
    //   })
    // );



  }

  

  logout() {
    localStorage.removeItem('token');
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expiraEn', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expiraEn'));
    const horaExpira = new Date();
    horaExpira.setTime(expira);

    if (horaExpira > new Date()) {
      return true;
    } else {
      return false;
    }

  }
}
