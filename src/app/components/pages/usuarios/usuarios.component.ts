import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuario: UsuarioModel;
  usuarios: UsuarioModel[] = [];
  constructor(private _usuarioService : UsuarioService) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.cargarUsuarios();
  }

  agregarUsuario(forma: NgForm) {
    if (forma.invalid) {
      return 'Formulario no válido';
    }
    this.usuario.nombre = forma.value.nombre;
    this.usuario.password = forma.value.password;
    this.usuario.email = forma.value.correo;
    this.usuario.rol = forma.value.rol;

    
    this._usuarioService.crearUsuario(this.usuario).subscribe();
  }


  cargarUsuarios(){
    this._usuarioService.cargarUsuarios().subscribe(lista => this.usuarios = lista);
  }
}