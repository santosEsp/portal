import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Rutas activas
import { ActivatedRoute, Params } from '@angular/router';


// modeelos para Empresas
import { NotasEmpresasModel } from 'src/app/models/notasEmpresas';
import { ReunionesEmpresasModel } from 'src/app/models/reunionesEmpresas';
import { LlamadasEmpresasModel } from '../../../models/llamadasEmpresas';
import { CorreosEmpresasModel } from 'src/app/models/correosEmpresas';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { EmpresaModel } from '../../../models/empresa.model';
import { ContactoModel } from '../../../models/contacto.model';
import { NegociosEmpresaModel } from '../../../models/negociosEmpresa';
// servicios para empresas
import { NotasEmpresasService } from '../../../services/notasEmpresas/notas-empresas.service';
import { ReunionesEmpresasService } from '../../../services/reunionesEmpresas/reuniones-empresas.service';
import { LlamadasEmpresasService } from '../../../services/llamadasEmpresas/llamadas-empresas.service';
import { CorreosEmpresasService } from '../../../services/correosEmpresas/correos-empresas.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import { ContactoService } from '../../../services/contactos/contacto.service';
import { NegociosEmpresasService } from '../../../services/negocioEmpresas/negocios-empresas.service';
import { EtapasNegociosService } from '../../../services/etapasNegocios/etapas-negocios.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-informacion-empresa',
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.css']
})
export class InformacionEmpresaComponent implements OnInit {


  // variables para cargar info de empresas
  unaEmpresa = new EmpresaModel();
  idEmpresa: string;
  nombrePropietarioEmpresa = new UsuarioModel();
  fkpropietarioEmpresa: number;
  listaContactosRelacionados: ContactoModel[] = [];
  notasEmpresa: NotasEmpresasModel[] = [];
  notaEmpresa = new NotasEmpresasModel();
  ReunionesEmpresa: ReunionesEmpresasModel[] = [];
  reunionEmpresa = new ReunionesEmpresasModel();
  llamadasEmpresa: LlamadasEmpresasModel[] = [];
  llamadaEmpresa = new LlamadasEmpresasModel();
  correosEmpresa: CorreosEmpresasModel[] = [];
  correoEmpresa = new CorreosEmpresasModel();
  negocioEmpresa = new NegociosEmpresaModel();
  editarNegocio = new NegociosEmpresaModel();
  negociosEmpresa: any[] = [];
  miUsuario: string;
  miId: string;

  fecha: Date = new Date();

  ruta: { tipo: string, id: string };
  etapas: any[] = [];
  constructor(private rutaActiva: ActivatedRoute, private _empresaService: EmpresaService,
    private _contactoService: ContactoService,
    private _notasEmpresasService: NotasEmpresasService, private _reunionesEmpresas: ReunionesEmpresasService,
    private _llamadasEmpresa: LlamadasEmpresasService, private _negociosEmpresas: NegociosEmpresasService,
    private _correosEmpresas: CorreosEmpresasService, private _usuarioService: UsuarioService,
    private _etapasService: EtapasNegociosService
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

        console.log('Tipo', this.ruta.tipo);
        console.log('Id', this.ruta.id);

      }
    );

    this.idEmpresa = this.ruta.id;



    this.infoEmpresa();
    this.cargarNotasEmpresas();
    this.cargarReunionesEmpresas();
    this.cargarLlamadasEmpresas();
    this.cargarCorreosEmpresas();
    this.cargarEtapas();
    this.cargarNegociosDeEmpresa();
  }

  infoEmpresa(): any {
    this._empresaService.cargarUnaEmpresa(parseInt(this.idEmpresa)).subscribe(empresa => {
      this.unaEmpresa = empresa;
      console.log('UnaEmpresa', this.unaEmpresa);
      this.fkpropietarioEmpresa = parseInt(this.unaEmpresa.propietario_registro);
      this.cargaNombrePropietarioEmpresa();
      this.cargarContactosRelacionados();
    });
  }

  cargarNotasEmpresas(): any {
    this._notasEmpresasService.cargarNotas(this.idEmpresa.toString()).subscribe(listaNotasEmpresas => {
      this.notasEmpresa = listaNotasEmpresas;
    });
  }

  cargarReunionesEmpresas(): any {
    this._reunionesEmpresas.cargarReuniones(this.idEmpresa.toString()).subscribe(listaReunionesEmpresas => {
      this.ReunionesEmpresa = listaReunionesEmpresas;
    });
  }

  cargarLlamadasEmpresas(): any {
    this._llamadasEmpresa.cargarLlamadas(this.idEmpresa.toString()).subscribe(listaLlamadasEmpresas => {
      this.llamadasEmpresa = listaLlamadasEmpresas;
    });
  }


  cargarCorreosEmpresas(): any {
    this._correosEmpresas.cargarCorreos((this.idEmpresa).toString()).subscribe(listaCorreosEmpresas => {
      this.correosEmpresa = listaCorreosEmpresas;
    });
  }

  cargaNombrePropietarioEmpresa(): any {
    this._usuarioService.cargarUnUsuario(this.fkpropietarioEmpresa).subscribe(nombrePropietario => {
      this.nombrePropietarioEmpresa = nombrePropietario;
    });
  }


  cargarContactosRelacionados(): any {
    this._contactoService.cargarContactosRelacionados(this.unaEmpresa.id_empresa).subscribe(listaContactosRelacionados => {
      this.listaContactosRelacionados = listaContactosRelacionados;
    });

  }

  // Métodos para los formularios modales

  registrarNota(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.notaEmpresa = {
      comentario: form.value.descripcion,
      fkusuario: this.miId,
      fkempresa: this.idEmpresa
    };
    this._notasEmpresasService.crearNota(this.notaEmpresa).subscribe(() => {
    });
  }

  registrarCorreo(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.correoEmpresa = {
      fkempresa: this.idEmpresa,
      fkusuario: this.miId,
      fecha: form.value.fechaCorreo,
      hora: form.value.horaCorreo,
      descripcion: form.value.descripcionCorreo,

    };

    console.log('Info correo Emp', this.correoEmpresa);
    this._correosEmpresas.registrarCorreo(this.correoEmpresa).subscribe(() => {
    });
  }

  registrarLlamada(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.llamadaEmpresa = {
      fkempresa: this.idEmpresa,
      resultado_llamada: form.value.resultadoLlamada,
      fecha: form.value.fechaLlamada,
      hora: form.value.horaLlamada,
      descripcion: form.value.descripcionLlamada,
      fkusuario: this.miId
    };

    console.log('Datos llamada', this.llamadaEmpresa);
    this._llamadasEmpresa.crearLlamada(this.llamadaEmpresa).subscribe(() => {
    });
  }

  registrarReunion(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.reunionEmpresa = {
      fkempresa: this.idEmpresa,
      fkusuario: this.miId,
      resultado: form.value.resultadoReunion,
      fecha: form.value.fechaReunion,
      hora: form.value.horaReunion,
      duracion: form.value.duracionReunion,
      descripcion: form.value.descripcionReunion
    };

    console.log('Reunion empresa', this.reunionEmpresa);

    this._reunionesEmpresas.registrarReunion(this.reunionEmpresa).subscribe(() => {
    });
  }
  

  registrarNegocio(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    
    this.negocioEmpresa = {
      nombre_negocio: form.value.nombreNegocio,
      pipeline: form.value.pipelineNegocio,
      cantidad: form.value.cantidadNegocio,
      fketapa: form.value.etapaNegocio,
      fcierre: form.value.cierreNegocio,
      fkempresa: parseInt(this.idEmpresa),
      fkusuario: parseInt(this.miId)
    };
    console.log('Negocio COMP',this.negocioEmpresa);
    this._negociosEmpresas.crearNegocio(this.negocioEmpresa).subscribe(() => {
    });
  }

  cargarNegociosDeEmpresa(): any {
    this._negociosEmpresas.cargarNegociosConEmpresa(this.idEmpresa).subscribe(listaNegocios => {
      this.negociosEmpresa = listaNegocios;
      console.log('Negocios empresa',this.negociosEmpresa);
    });
  }

  cargarEtapas(): any {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.etapas = lista;
      console.log('Etapas de negocios', this.etapas);
    });
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
          this._negociosEmpresas.eliminarNegocio(datos.id_negocio).subscribe(() => {
            Swal.fire(
              'Eliminado',
              'Negocio eliminado',
              'success'
            );
            this.cargarNegociosDeEmpresa();
          });
        }
      });
  }

  cargarInfoAlForm(datos: any) {
    console.log('Datos al form',datos);
    this.editarNegocio.id_negocio = datos.id_negocio;
    this.editarNegocio.nombre_negocio = datos.nombre_negocio;
    this.editarNegocio.pipeline = datos.pipeline;
    this.editarNegocio.cantidad = datos.cantidad;
    this.editarNegocio.fcierre = datos.fcierre;
    this.editarNegocio.fketapa = datos.id_etapa;
  }

  actualizarNegocio(form: NgForm) {
    console.log('Info recibido:', form);
    this.negocioEmpresa = {
      id_negocio: form.value.idNegocio,
      nombre_negocio: form.value.nombreNegocio,
      pipeline: form.value.pipelineNegocio,
      cantidad: form.value.cantidadNegocio,
      fketapa: form.value.etapaNegocio,
      fcierre: form.value.cierreNegocio,
      fkempresa: parseInt(this.idEmpresa),
      fkusuario: parseInt(this.miId)
    }

    console.log('EditarNegocio', this.negocioEmpresa);
    this._negociosEmpresas.actualizarNegocio(this.negocioEmpresa).subscribe();
  }
}