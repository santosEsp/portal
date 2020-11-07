import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { EmpresaService } from 'src/app/services/empresas/empresa.service';
import { EmpresaModel } from '../../../models/empresa.model';
import Swal from 'sweetalert2';
import { ExcelEmpresasService } from '../../../services/excelService/guardar-empresas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empresa = new EmpresaModel();
  propietario = new EmpresaModel();
  empresas: EmpresaModel[] = [];
  listaMisEmpresas: EmpresaModel[] = [];
  contadorEmpresas = 0;
  tipo: string;
  miId: string;
  arregloEmpresas: EmpresaModel[] = [];

  miUsuario: string;

  // Para obtener el id_del usuario
  usuarioActual: UsuarioModel;

  constructor(
    private _empresaService: EmpresaService, private _excelService: ExcelEmpresasService) {
    this.tipo = 'empresa';
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.propietario.propietario_registro = this.miUsuario['nombre'];
    this.miId = this.miUsuario['id_usuario'];
  }

  ngOnInit(): void {

    this.cargarEmpresas();
    this.cargarMisEmpresas();

  }
  agregarEmpresa(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario agregar empresa no válido';
    }

    this.usuarioActual = JSON.parse(localStorage.getItem('usuario'));

    this.empresa = {
      nombre: form.value.nombre,
      propietario_registro: this.usuarioActual.id_usuario,
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

    };
    this._empresaService.crearEmpresa(this.empresa).subscribe();
    this.cargarEmpresas();
  }

  vaciarFormulario(): any {
    this.empresa = {
      nombre: '',
      propietario_registro: '',
      industria: '',
      no_telefono: '',
      tipo_cliente: '',
      ciudad: '',
      estado_region: '',
      codigo_postal: '',
      no_empleados: '',
      ingresos_anuales: '',
      zona_horaria: '',
      descripcion: '',
      pagina_corporativa: ''
    };
  }


  cargarEmpresas(): any {
    this._empresaService.cargarEmpresas().subscribe(lista => {
      this.empresas = lista;
      this.contadorEmpresas = this.empresas.length;
      console.log('n empresas:', this.contadorEmpresas);
    });
  }


  cargarMisEmpresas(): any {
    this._empresaService.cargarMisEmpresas(this.miId).subscribe(listaMisEmpresas => {
      this.listaMisEmpresas = listaMisEmpresas;
      console.log('Lista mis empresas component', listaMisEmpresas);
    });

  }


  eliminarEmpresa(empresa: EmpresaModel): any {

    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminará a: ' + empresa.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'

    })
      .then((borrar) => {
        if (borrar.isConfirmed) {

          this._empresaService.eliminarEmpresa(empresa.id_empresa).subscribe(() => {
            Swal.fire(
              'Eliminado',
              'Empresa eliminada',
              'success'
            );
            this.cargarEmpresas();
          });

        }
      });
  }



  actualizarEmpresa(empresa: EmpresaModel): any {
    this._empresaService.actualizarEmpresa(empresa).subscribe();
    console.log('Actualiza E', empresa);
  }


  guardarEmpresas(): void {

    Swal.fire({
      icon: 'success',
      title: 'Se están exportando todas las empresas (.xlsx)',
      showConfirmButton: false,
      timer: 2000
    });
    this._excelService.empresasExcel(this.empresas, 'Empresas');

  }

  guardarMisEmpresas(): void {

    Swal.fire({
      icon: 'success',
      title: 'Se están exportando mis empresas (.xlsx)',
      showConfirmButton: false,
      timer: 2000
    });
    this._excelService.MisEmpresasExcel(this.listaMisEmpresas, 'MisEmpresas');
  }


}
