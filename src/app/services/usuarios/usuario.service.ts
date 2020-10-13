import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UsuarioModel } from '../../models/usuarios.model'
import { map } from 'rxjs/operators'
import { URL_SERVICIOS } from 'src/app/config/config'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  crearUsuario(usuario: UsuarioModel) {

    let url = URL_SERVICIOS + '/usuarios/';

    return this.http.post(url, usuario)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire(usuario.nombre, 'Usuario creado correctamente', 'success');
            return resp.usuario;
          }
        )
      )
  }

  cargarUsuarios() {
    let url = URL_SERVICIOS + '/usuarios/';
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            // console.log(resp.usuarios);
            return resp.usuarios;
          }
        )
      )
  }
}
