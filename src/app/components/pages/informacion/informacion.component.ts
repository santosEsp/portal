import { Component, OnInit } from '@angular/core';
import { NotaModel } from '../../../models/nota.model';
import { NgForm } from '@angular/forms';
import { RegistrarCorreoModel } from '../../../models/registrarCorreo.model';
import { RegistrarLlamadaModel } from '../../../models/registrarLlamada.model';
import { RegistrarReunionModel } from '../../../models/registrarReunion.model';
import { NegocioModel } from '../../../models/negocio.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {
  nota: NotaModel;
  correo: RegistrarCorreoModel;
  llamada: RegistrarLlamadaModel;
  reunion: RegistrarReunionModel;
  negocio: NegocioModel;

  fecha: Date = new Date();
  constructor() {
    console.log(this.fecha);
  }

  ngOnInit() {
    this.nota = new NotaModel();
    this.correo = new RegistrarCorreoModel();
    this.llamada = new RegistrarLlamadaModel();
    this.reunion = new RegistrarReunionModel();
    this.negocio = new NegocioModel();
  }

  registrarNota(form: NgForm) {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarCorreo(form: NgForm) {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarLlamada(form: NgForm){
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarReunion(form: NgForm) {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarNegocio(form: NgForm) {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }
}
