import { Component, OnInit } from '@angular/core';
//import { PerfilComponent } from '../perfil/perfil.component';
import { PipelineModel } from '../../../models/Pipeline.model';
import { ContraseñaModel } from '../../../models/contraseña.model';
import { CorreoModel } from '../../../models/correo.model';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  pipeline: PipelineModel;
  contrasena: ContraseñaModel;
  correo: CorreoModel;

  constructor() { }

  ngOnInit(): void {
    this.pipeline = new PipelineModel();
    this.contrasena = new ContraseñaModel();
    this.correo = new CorreoModel();
    this.pipeline.nombre_etapa = 'Cierras Pagadas';
    this.contrasena.con_actual = 'Gilberto@1998';
    this.contrasena.con_nueva = 'Gilberto1998PL';
    this.correo.correo_actual = 'gilbertozte98@gmail.com';
    this.correo.correo_nuevo='peraltaleyvagilberto@gmail.com';
  }

  onSubmit (form:NgForm){
    if(form.invalid){
      console.log('Algo salio mal :(');
      console.log(form);
      return;
    }
    console.log("Etapa nueva Agregada");
    console.log(this.pipeline);
    console.log(form);
  }
  onCon(form:NgForm){
    if(form.invalid){
      console.log("Algo salio mal :(");
      return;
    }
    console.log('Nueva Contraseña Agregada');
    console.log(this.contrasena);
    console.log(form);
  }
  onCorreo( form:NgForm){
    if(form.invalid){
      console.log("Algo salio mal :(");
      return;
    }
    console.log("Correo nuevo Agregado");
    console.log(this.correo);
    console.log(form);
  }


}
