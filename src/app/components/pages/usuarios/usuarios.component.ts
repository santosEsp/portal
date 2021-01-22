import { Component, OnInit, ViewChild } from '@angular/core';
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
  contadorUsuarios: number;
  usuariosDesde: number;
  masPaginasU: boolean;
  salvaContadorUsuarios: number;

  @ViewChild('closeModal') closeModal;

  constructor(private _usuarioService: UsuarioService) {

    this.usuariosDesde = 0;
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    this.cargarUsuarios();
    this.contadorUsuariosBD();
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
    Swal.showLoading();
    this._usuarioService.crearUsuario(this.usuario).subscribe(
      (resp: any) => {
        Swal.close();
        Swal.fire({
          title: 'Usuario creado',
          text: 'Usuario creado correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              this.cargarUsuarios();
              this.contadorUsuariosBD();
              this.closeModal.nativeElement.click();
            }
          });
      },
      (error): any => {
        Swal.close();
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
    this._usuarioService.cargarUsuarios(this.usuariosDesde).subscribe(lista => {
      this.usuarios = lista;
    });
  }

  eliminarUsuario(usuario: UsuarioModel): any {
    let usuarioLogeado: UsuarioModel;
    usuarioLogeado = JSON.parse(localStorage.getItem('usuario'));

    if (usuario.id_usuario === usuarioLogeado.id_usuario) {
      Swal.fire('No se puede eliminar', 'No se puede eliminar a sí mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminará a: ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {
          Swal.close();
          Swal.showLoading();
          this._usuarioService.eliminarUsuario(usuario.id_usuario).subscribe(
            (resp: any) => {
              Swal.close();
              Swal.fire({
                title: 'Usuario Eliminado',
                text: 'Usuario eliminado correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              })
                .then((ok) => {
                  if (ok.isConfirmed) {
                    this.cargarUsuarios();
                    this.contadorUsuariosBD();
                  }
                });
            },
            (error): any => {
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'Error al eliminar',
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              })
            }
          );
        }
      });
  }

  actualizarUsuario(usuario: UsuarioModel): any {
    if (usuario.nombre.trim() == "" || usuario.email.trim() == "") {
      Swal.fire({
        title: 'Existen campos vacios',
        text: 'Verifique los datos ingresados',
        icon: 'error',
      });
      return;
    }

    Swal.showLoading();
    this._usuarioService.actualizarUsuario(usuario).subscribe(
      (resp: any) => {
        Swal.close();
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'Usuario actualizado correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });
      },
      (error): any => {
        Swal.close();

        Swal.fire({
          title: 'No actualizado',
          text: 'Error al actualizar usuario, verifique los datos',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        });

      }
    );
  }

  contadorUsuariosBD() {
    this._usuarioService.contadorUsuariosBD().subscribe(contador => {
      this.contadorUsuarios = contador;
      this.guardarContadorUsuarios(this.contadorUsuarios);
    });
  }

  guardarContadorUsuarios(contador: number) {
    this.salvaContadorUsuarios = contador;
  }

  sumaUsuariosHasta(valor: number) {
    this.usuariosDesde += valor;
    if (this.salvaContadorUsuarios - this.usuariosDesde <= 10) {
      this.masPaginasU = false;
      this.cargarUsuarios();
    }
    else {
      this.masPaginasU = true;
    }
  }

  restaUsuariosHasta(valor: number) {
    this.usuariosDesde -= valor;
    this.cargarUsuarios();
    this.masPaginasU = true;
  }
}
