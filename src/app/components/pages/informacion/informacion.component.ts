import { Component, OnInit } from '@angular/core';
import { NotaModel } from '../../../models/nota.model';
import { NgForm } from '@angular/forms';
import { RegistrarCorreoModel } from '../../../models/registrarCorreo.model';
import { RegistrarLlamadaModel } from '../../../models/registrarLlamada.model';
import { RegistrarReunionModel } from '../../../models/registrarReunion.model';
import { NegocioModel } from '../../../models/negocio.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ContactoModel } from '../../../models/contacto.model';
import { EmpresaModel } from '../../../models/empresa.model';


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

  unContacto = new ContactoModel();
  unaEmpresa = new EmpresaModel();

  ruta: { tipo: string, id: string };

  constructor(private rutaActiva: ActivatedRoute) {


    

    this.rutaActiva.params.subscribe(params => {

      // this.unContacto = this.consultaService.getContacto(params['id']);

      console.log("Se suscribió contacto");
      console.log(this.unContacto);


    });



    this.rutaActiva.params.subscribe(params => {

      // this.unaEmpresa = this.consultaService.getEmpresa(params['id']);

      console.log('Se suscribió empresa');
      console.log(this.unaEmpresa);


    });

    console.log(this.fecha);
  }

  ngOnInit() {

    this.nota = new NotaModel();
    this.correo = new RegistrarCorreoModel();
    this.llamada = new RegistrarLlamadaModel();
    this.reunion = new RegistrarReunionModel();
    this.negocio = new NegocioModel();

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

    console.log("verificando valores Array Ruta");
    console.log(this.ruta);
    console.log(this.ruta.tipo);
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

  registrarLlamada(form: NgForm) {
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
