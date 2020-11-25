import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../models/usuarios.model';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  crearUsuario(usuario: UsuarioModel): any {

    let url = URL_SERVICIOS + '/usuarios/';
    url += '?token=' + this.token;

    return this.http.post(url, usuario)
      .pipe(
        map(
          (resp: any) => {
            return resp.usuario;
          }
        )
      );
  }

  eliminarUsuario(id: string): any {
    // NOTA
    // AGREGAR LA VERIFIACION DEL TOKEN
    let url = URL_SERVICIOS + '/usuarios/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(
      map(
        (resp: any) => {
          Swal.fire('Usuario eliminado', 'Eliminado Correctamente', 'success');

          return true;
        }
      )
    );
  }

  actualizarUsuario(usuario: UsuarioModel): any {
    let url = URL_SERVICIOS + '/usuarios/' + usuario.id_usuario;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map(
        (resp: any) => {
          Swal.fire('Usuario actualizado', usuario.nombre, 'success');
          return resp.usuario;
        }
      )
    );
  }

  cargarUsuarios(desde: number): any {
    let url = URL_SERVICIOS + '/usuarios/paginacionUsuarios/' + desde;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.usuarios;
          }
        )
      );
  }


  cargarUnUsuario(id: number): any {
    let url = URL_SERVICIOS + '/usuarios/unusuario/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.unUsuario;
          }
        )
      );
  }

  contadorUsuariosBD(): any {
    let url = URL_SERVICIOS + '/usuarios/contadorUsuarios';
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
}
