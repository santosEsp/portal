import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuarios.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.loginUser.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor ... ',
      icon: 'info',
    });
    Swal.showLoading();

    this.auth.login(this.loginUser).subscribe(
      (resp) => {
        Swal.close();

        console.log('Se cerro el swal');
        if (this.recordarme) {
          localStorage.setItem('email', this.loginUser.email);
        }

        console.log('Ya viene el enrutado');

        this.router.navigateByUrl('/contactos');
        console.log(resp);
      },
      (err) => {
        console.log(err.error.error.message);

        Swal.fire({
          title: 'Error al autenticar',
          text: err.error.error.message,
          icon: 'error',
        });
      }
    );
  }
}
