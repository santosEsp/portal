import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioLoginModel } from 'src/app/models/usuariosLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario: UsuarioLoginModel;
  constructor() {}

  ngOnInit() {
    this.loginUsuario = new UsuarioLoginModel();
    this.loginUsuario.correo = 'usuario1@cs.clicksoft.mx';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log('Formulario enviado');
    console.log(this.loginUsuario);
    console.log(form);
  }
}
