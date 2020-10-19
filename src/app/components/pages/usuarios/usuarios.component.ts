import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../../models/usuarios.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuario: UsuarioModel;
  usuarios: UsuarioModel[] = [];

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.cargarUsuarios();
  }

  agregarUsuario(forma: NgForm) {
    if (forma.invalid) {
      return 'Formulario no válido';
    }

    this.usuario = {
      email: forma.value.correo,
      password: forma.value.password,
      nombre: forma.value.nombre,
      rol: forma.value.rol
    };


    this._usuarioService.crearUsuario(this.usuario).subscribe();
  }


  cargarUsuarios() {
    this._usuarioService.cargarUsuarios().subscribe(lista => this.usuarios = lista);
  }

  eliminarUsuario(usuario: UsuarioModel) {
    let usuarioLogeado: UsuarioModel;
    usuarioLogeado = JSON.parse(localStorage.getItem('usuario'))

    if (usuario.id_usuario === usuarioLogeado.id_usuario) {
      Swal.fire('No se puede eliminar',
        'No se puede eliminar asi mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminará a: ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'

    })
      .then((borrar) => {
        if (borrar.isConfirmed) {

          this._usuarioService.eliminarUsuario(usuario.id_usuario).subscribe(() => {
            Swal.fire(
              'Eliminado',
              'Usuario eliminado',
              'success'
            )
            this.cargarUsuarios();
          })

        }
      })
  }

  actualizarUsuario(usuario: UsuarioModel) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}