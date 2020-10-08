import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { UsuarioModel } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private apikey = 'AIzaSyAm2QMxrRFc2CvwUPMreGHyYKtOYdFaXMI';

  userToken: string;
  // Para el sign in
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // Sing up que no usaré
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http.post(`${this.url}${this.apikey}`, authData).pipe(
      map((resp) => {
        console.log('Entró en el mapa de rxjs');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
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
