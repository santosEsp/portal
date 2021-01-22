import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordModel } from '../../../models/resetPassword';
import Swal from 'sweetalert2';
import { ResetPasswordService } from '../../../services/resetPassword/reset-password.service';

@Component({
  selector: 'app-restablecerpsw',
  templateUrl: './restablecerpsw.component.html',
  styleUrls: ['./restablecerpsw.component.css']
})
export class RestablecerpswComponent implements OnInit {

  resetModel = new ResetPasswordModel();
  cadena1: string;
  cadena2: string;
  resetToken: string;

  listaFake: string;
  constructor(private router: Router, private routeActivated: ActivatedRoute, private _resetService: ResetPasswordService) {

    this.routeActivated.params.subscribe(params => {
      this.resetToken = params.token;
    });
  }


  ngOnInit(): void {

  }
  restablecer(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.cadena1 = form.value.password1;
    this.cadena2 = form.value.password2;
    if (this.cadena1 === this.cadena2) {
      this.resetModel = {
        password: form.value.password2,
        tokenReset: `Bearer ${this.resetToken}`
      };
      this._resetService.resetPassword(this.resetModel).subscribe(
        (resp: any) => {

          Swal.fire({
            title: 'Se ha restablecido la contraseña',
            text: 'Puede iniciar sesión con su nueva contraseña',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#E5B53A',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          })
            .then((ok) => {
              if (ok.isConfirmed) {
                this.router.navigateByUrl('/login');
              }
            });
        },
        (err) => {
          Swal.fire({
            title: 'Expiró la solicitud de restablecimiento',
            text: 'Vuelva a solicitar un cambio de contraseña',
            icon: 'error',
            allowOutsideClick: false
          }).then((ok) => {
            if (ok.isConfirmed) {
              this.router.navigateByUrl('/login');
            }
          });
        }
      );

    }
    else {
      window.alert('Las contraseñas no coinciden');
    }
  }

}
