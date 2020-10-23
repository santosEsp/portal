import { Component, OnInit } from '@angular/core';
import { NegocioModel } from '../../../models/negocio.model';
import {NgForm} from '@angular/forms';
import { EmpresaModel } from '../../../models/empresa.model';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegocioComponent implements OnInit {
   negocio:NegocioModel;
  constructor() { }

  ngOnInit(): void {
    this.negocio = new NegocioModel();
    this.negocio.nombre = "Sistema CRM ClickSoft";
    this.negocio.pipeline = "Sales de Pipeline";
    this.negocio.cantidad = 1;
    
    this.negocio.etapa = "Primera llamada";

  }

  onSubmit(form:NgForm){
  
   if(form.invalid){
      console.log("Algo salio mal :(");
      console.log(form);
      return;
      }
      console.log("Negocio agregado ..:)");
      console.log(form);
    }
}
