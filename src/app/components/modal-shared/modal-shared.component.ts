import { Component, OnInit } from '@angular/core';
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



@Component({
  selector: 'app-modal-shared',
  templateUrl: './modal-shared.component.html'
})
export class ModalSharedComponent implements OnInit {

  notaContacto = new NotaModel();
  correoContacto = new RegistrarCorreoModel();
  llamadaContacto = new RegistrarLlamadaModel();
  reunionContacto = new RegistrarReunionModel();
  negocioContacto = new NegocioModel();
  miUsuario: string;
  miId: string;
  datos: any[] = [];


  nombrePropietario = new UsuarioModel();

  // variable para la fecha
  fecha: Date = new Date();
  idContacto: string;
  etapas: any[] = [];

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
    this._notasService.crearNota(this.notaContacto).subscribe(() => {
    });
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
    this._registrarReunion.registrarReunion(this.reunionContacto).subscribe(() => {
    });
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
    this._llamadaService.crearLlamada(this.llamadaContacto).subscribe(() => {
    });
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
    this._correosService.registrarCorreo(this.correoContacto).subscribe(() => {
    });
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
    this._negocioService.crearNegocio(this.negocioContacto).subscribe(() => {
    });
  }

  cargarEtapas(): any {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.etapas = lista;
    });
  };
}
