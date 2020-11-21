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
  contadorUsuarios: number;
  usuariosDesde: number;
  masPaginasU: boolean;
  salvaContadorUsuarios: number; 

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
    this._usuarioService.cargarUsuarios(this.usuariosDesde).subscribe(lista => {
      this.usuarios = lista;
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
      confirmButtonColor: 'red',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'

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
    console.log('Actualizar usuario', usuario);
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }


  contadorUsuariosBD() {
    this._usuarioService.contadorUsuariosBD().subscribe(contador => {
      this.contadorUsuarios = contador;
      console.log('ContadorUsuarios COMP: ' + this.contadorUsuarios);
      this.guardarContadorUsuarios(this.contadorUsuarios);

    });
  }

  guardarContadorUsuarios(contador: number) {
    this.salvaContadorUsuarios = contador;
    console.log('Contador U ', this.salvaContadorUsuarios);
  }
  



  sumaUsuariosHasta(valor: number) {
    this.usuariosDesde += valor;
    if (this.salvaContadorUsuarios - this.usuariosDesde <= 10) {
      this.masPaginasU = false;
      console.log('HAY MAS PAGINAS', this.masPaginasU);
      this.cargarUsuarios();
    }

    else {
      this.masPaginasU = true;
      console.log('HAY MAS PAGINAS', this.masPaginasU);
    }
  }

  restaUsuariosHasta(valor: number) {
    this.usuariosDesde -= valor;
    this.cargarUsuarios();
    console.log('Despues de resta MCD', this.usuariosDesde);
    this.masPaginasU = true;
  }


}
