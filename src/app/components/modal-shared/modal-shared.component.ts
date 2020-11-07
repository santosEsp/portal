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

//servicios
import { NotasService } from '../../services/notas/notas.service';
import { ContactoService } from '../../services/contactos/contacto.service';
import { RegistrarReunionService } from '../../services/registrarReunion/registrar-reunion.service';
import { LlamadasService } from '../../services/llamadas/llamadas.service';
import { RegistrarCorreoService } from '../../services/registrarCorreo/registrar-correo.service';

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

  nombrePropietario = new UsuarioModel();

  // variable para la fecha
  fecha: Date = new Date();
  idContacto: string;

  constructor(private rutaActiva: ActivatedRoute, private _notasService: NotasService, private _contactoService: ContactoService, private _registrarReunion: RegistrarReunionService,
    private _llamadaService: LlamadasService, private _correosService: RegistrarCorreoService) {
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

  }

  registrarNota(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    console.log('Id de contacto para nota', this.idContacto);
    console.log('Id usuario', this.miId);
    this.notaContacto = {
      comentario: form.value.descripcion,
      fkusuario: this.miId,
      fkcontacto: this.idContacto
    }
    console.log('esto mandare al server: ', form);

    this._notasService.crearNota(this.notaContacto).subscribe(() => {

    });
  }

  cargaNombreContacto() {
    console.log('CargarNombrePropietario valor:', this.idContacto);
    this._contactoService.cargarUnContacto(this.idContacto).subscribe(nombreContacto => {
      this.nombrePropietario = nombreContacto;
      console.log('Nombre propietario comp: ', this.nombrePropietario);
    });
  }

  registrarReunion(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log('reunion antes de asignarle valores', this.reunionContacto);

    this.reunionContacto = {
      fkcontacto: this.idContacto,
      resultado: form.value.resultadoReunion,
      fecha: form.value.fechaReunion,
      hora: form.value.horaReunion,
      duracion: form.value.duracionReunion,
      descripcion: form.value.descripcionReunion,
      fkusuario: this.miId
    };
    console.log('Esto mandaré al server:', this.reunionContacto);

    this._registrarReunion.registrarReunion(this.reunionContacto).subscribe(() => {

    });
  }



  registrarLlamada(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    console.log('Datos en el formulario: ');
    console.log(form);


    this.llamadaContacto = {
      fkcontacto: this.idContacto,
      resultado_llamada: form.value.resultadoLlamada,
      fecha: form.value.fechaLlamada,
      hora: form.value.horaLlamada,
      descripcion: form.value.descripcionLlamada,
      fkusuario: this.miId
    };
    console.log('Esto mandaré al server:', this.llamadaContacto);

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
    console.log('Esto mandaré al server:', this.correoContacto);

    this._correosService.registrarCorreo(this.correoContacto).subscribe(() => {
    });
  }


  registrarNegocio(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

}
