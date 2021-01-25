import { Component, OnInit, ViewChild } from '@angular/core';
import { NotaModel } from '../../../models/nota.model';
import { NgForm } from '@angular/forms';

// Rutas activas
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

// Importacion de modelos para contactos
import { ContactoModel } from '../../../models/contacto.model';
import { EmpresaModel } from '../../../models/empresa.model';
import { RegistrarCorreoModel } from '../../../models/registrarCorreo.model';
import { RegistrarLlamadaModel } from '../../../models/registrarLlamada.model';
import { RegistrarReunionModel } from '../../../models/registrarReunion.model';
import { NegocioModel } from '../../../models/negocio.model';
import { EnviarCorreoModel } from '../../../models/enviarCorreo.model';

// Importacion de servicios para contactos
import { ContactoService } from '../../../services/contactos/contacto.service';
import { NotasService } from '../../../services/notas/notas.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import { RegistrarCorreoService } from '../../../services/registrarCorreo/registrar-correo.service';
import { LlamadasService } from '../../../services/llamadas/llamadas.service';
import { RegistrarReunionService } from '../../../services/registrarReunion/registrar-reunion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import Swal from 'sweetalert2';
import { NegociosContactosService } from '../../../services/negociosContactos/negocios-contactos.service';
import { EtapasNegociosService } from '../../../services/etapasNegocios/etapas-negocios.service';
import { EnviarCorreoService } from '../../../services/enviarCorreo/enviar-correo.service';
import { ConfigurarCorreoService } from '../../../services/configurarCorreo/configurar-correo.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {

  // Variables, modelos y arrays para obtener info de contactos

  accionU: string;
  accion: string;
  accionF: string;
  correo = new RegistrarCorreoModel();
  llamada = new RegistrarLlamadaModel();
  reunion = new RegistrarReunionModel();
  negocio = new NegocioModel();
  editarNegocio = new NegocioModel();

  unContacto = new ContactoModel();
  correosR: RegistrarCorreoModel[] = [];
  notasR: NotaModel[] = [];
  llamadasR: RegistrarLlamadaModel[] = [];
  reunionesR: RegistrarReunionModel[] = [];
  negociosContacto: any[] = [];
  correosEnviados: any[] = [];
  nombreEmpresa = new EmpresaModel();
  fkempresaContacto: number;
  idContacto: string;
  nombrePropietario = new UsuarioModel();

  modeloCorreo = new EnviarCorreoModel();
  fkpropietarioContacto: number;
  miUsuario: string;
  miId: string;

  guardaMiEmail: string;
  ruta: { tipo: string, id: string };
  etapas: any[] = [];
  enviado: string;

  emailConfigurado: boolean;

  // viewchilds para cerrar modales

  @ViewChild('closeEditarNegocio') closeEditarNegocio;
  @ViewChild('closeModalEnviarCorreo') closeModalEnviarCorreo;
  @ViewChild('correostab') tabCorreos;
  constructor(private rutaActiva: ActivatedRoute, private _contactoService: ContactoService, private _empresaService: EmpresaService,
    private _registrarCorreoService: RegistrarCorreoService, private _notasService: NotasService,
    private _llamadasService: LlamadasService, private _registrarReunionService: RegistrarReunionService,
    private _usuarioService: UsuarioService, private router: Router,
    private _negociosContactoService: NegociosContactosService,
    private _etapasService: EtapasNegociosService, private _enviarCorreoService: EnviarCorreoService,
    private _configCorreoService: ConfigurarCorreoService
  ) {
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.miId = this.miUsuario['id_usuario'];
    this.rutaActiva.params.subscribe(params => {
    });


  }

  ngOnInit(): void {



    this.ruta = {
      tipo: this.rutaActiva.snapshot.params.tipo,
      id: this.rutaActiva.snapshot.params.id
    };

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.ruta.tipo = params.tipo;
        this.ruta.id = params.id;
      }
    );

    this.idContacto = this.ruta.id;
    if (this.ruta.tipo === 'contacto') {
      Swal.fire(
        'Cargando',
        'Obteniendo datos',
        'info'
      );
      Swal.showLoading();
      this.infoContacto();
      this.cargarCorreosRegistrados();
      this.cargarNotas();
      this.cargarLlamadas();
      this.cargarReuniones();
      this.cargarNegociosDeContacto();
      this.cargarEtapas();
      this.verificaConfig();
      this.cargarCorreosEnviados();
      Swal.close();
    }
    else {
      Swal.fire(
        'Algo salió mal',
        'No se cumplió la condición esperada',
        'info'
      );
    }
  }

  accionultima(acc: string) {
    var sepa = acc.split("/", 3);
    this.accion = sepa[0];
    this.accionF = sepa[1];
  }
  // Métodos para cargar info de contactos
  cargarCorreosRegistrados(): any {
    this._registrarCorreoService.cargarCorreos(this.idContacto).subscribe(listaCorreosR => {
      this.correosR = listaCorreosR;
    });
  }

  cargarNotas(): any {
    this._notasService.cargarNotas(this.idContacto).subscribe(listaNotas => {
      this.notasR = listaNotas;
    });
  }

  cargarLlamadas(): any {
    this._llamadasService.cargarLlamadas(this.idContacto).subscribe(listaLlamadas => {
      this.llamadasR = listaLlamadas;
    });
  }

  cargarReuniones(): any {
    this._registrarReunionService.cargarReuniones(this.idContacto).subscribe(listaReuniones => {
      this.reunionesR = listaReuniones;
    });
  }

  infoContacto(): any {
    this._contactoService.cargarUnContacto(this.idContacto).subscribe(contacto => {
      this.unContacto = contacto;
      this.fkempresaContacto = this.unContacto.fkempresa;
      this.fkpropietarioContacto = parseInt(this.unContacto.propietario_registro);
      this.cargaEmpresaDeContacto();
      this.cargaNombrePropietarioContacto();
      this.modeloCorreo.destinatario = this.unContacto.email;
      this.modeloCorreo.remitenteEmail = this.miUsuario['email'];
    });
  }

  cargarEmails(){
    this.modeloCorreo.destinatario = this.unContacto.email;
    this.modeloCorreo.remitenteEmail = this.miUsuario['email'];
  }

  cargaEmpresaDeContacto() {
    this._empresaService.cargarUnaEmpresa(this.fkempresaContacto).subscribe(nombreEmpresa => {
      this.nombreEmpresa = nombreEmpresa;
    });
  }


  cargaNombrePropietarioContacto() {
    this._usuarioService.cargarUnUsuario(this.fkpropietarioContacto).subscribe(nombreContacto => {
      this.nombrePropietario = nombreContacto;
    });
  }

  cargarNegociosDeContacto(): any {
    this._negociosContactoService.cargarNegociosConContacto(this.idContacto).subscribe(listaNegocios => {
      this.negociosContacto = listaNegocios;
    });
  }

  cargarInfoAlForm(datos: any) {
    this.editarNegocio.id_negocio = datos.id_negocio;
    this.editarNegocio.nombre_negocio = datos.nombre_negocio;
    this.editarNegocio.pipeline = datos.pipeline;
    this.editarNegocio.cantidad = datos.cantidad;
    this.editarNegocio.fcierre = datos.fcierre;
    this.editarNegocio.fketapa = datos.id_etapa;
  }

  actualidadAccion(id: string, fechaAc: string) {
    //var id = '138';
    //var fechaAc = '2020-12-12'; 
    this._contactoService.ultimaAccion(id, fechaAc).subscribe(
      (resp: any) => {
      }
    )
  }

  actualizarNegocio(form: NgForm) {
    this.negocio = {
      id_negocio: form.value.idNegocio,
      nombre_negocio: form.value.nombreNegocio,
      pipeline: form.value.pipelineNegocio,
      cantidad: form.value.cantidadNegocio,
      fketapa: form.value.etapaNegocio,
      fcierre: form.value.cierreNegocio,
      fkcontacto: parseInt(this.idContacto),
      fkusuario: parseInt(this.miId)
    }
    this._negociosContactoService.actualizarNegocio(this.negocio).subscribe(
      (resp: any) => {
        this.cargarNegociosDeContacto();
        Swal.fire({
          title: 'Actualizado',
          text: 'Negocio actualizado correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              this.closeEditarNegocio.nativeElement.click();
              form.resetForm();
            }
          });
      },
      (err: any) => {

        Swal.fire({
          title: 'No actualizado',
          text: 'Error al actualizar negocio',
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
  }

  eliminarNegocio(datos: any): any {
    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminar negocio: ' + datos.nombre_negocio,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {
          Swal.showLoading();
          this._negociosContactoService.eliminarNegocio(datos.id_negocio).subscribe(
            (resp) => {
            Swal.close();
            Swal.fire({
              title: 'Eliminado',
              text: 'Negocio eliminado correctamente',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#E5B53A',
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            })
            this.cargarNegociosDeContacto();
          },
          (err) => {
            Swal.fire(
              'Error',
              'Ocurrió un error',
              'error'
            );
          }
          );
        }
      });
  }

  cargarEtapas(): any {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.etapas = lista;
    });
  }

  // enviar correo


  sendMail(formu: NgForm) {

    if (formu.invalid) {
      return;
    }
    this.modeloCorreo = {
      remitenteEmail: formu.value.remitente,
      remitenteNombre: this.miUsuario['nombre'],
      destinatario: formu.value.destinatarioEmail,
      descripcionCorreo: formu.value.descripcion,
      asunto: formu.value.asunto,
      fkcontacto: this.idContacto,
      fkusuario: this.miId

    }

    Swal.fire({
      title: 'Enviando correo',
      text: 'Por favor espere, enviando correo',
      icon: 'info',
      showCancelButton: false,
      allowOutsideClick: false
    }),
      Swal.showLoading(),
      this._enviarCorreoService.enviarCorreo(this.modeloCorreo).subscribe(
        (resp: any) => {
          this.cargarCorreosEnviados();
          Swal.close();
          Swal.fire({
            title: 'Correo enviado',
            text: 'Se ha enviado el correo',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#E5B53A',
            confirmButtonText: 'Ok',
            allowOutsideClick: false
          }).then((ok) => {
            if (ok.isConfirmed) {
              this.closeModalEnviarCorreo.nativeElement.click();
              formu.resetForm();
            }
          });
          this.accion = 'Se envio un correo';
        },
        (error): any => {
          Swal.close();
          Swal.fire({
            title: 'Error: ' + error.error.mensaje,
            text: 'Verifique que todo esté correcto',
            icon: 'error',
          });
          // if (error.error.errors.name === 'SequelizeUniqueConstraintError') {
          //   Swal.fire({
          //     title: 'El correo debe ser único para cada usuario',
          //     text: 'Hubo un error, verifique',
          //     icon: 'error',
          //   });
          // }

        }


        // dato => {
        //   this.enviado = dato;

        //   if (!this.enviado) {
        //     Swal.close();
        //     Swal.fire({
        //       title: 'Correo no enviado',
        //       text: 'No se ha enviado el correo',
        //       icon: 'error',
        //     });
        //   }

        //   Swal.close();
        //   Swal.fire({
        //     title: 'Correo enviado',
        //     text: 'Se ha enviado el correo',
        //     icon: 'success',
        //   });
        // }

      );
  }


  verificaConfig() {
    this._configCorreoService.verificaConfiguracion(parseInt(this.miId)).subscribe(
      configEmail => (this.emailConfigurado = configEmail.ok
      )
    );
  }


  eliminarNota(datos: any): any {
    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminar nota',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {
          this._notasService.eliminarNota(datos.id_nota).subscribe(
            (resp) => {
              Swal.fire({
                title: 'Eliminado',
                text: 'Nota eliminada correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              })
              this.cargarNotas();
            },
            (err) => {
              Swal.fire(
                'Error',
                'Ocurrió un error',
                'error'
              );
            }

          );
        }
      });
  }


  eliminarCorreo(datos: any): any {
    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminar correo registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {
          this._registrarCorreoService.eliminarCorreo(datos.id_rcorreo).subscribe(
            (resp) => {
              Swal.fire({
                title: 'Eliminado',
                text: 'Correo eliminado correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              })
              this.cargarCorreosRegistrados();
            },
            (err) => {
              Swal.fire(
                'Error',
                'Ocurrió un error',
                'error'
              );
            }

          );
        }
      });
  }



  eliminarLlamada(datos: any): any {
    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminar llamada registrada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {

          this._llamadasService.eliminarLlamada(datos.id_llamada).subscribe(
            (resp) => {
              Swal.fire({
                title: 'Eliminada',
                text: 'Llamada eliminada correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              });
              this.cargarLlamadas();
            },
            (err) => {
              Swal.fire(
                'Error',
                'Ocurrió un error',
                'error'
              );
            }

          );

        }
      });
  }


  eliminarReunion(datos: any): any {
    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminar reunión registrada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {

          this._registrarReunionService.eliminarReunion(datos.id_regisreunion).subscribe(
            (resp) => {
              Swal.fire({
                title: 'Eliminado',
                text: 'Reunión eliminada correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              });
              this.cargarReuniones();
            },
            (err) => {
              Swal.fire(
                'Error',
                'Ocurrió un error',
                'error'
              );
            }

          );

        }
      });
  }

  correosRegistrados() {
    this.tabCorreos.nativeElement.click();
  }

  cargarCorreosEnviados() {

    console.log('idContacto', this.idContacto);
    this._enviarCorreoService.obtenerCorreos(this.idContacto).subscribe((resp) => { this.correosEnviados = resp; console.log('Correos enviados', this.correosEnviados); });

  }
}
