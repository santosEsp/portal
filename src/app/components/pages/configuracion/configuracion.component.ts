import { Component, OnInit } from '@angular/core';
import { ContraseñaModel } from '../../../models/contraseña.model';
import { CorreoModel } from '../../../models/correo.model';
import { EtapasNegocio } from '../../../models/etapasNegocio';
import { NgForm } from '@angular/forms';

import { EtapasNegociosService } from '../../../services/etapasNegocios/etapas-negocios.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  etapasNegocio = new EtapasNegocio();
  contrasena: ContraseñaModel;
  correo = new CorreoModel();

  arrayEtapas: any[] = [];

  constructor(private _etapasService: EtapasNegociosService) { }

  ngOnInit(): void {
    this.cargarInfoEtapas();

    this.contrasena = new ContraseñaModel();

    this.contrasena.con_actual = 'Gilberto@1998';
    this.contrasena.con_nueva = 'Gilberto1998PL';
    this.correo.correo_actual = 'gilbertozte98@gmail.com';
    this.correo.correo_nuevo = 'peraltaleyvagilberto@gmail.com';
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
