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
  contadorUsuarios = 0;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    this.cargarUsuarios();
  }

  agregarUsuario(forma: NgForm): any {
    if (forma.invalid) {
      return 'Formulario no válido';
    }

    this.usuario = {
      email: forma.value.correo,
      password: forma.value.password,
      nombre: forma.value.nombre,
      rol: forma.value.rol
    };


    this._usuarioService.crearUsuario(this.usuario).subscribe(
      (resp: any) => {
        Swal.fire(this.usuario.nombre, 'Usuario creado correctamente', 'success');

      },
      (error): any => {

        console.log(error);

        if (error.error.errors.name === 'SequelizeUniqueConstraintError') {
          Swal.fire({
            title: 'El correo debe ser único para cada usuario',
            text: 'Hubo un error, verifique',
            icon: 'error',
          });
        }

      }
    );
  }

  vaciarForm(): any {
    this.usuario = {
      email: '',
      password: '',
      nombre: '',
      rol: ''
    };
  }


  cargarUsuarios(): any {
    this._usuarioService.cargarUsuarios().subscribe(lista => {
      this.usuarios = lista;
      this.contadorUsuarios = this.usuarios.length;
      console.log('N usuarios', this.contadorUsuarios);
    });
  }

  eliminarUsuario(usuario: UsuarioModel): any {
    let usuarioLogeado: UsuarioModel;
    usuarioLogeado = JSON.parse(localStorage.getItem('usuario'));

    if (usuario.id_usuario === usuarioLogeado.id_usuario) {
      Swal.fire('No se puede eliminar',
        'No se puede eliminar a sí mismo', 'error');
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
            );
            this.cargarUsuarios();
          });

        }
      });
  }

  actualizarUsuario(usuario: UsuarioModel): any {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
