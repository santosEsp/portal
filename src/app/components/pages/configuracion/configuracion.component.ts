import { Component, OnInit  } from '@angular/core';
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

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  cerrarmodal:string;
  passencrip:string;
  rol:string;
  passActual = new ContraseñaModel();
  usuario: UsuarioModel;
  etapasNegocio = new EtapasNegocio();
  contrasena: ContraseñaModel;
  correo = new CorreoModel();
  miUsuario:String;
  miId:number;
  arrayEtapas: any[] = [];
  contrasenaActual :boolean;
  contrasenaIguales :boolean;
  maxln : boolean;
  maxln2 : boolean;
 


  constructor(private router: Router,private _etapasService: EtapasNegociosService, private _usuario: UsuarioService,private _loginService: LoginService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.miId = this.miUsuario['id_usuario'];
    this.rol=this.miUsuario['rol'];
    this.passencrip=this.miUsuario['password'];
   }

  ngOnInit(): void {
    this.cargarInfoEtapas();

    this.contrasena = new ContraseñaModel();
      console.log('password encriptado --->',this.passencrip);
    //this.contrasena.con_actual = 'Gilberto@1998';
    //this.contrasena.con_nueva = 'Gilberto1998PL';
    //this.correo.correo_actual = 'gilbertozte98@gmail.com';
    //this.correo.correo_nuevo = 'peraltaleyvagilberto@gmail.com';
  }
  cambiarCon(forma: NgForm): any {
    if (forma.invalid) {
      return 'Formulario no válido';
    }
    this.passActual = {
      con_nueva: forma.value.con_nuevav1
    }; 
    console.log('Password Actual',this.passActual);
    this.cambiarPassword(this.passActual);
    this.cerrarmodal='modal';

  }

 cambiarPassword(password: ContraseñaModel): any{
    this._usuario.cambiarContraseña(password.con_nueva,this.miId).subscribe(
      (resp: any) => {
        Swal.fire({
          title: 'Se ha actualizado la contraseña',
          text: 'Puede iniciar sesión con su nueva contraseña',
          icon: 'success',         
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok'

        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });
      }
    );
    

 }

  onSubmit(form: NgForm): any {
    if (form.invalid) {
      console.log('Algo salio mal :(');
      console.log(form);
      return;
    }
    console.log('Etapa nueva Agregada');
    console.log(form);
  }

   cl(termino: string,termino2: string) {
      if(termino == termino2 && termino2.length > 0){
          this.contrasenaIguales = true;
      }else {
        this.contrasenaIguales = false;
      }
  }

 

  buscarContra(termino: string) {
    if (termino.length <= 0) {
      this.contrasenaActual = false;
      return;
    }
    
    if(termino == this.passencrip){
        console.log('Si se pudo');
    }
    // this.cargando = true;
    this._usuario.buscarcontra(termino,this.miId)
      .subscribe(
        (resp: any) => {         
          //this.router.navigateByUrl('/negocios');
          //console.log('Contraseña validad');
          this.contrasenaActual = true;
        },
        (err) => {
          //console.log('Contraseña no validad');
          this.contrasenaActual = false;
        }
   );
    // this.cargando = false;

  }
  onCon(form: NgForm): any {
    if (form.invalid) {
      console.log('Algo salio mal :(');
      return;
    }
    console.log('Nueva Contraseña Agregada');
    console.log(this.contrasena);
    console.log(form);
  }
  onCorreo(form: NgForm) {
    if (form.invalid) {
      console.log('Algo salio mal :(');
      return;
    }
    console.log('Correo nuevo Agregado');
    console.log(this.correo);
    console.log(form);
  }


  cargarInfoEtapas() {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.arrayEtapas = lista;
      console.log('EtapasRecibidas:', this.arrayEtapas);
    });
  }

  editarEtapa(etapas: EtapasNegocio) {
    
    

    this.etapasNegocio = {
      id_etapa: etapas.id_etapa,
      nombre: etapas.nombre,
      probabilidad: etapas.probabilidad
     }
    console.log('Esto se enviará', this.etapasNegocio);
    this._etapasService.actualizarEtapa(this.etapasNegocio).subscribe();
  }
 

}

