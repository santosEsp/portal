import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { EmpresaService } from 'src/app/services/empresas/empresa.service';
import { EmpresaModel } from '../../../models/empresa.model';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresa: EmpresaModel;
  empresas : EmpresaModel[] = [];

  contadorEmpresas = 0;
  tipo: string;

  arregloEmpresas: EmpresaModel[] = [];

<<<<<<< HEAD
  constructor() {
    this.tipo = "empresa";
    
    this.contadorEmpresas = this.arregloEmpresas.length;
=======
  // Para obtener el id_del usuario
  usuarioActual : UsuarioModel;

  constructor(
              private _empresaService: EmpresaService) {
    this.tipo = "empresa";
>>>>>>> 7b22adafe108f08e14fa531c3f1fd9532d92248f
    
   }

  ngOnInit() {
    this.empresa = new EmpresaModel();
    this.cargarEmpresas();
  }
  agregarEmpresa(form: NgForm) {
    if (form.invalid) {
      return 'Formulario agregar empresa no válido';
    }
  
    this.usuarioActual = JSON.parse(localStorage.getItem('usuario'));  

    this.empresa = {
      nombre: form.value.nombre,
      propietario_registro : this.usuarioActual.id_usuario,
      industria: form.value.industria,
      no_telefono: form.value.telefono,
      tipo_cliente: form.value.tipo,
      ciudad: form.value.ciudad,
      estado_region: form.value.estado,
      codigo_postal: form.value.codigo,
      no_empleados: form.value.empleados,
      ingresos_anuales: form.value.ingresos,
      zona_horaria: form.value.zona,
      descripcion: form.value.descripcion,
      pagina_corporativa: form.value.pagina

    }
    this._empresaService.crearEmpresa(this.empresa).subscribe();
  }


  cargarEmpresas(){
    this._empresaService.cargarEmpresas().subscribe(lista => this.empresas = lista);
  }
}
