import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
// Importación de modelos
import { NotaModel } from '../../models/nota.model';
import { RegistrarCorreoModel } from '../../models/registrarCorreo.model';
import { RegistrarLlamadaModel } from '../../models/registrarLlamada.model';
import { RegistrarReunionModel } from '../../models/registrarReunion.model';
import { NegocioModel } from '../../models/negocio.model';
import { UsuarioModel } from 'src/app/models/usuarios.model';

// servicios
import { NotasService } from '../../services/notas/notas.service';
import { ContactoService } from '../../services/contactos/contacto.service';
import { RegistrarReunionService } from '../../services/registrarReunion/registrar-reunion.service';
import { LlamadasService } from '../../services/llamadas/llamadas.service';
import { RegistrarCorreoService } from '../../services/registrarCorreo/registrar-correo.service';
import { EtapasNegociosService } from '../../services/etapasNegocios/etapas-negocios.service';
import { NegociosContactosService } from '../../services/negociosContactos/negocios-contactos.service';

// importando clase sw informacion.component.ts
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-shared',
  templateUrl: './modal-shared.component.html'
})
export class ModalSharedComponent implements OnInit {

  @Output() accionEnviar = new EventEmitter<string>();

  notaContacto = new NotaModel();
  correoContacto = new RegistrarCorreoModel();
  llamadaContacto = new RegistrarLlamadaModel();
  reunionContacto = new RegistrarReunionModel();
  negocioContacto = new NegocioModel();
  miUsuario: string;
  miId: string;
  datos: any[] = [];
  miEmail: string;

  ultimaaccion: boolean;
  accion: string;

  pass = 'nHrG_SEA_2020';
  nombrePropietario = new UsuarioModel();
  emailDestinatario: string;

  // variable para la fecha
  fecha: Date = new Date();
  idContacto: string;
  etapas: any[] = [];
  accionU: string;

  // ViewChilds para cerrar los modales 


  @ViewChild('closeModalNota') closeModalNota;
  @ViewChild('closeModalCorreo') closeModalCorreo;
  @ViewChild('closeModalNegocio') closeModalNegocio;
  @ViewChild('closeModalReunion') closeModalReunion;
  @ViewChild('closeModalLlamada') closeModalLlamada;
  constructor(private rutaActiva: ActivatedRoute, private _notasService: NotasService, private _contactoService: ContactoService, private _registrarReunion: RegistrarReunionService,
    private _llamadaService: LlamadasService, private _correosService: RegistrarCorreoService, private _etapasService: EtapasNegociosService,
    private _negocioService: NegociosContactosService) {
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.miId = this.miUsuario['id_usuario'];
  }

  ngOnInit(): void {
    idContacto: this.rutaActiva.snapshot.params.id;

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idContacto = params.id;
      }
    );
    this.cargaNombreContacto();
    this.cargarEtapas();
  }

  registrarNota(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.notaContacto = {
      comentario: form.value.descripcion,
      fkusuario: this.miId,
      fkcontacto: this.idContacto
    };
    Swal.showLoading();
    this._notasService.crearNota(this.notaContacto).subscribe(
      (resp: any) => {
        Swal.fire({
          title: 'Nota registrada',
          text: 'Se ha registrado la nota correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              console.log('Clickeo OK');
              this.closeModalNota.nativeElement.click();
              form.resetForm();
            }
          });
      },
      (err: any) => {

        Swal.fire({
          title: 'No agregado',
          text: 'Error al registrar nota',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });

      }
    );
    this._notasService.crearNota(this.notaContacto).subscribe(
      lista => {
        this.accionU = lista;
        console.log('fecha de crear nota --->', this.accionU);
        this.accion = 'Se creó una nota' + " /" + this.accionU;
        this.accionEnviar.emit(this.accion);
        let sepa = this.accion.split("/", 3);
        console.log('sepa 1 ', sepa[0]);
        console.log('sepa 2 ', sepa[1]);
        console.log('sepa 3 ', sepa[2]);
        let id = sepa[1];
        let fechaAc = sepa[2];

        console.log('id ----> ', id);
        console.log('fecha ----> ', fechaAc);
        this.accionEnviar.emit(this.accion);

        this.actualidadAccion(id, fechaAc);

      });
  }

  actualidadAccion(id: string, fechaAc: string) {
    //let id = '138';
    //let fechaAc = '2020-12-12'; 
    this._contactoService.ultimaAccion(id, fechaAc).subscribe(
      (resp: any) => {
        console.log('Se actualizo la ultima actividad');
      }
    )
  }

  cargaNombreContacto() {
    this._contactoService.cargarUnContacto(this.idContacto).subscribe(nombreContacto => {
      this.nombrePropietario = nombreContacto;
    });
  }

  registrarReunion(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.reunionContacto = {
      fkcontacto: this.idContacto,
      resultado: form.value.resultadoReunion,
      fecha: form.value.fechaReunion,
      hora: form.value.horaReunion,
      duracion: form.value.duracionReunion,
      descripcion: form.value.descripcionReunion,
      fkusuario: this.miId
    };
    this._registrarReunion.registrarReunion(this.reunionContacto).subscribe(

      (resp: any) => {

        this.accionU = resp;
        console.log('fecha de crear nota --->', this.accionU);
        this.accion = 'Se registró una reunión' + " /" + this.accionU;
        this.accionEnviar.emit(this.accion);
        let sepa = this.accion.split("/", 3);
        console.log('sepa 1 ', sepa[0]);
        console.log('sepa 2 ', sepa[1]);
        console.log('sepa 3 ', sepa[2]);
        let id = sepa[2];
        let fechaAc = sepa[1];

        console.log('id ----> ', id);
        console.log('fecha ----> ', fechaAc);
        this.accionEnviar.emit(this.accion);

        this.actualidadAccion(id, fechaAc);

        Swal.fire({
          title: 'Reunion registrado',
          text: 'Se ha registrado la reunión correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              console.log('Clickeo OK');
              this.closeModalReunion.nativeElement.click();
              form.resetForm();
            }
          });
      },
      (err: any) => {

        Swal.fire({
          title: 'No registrado',
          text: 'Error al registrar correo',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });

      }
    );
    //   lista => {
    //     this.accionU=lista;
    //       console.log('fecha de crear nota --->',this.accionU);
    //       this.accion = 'Se registró una reunión' +" /"+ this.accionU;
    //       this.accionEnviar.emit(this.accion);
    //       var sepa=this.accion.split("/",3);
    //       console.log('sepa 1 ',sepa[0]);
    //       console.log('sepa 2 ',sepa[1]);
    //       console.log('sepa 3 ',sepa[2]);
    //       var id=sepa[2];
    //       var fechaAc=sepa[1];

    //       console.log('id ----> ',id);
    //       console.log('fecha ----> ',fechaAc);
    //       this.accionEnviar.emit(this.accion);

    //       this.actualidadAccion(id, fechaAc);

    // });
  }

  registrarLlamada(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.llamadaContacto = {
      fkcontacto: this.idContacto,
      resultado_llamada: form.value.resultadoLlamada,
      fecha: form.value.fechaLlamada,
      hora: form.value.horaLlamada,
      descripcion: form.value.descripcionLlamada,
      fkusuario: this.miId
    };
    this._llamadaService.crearLlamada(this.llamadaContacto).subscribe(

      (resp: any) => {

        this.accionU = resp;
        console.log('fecha de crear nota --->', this.accionU);
        this.accion = 'Se registró una llamada' + " /" + this.accionU;
        this.accionEnviar.emit(this.accion);
        let sepa = this.accion.split("/", 3);
        console.log('sepa 1 ', sepa[0]);
        console.log('sepa 2 ', sepa[1]);
        console.log('sepa 3 ', sepa[2]);
        let id = sepa[1];
        let fechaAc = sepa[2];

        console.log('id ----> ', id);
        console.log('fecha ----> ', fechaAc);
        this.accionEnviar.emit(this.accion);

        this.actualidadAccion(id, fechaAc);

        Swal.fire({
          title: 'Llamada registrada',
          text: 'Se ha registrado la llamada correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              console.log('Clickeo OK');
              this.closeModalLlamada.nativeElement.click();
              form.resetForm();
            }
          });
      },
      (err: any) => {

        Swal.fire({
          title: 'No registrado',
          text: 'Error al registrar correo',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });

      }
    );

    //   (lista) => {
    //     this.accionU=lista;
    //       console.log('fecha de crear nota --->',this.accionU);
    //       this.accion = 'Se registró una llamada' +" /"+ this.accionU;
    //       this.accionEnviar.emit(this.accion);
    //       var sepa=this.accion.split("/",3);
    //       console.log('sepa 1 ',sepa[0]);
    //       console.log('sepa 2 ',sepa[1]);
    //       console.log('sepa 3 ',sepa[2]);
    //       var id=sepa[1];
    //       var fechaAc=sepa[2];

    //       console.log('id ----> ',id);
    //       console.log('fecha ----> ',fechaAc);
    //       this.accionEnviar.emit(this.accion);

    //       this.actualidadAccion(id, fechaAc);
    // });

  }

  registrarCorreo(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.correoContacto = {
      fkcontacto: this.idContacto,
      fkusuario: this.miId,
      fecha: form.value.fechaCorreo,
      hora: form.value.horaCorreo,
      descripcion: form.value.descripcionCorreo,

    };
    this._correosService.registrarCorreo(this.correoContacto).subscribe(

      (resp: any) => {

        this.accionU = resp;
        console.log('fecha de crear nota --->', this.accionU);
        this.accion = 'Se registró una reunión' + " /" + this.accionU;
        this.accionEnviar.emit(this.accion);
        let sepa = this.accion.split("/", 3);
        console.log('sepa 1 ', sepa[0]);
        console.log('sepa 2 ', sepa[1]);
        console.log('sepa 3 ', sepa[2]);
        let id = sepa[1];
        let fechaAc = sepa[2];

        console.log('id ----> ', id);
        console.log('fecha ----> ', fechaAc);
        this.accionEnviar.emit(this.accion);

        this.actualidadAccion(id, fechaAc);

        Swal.fire({
          title: 'Correo registrado',
          text: 'Se ha registrado el correo correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              console.log('Clickeo OK');
              this.closeModalCorreo.nativeElement.click();
              form.resetForm();
            }
          });
      },
      (err: any) => {

        Swal.fire({
          title: 'No registrado',
          text: 'Error al registrar correo',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });

      }
    );
    //   lista => {
    //     this.accionU=lista;
    //       console.log('fecha de crear nota --->',this.accionU);
    //       this.accion = 'Se registró una reunión' +" /"+ this.accionU;
    //       this.accionEnviar.emit(this.accion);
    //       var sepa=this.accion.split("/",3);
    //       console.log('sepa 1 ',sepa[0]);
    //       console.log('sepa 2 ',sepa[1]);
    //       console.log('sepa 3 ',sepa[2]);
    //       var id=sepa[1];
    //       var fechaAc=sepa[2];

    //       console.log('id ----> ',id);
    //       console.log('fecha ----> ',fechaAc);
    //       this.accionEnviar.emit(this.accion);

    //       this.actualidadAccion(id, fechaAc);

    // });
  }

  registrarNegocio(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.negocioContacto = {
      nombre_negocio: form.value.nombreNegocio,
      pipeline: form.value.pipelineNegocio,
      cantidad: form.value.cantidadNegocio,
      fketapa: form.value.etapaNegocio,
      fcierre: form.value.cierreNegocio,
      fkcontacto: parseInt(this.idContacto),
      fkusuario: parseInt(this.miId)
    };
    this._negocioService.crearNegocio(this.negocioContacto).subscribe(

      (resp: any) => {

        this.accionU = resp;
        console.log('fecha de crear nota --->', this.accionU);
        this.accion = 'Se registró una reunión' + " /" + this.accionU;
        this.accionEnviar.emit(this.accion);
        let sepa = this.accion.split("/", 3);
        console.log('sepa 1 ', sepa[0]);
        console.log('sepa 2 ', sepa[1]);
        console.log('sepa 3 ', sepa[2]);
        let id = sepa[1];
        let fechaAc = sepa[2];

        console.log('id ----> ', id);
        console.log('fecha ----> ', fechaAc);
        this.accionEnviar.emit(this.accion);

        this.actualidadAccion(id, fechaAc);
        Swal.fire({
          title: 'Negocio registrado',
          text: 'Se ha registrado el negocio correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              console.log('Clickeo OK');
              this.closeModalNegocio.nativeElement.click();
              form.resetForm();
            }
          });
      },
      (err: any) => {

        Swal.fire({
          title: 'No registrado',
          text: 'Error al registrar correo',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });

      }
    );
    //   (lista) => {
    //     this.accionU = lista;
    //       console.log('fecha de crear nota --->',this.accionU);
    //       this.accion = 'Se registró una reunión' +" /"+ this.accionU;
    //       this.accionEnviar.emit(this.accion);
    //       var sepa=this.accion.split("/",3);
    //       console.log('sepa 1 ',sepa[0]);
    //       console.log('sepa 2 ',sepa[1]);
    //       console.log('sepa 3 ',sepa[2]);
    //       var id=sepa[1];
    //       var fechaAc=sepa[2];

    //       console.log('id ----> ',id);
    //       console.log('fecha ----> ',fechaAc);
    //       this.accionEnviar.emit(this.accion);

    //       this.actualidadAccion(id, fechaAc);
    // });
  }

  cargarEtapas(): any {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.etapas = lista;
    });
  }


}
