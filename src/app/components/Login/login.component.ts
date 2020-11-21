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

  recordarme = false;
  email: string;
  alturaPantalla = window.screen.height;
  anchuraPantalla = window.screen.width;
  alturaDiv = 0;
  alturapx: any;
  anchuraForm: any;
  alturaForm: any;

  constructor(private router: Router,
    private _loginService: LoginService) {

      console.log('altura de la pantalla px: ', this.alturaPantalla);
  
      
  
      this.alturaDiv = Math.round((this.alturaPantalla * 81) / 100 );
      console.log('medida que puede usar la altura tabla', this.alturaDiv);
  
      this.alturapx = this.alturaDiv + 'px';
      console.log('Junto: ', this.alturapx);

      this.anchuraForm = ((this.anchuraPantalla * 34) / 100) + 'px';
      console.log('anchura form',this.anchuraForm);
  
      this.alturaForm = ((this.alturaPantalla * 40) / 100) + 'px';
      console.log('altura form',this.alturaForm);

     }

  ngOnInit(): void {
    // LocalStrogare del recordatorio del correo
    if (localStorage.getItem('email')) {
      this.loginUser.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm): any {

    console.log('form', form);
    if (form.invalid) {
      return;
    }
    Swal.fire(
      'Iniciando sesión',
      'Espere',
      'info'
    );
    Swal.showLoading();

    this._loginService.login(this.loginUser, this.recordarme).subscribe(
      (resp: any) => {
        Swal.close();
        this.router.navigateByUrl('/negocios');
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

  recupera(form1: NgForm): any {

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
