import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuarios.model';
import { RecuperarPasword } from '../../models/recuperarPassword.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginUser: UsuarioModel = new UsuarioModel();
  recuperarPassword: RecuperarPasword = new RecuperarPasword();

  recordarme: boolean = false;
  email: string;

  constructor(private router: Router,
    private _loginService: LoginService) { }

  ngOnInit() {
    // LocalStrogare del recordatorio del correo
    if (localStorage.getItem('email')) {
      this.loginUser.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._loginService.login(this.loginUser, this.recordarme).subscribe(
      (resp: any) => {
        Swal.close()
        this.router.navigateByUrl('/contactos');
      },
      (err) => {
        Swal.fire({
          title: 'Error al autenticar',
          text: 'Hubo un error',
          icon: 'error',
        });
      }
    );
  }

  recupera(form1: NgForm) {

    if (form1.invalid) {
      return;
    }
    // Swal.fire({
    //   allowOutsideClick: true,
    //   text: 'Se ha enviado un mensaje a su correo ',
    //   icon: 'info'
    // });

    // console.log(form1);


  }
}
