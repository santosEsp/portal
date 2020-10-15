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
  token : any;
  constructor(private http: HttpClient)  {
    this.token = localStorage.getItem('token');
   }


  crearUsuario(usuario: UsuarioModel) {

    let url = URL_SERVICIOS + '/usuarios/';    
    url += '?token=' + this.token;
    
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

  eliminarUsuario(id: string){
    // NOTA
    // AGREGAR LA VERIFIACION DEL TOKEN
    let url = URL_SERVICIOS + '/usuarios/' + id;

    return this.http.delete(url).pipe(
      map(
        (resp : any) => {
          Swal.fire('Usuario eliminado', 'Eliminado Correctamente', 'success');
          return true;
        }
      )
    )
  }

  actualizarUsuario(usuario : UsuarioModel){
    
    let url = URL_SERVICIOS + '/usuarios/' + usuario.id_usuario;

    return this.http.put(url, usuario).pipe(
      map(
        (resp : any) => {
          Swal.fire('Usuario actualizado', usuario.nombre, 'success');
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
            return resp.usuarios;
          }
        )
      )
  }
}
