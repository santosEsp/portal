import { Component, OnInit, ViewChild } from '@angular/core';
import { ContraseñaModel } from '../../../models/contraseña.model';
import { CorreoModel } from '../../../models/correo.model';
import { EtapasNegocio } from '../../../models/etapasNegocio';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../../models/usuarios.model';
import { EtapasNegociosService } from '../../../services/etapasNegocios/etapas-negocios.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { configCorreoModel } from '../../../models/configurarCorreo';
import { ConfigurarCorreoService } from '../../../services/configurarCorreo/configurar-correo.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {


  passencrip: string;
  rol: string;
  passActual = new ContraseñaModel();
  usuario: UsuarioModel;
  etapasNegocio = new EtapasNegocio();
  contrasena: ContraseñaModel;
  correo = new CorreoModel();
  miUsuario: String;
  miId: number;
  arrayEtapas: any[] = [];
  contrasenaActual: boolean;
  contrasenaIguales: boolean;
  maxln: boolean;
  maxln2: boolean;
  configCorreo = new configCorreoModel();
  emailConfigurado = false;
  numeroConfig = 1;

  @ViewChild('closeModal') closeModal;

  constructor(private router: Router, private _etapasService: EtapasNegociosService, private _usuario: UsuarioService, private _loginService: LoginService,
    private _configCorreoService: ConfigurarCorreoService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.miId = this.miUsuario['id_usuario'];
    this.rol = this.miUsuario['rol'];
    this.passencrip = this.miUsuario['password'];
  }

  ngOnInit(): void {
    this.cargarInfoEtapas();

    this.contrasena = new ContraseñaModel();
    this.verificaConfig();
  }
  cambiarCon(forma: NgForm): any {
    if (forma.invalid) {
      return 'Formulario no válido';
    }
    this.passActual = {
      con_nueva: forma.value.con_nuevav1
    };
    this.cambiarPassword(this.passActual);


  }

  cambiarPassword(password: ContraseñaModel): any {
    this._usuario.cambiarContraseña(password.con_nueva, this.miId).subscribe(
      (resp: any) => {
        Swal.fire({
          title: 'Se ha actualizado la contraseña',
          text: 'Puede iniciar sesión con su nueva contraseña',
          icon: 'success',
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false

        })
          .then((ok) => {
            if (ok.isConfirmed) {
              this.closeModal.nativeElement.click();
              this.salir();
            }
          });
      },
      (error: any) => {

      }
    );
  }


  salir(): any {
    this._loginService.logout();
    this.router.navigateByUrl('/login');
  }

  onSubmit(form: NgForm): any {
    if (form.invalid) {
      return;
    }
  }

  cl(termino: string, termino2: string) {
    if (termino === termino2 && termino2.length > 0) {
      this.contrasenaIguales = true;
    } else {
      this.contrasenaIguales = false;
    }
  }



  buscarContra(termino: string) {
    if (termino.length <= 0) {
      this.contrasenaActual = false;
      return;
    }

    if (termino === this.passencrip) {
    }
    // this.cargando = true;
    this._usuario.buscarcontra(termino, this.miId)
      .subscribe(
        (resp: any) => {
          this.contrasenaActual = true;
        },
        (err) => {
          this.contrasenaActual = false;
        }
      );
    // this.cargando = false;

  }
  onCon(form: NgForm): any {
    if (form.invalid) {
      return;
    }
  }
  onCorreo(form: NgForm) {
    if (form.invalid) {
      return;
    }
  }

  cargarInfoEtapas() {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.arrayEtapas = lista;
    });
  }

  editarEtapa(etapas: EtapasNegocio) {
    this.etapasNegocio = {
      id_etapa: etapas.id_etapa,
      nombre: etapas.nombre,
      probabilidad: etapas.probabilidad
    }
    this._etapasService.actualizarEtapa(this.etapasNegocio).subscribe(
      (resp: any) => {
        Swal.close();
        Swal.fire({
          title: 'Actualizado',
          text: 'Etapa actualizada correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {

            }
          });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          title: 'No actualizado',
          text: 'Error al actualizar etapa',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
      }
    );
  }

  verificaCambioConfig(numero: number){
    this.numeroConfig = numero;
  }

  configurarCorreo(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if(this.numeroConfig == 1){

      this.configCorreo = {
        email: form.value.email,
        host: form.value.servidor,
        password: form.value.password,
        fkusuario: this.miId
      }
      this._configCorreoService.guardarConfiguracion(this.configCorreo).subscribe(
        (resp: any) => {
          Swal.close();
          Swal.fire({
            title: 'Configuracion guardada',
            text: 'Se ha guadado la configuración',
            icon: 'success',
          }).then((ok) => {
            if (ok.isConfirmed) {
            }
          });
        },
        (error): any => {
          Swal.close();
          Swal.fire({
            title: 'Error: ' + error.error.mensaje,
            text: 'Verifique que todo esté correcto',
            icon: 'error',
          });
  
        }
      );
    }

    if(this.numeroConfig == 2){
      this.configCorreo = {
        email: form.value.email,
        host: form.value.servidor,
        password: form.value.password,
        fkusuario: this.miId
      }
      this._configCorreoService.actualizarConfiguracion(this.configCorreo).subscribe(
        (resp: any) => {
          Swal.close();
          Swal.fire({
            title: 'Configuracion actualizada',
            text: 'Se ha actualizado la configuración',
            icon: 'success',
          }).then((ok) => {
            if (ok.isConfirmed) {
            }
          });
        },
        (error): any => {
          Swal.close();
          Swal.fire({
            title: 'Error: ' + error.error.mensaje,
            text: 'Verifique que todo esté correcto',
            icon: 'error',
          });
  
        }
      );
    }

 
  }

  verificaConfig() {
    this._configCorreoService.verificaConfiguracion(this.miId).subscribe(
      configEmail => (this.configCorreo.host = configEmail.configuracion.host,
        this.configCorreo.email = configEmail.configuracion.email,
        this.configCorreo.password = configEmail.configuracion.password,
        this.emailConfigurado = configEmail.ok
      )
    );
  }

}

