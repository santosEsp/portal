import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../../models/usuarios.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuario: UsuarioModel;
  constructor() {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  agregarUsuario(form: NgForm) {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }
}
