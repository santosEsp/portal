import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService} from '../../services/login/login.service';
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

  recordarme = false;

  constructor(private router: Router, private _loginService: LoginService) { }

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

    this._loginService.login(this.loginUser).subscribe(
      (resp: any) => {
        Swal.close();

        console.log('Se cerro el swal');
        if (this.recordarme) {
          localStorage.setItem('email', this.loginUser.email);
        }

        console.log('Ya viene el enrutado');

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

  recupera(form1: NgForm){


    if (form1.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: true,
      text: 'Se ha enviado un mensaje a su correo ',
      icon: 'info'
    });

    console.log(form1);


  }
}
