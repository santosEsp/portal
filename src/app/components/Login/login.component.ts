import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuarios.model';
import { RecuperarPaswordModel } from '../../models/recuperarPassword.model';
import { RecuperaPasswordService } from '../../services/recuperaPassword/recupera-password.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginUser: UsuarioModel = new UsuarioModel();
  recuperaPasswordModel: RecuperarPaswordModel = new RecuperarPaswordModel();
  @ViewChild('closebutton') closebutton;


  recordarme = false;
  email: string;

  constructor(private router: Router,
    private _loginService: LoginService, private _recuperaPassService: RecuperaPasswordService) {

  }

  ngOnInit(): void {
    // LocalStrogare del recordatorio del correo
    if (localStorage.getItem('email')) {
      this.loginUser.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm): any {

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
    this.recuperaPasswordModel = {
      email: form1.value.recuperaPassword
    }

    this._recuperaPassService.recuperarPass(this.recuperaPasswordModel).subscribe(
      (resp: any) => {

        Swal.fire({
          title: 'Correo enviado',
          text: 'Revise su correo y siga las instrucciones',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              this.closebutton.nativeElement.click();
              form1.resetForm();
            }
          });
      },
      (err) => {
        Swal.fire({
          title: 'Correo no registrado',
          text: 'Verifique que ha introducido correctamente su correo registrado previamente',
          icon: 'error',
          allowOutsideClick: false
        });
      }
    );

  }

}
