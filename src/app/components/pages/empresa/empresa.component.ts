import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpresaModel } from '../../../models/empresa.model';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresa: EmpresaModel;
  contadorEmpresas = 0;
  tipo: string;

  arregloEmpresas: EmpresaModel[] = [];

  constructor() {
    this.tipo = "empresa";
    
    this.contadorEmpresas = this.arregloEmpresas.length;
    
   }

  ngOnInit() {
    this.empresa = new EmpresaModel();
  }
  agregarEmpresa(form: NgForm) {
    if (form.invalid) {
      return 'Formulario agregar empresa no válido';
    }

    
  }
}
