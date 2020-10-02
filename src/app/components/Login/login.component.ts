import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;

  constructor(private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.correo = 'usuario@cs.clicksoft.com.mx';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.router.navigateByUrl('/contactos');

    console.log('Formulario enviado');

    console.log(form);
  }
}
