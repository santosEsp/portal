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
  editarEmpresa = new EmpresaModel();
  propietario = new EmpresaModel();
  empresas: EmpresaModel[] = [];
  
  todasLasEmpresas: EmpresaModel[] = [];
  listaMisEmpresas: EmpresaModel[] = [];
  listaTodasMisEmpresas: EmpresaModel[] = [];
  contadorEmpresas = 0;
  contadorMisEmpresas = 0;
  tipo: string;
  miId: string;
  arregloEmpresas: EmpresaModel[] = [];
  miUsuario: string;
  empresasDesde: number;
  misEmpresasDesde: number;

  // Para obtener el id_del usuario
  usuarioActual: UsuarioModel;
  salvaContadorEmpresas: number;
  salvaContadorMisEmpresas: number;
  masPaginasE: boolean;
  masPaginasME: boolean;

  constructor(
    private _empresaService: EmpresaService, private _excelService: ExcelEmpresasService) {
    this.tipo = 'empresa';
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.propietario.propietario_registro = this.miUsuario['nombre'];
    this.miId = this.miUsuario['id_usuario'];
    this.empresasDesde = 0;
    this.misEmpresasDesde = 0;
  }

  ngOnInit(): void {
    this.cargarEmpresas();
    this.cargarMisEmpresas();
    this.contadorEmpresasBD();
    this.contadorMisEmpresasBD();
    this.cargarTodasLasEmpresas();
    this.cargarTodasMisEmpresas();

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
    this._empresaService.cargarEmpresas(this.empresasDesde).subscribe(lista => {
      this.empresas = lista;
    });
  }

  cargarTodasLasEmpresas(): any {
    this._empresaService.cargarTodasLasEmpresas().subscribe(lista => {
      this.todasLasEmpresas = lista;
    });
  }

  cargarMisEmpresas(): any {
    this._empresaService.cargarMisEmpresas(parseInt(this.miId), this.misEmpresasDesde).subscribe(listaMisEmpresas => {
      this.listaMisEmpresas = listaMisEmpresas;
    });

  }
  
  cargarTodasMisEmpresas(): any {
    this._empresaService.cargarTodasMisEmpresas(parseInt(this.miId)).subscribe(listaMisEmpresas => {
      this.listaTodasMisEmpresas = listaMisEmpresas;
    });
  }

  eliminarEmpresa(empresa: EmpresaModel): any {

    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminará a: ' + empresa.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
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

  exportarEmpresas(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando todas las empresas (.xlsx)',
      showConfirmButton: false,
      timer: 2000
    });
    this._excelService.empresasExcel(this.todasLasEmpresas, 'Empresas');
  }

  ExportarTodasMisEmpresas(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando mis empresas (.xlsx)',
      showConfirmButton: false,
      timer: 2000
    });
    this._excelService.MisEmpresasExcel(this.listaTodasMisEmpresas, 'MisEmpresas');
  }

  contadorEmpresasBD() {
    this._empresaService.contadorEmpresasBD().subscribe(contador => {
      this.contadorEmpresas = contador;
      this.guardarContadorEmpresas(this.contadorEmpresas);
    });
  }

  guardarContadorEmpresas(contador: number) {
    this.salvaContadorEmpresas = contador;
  }

  contadorMisEmpresasBD() {

    this._empresaService.contadorMisEmpresasBD(parseInt(this.miId)).subscribe(contador => {
      this.contadorMisEmpresas = contador;
      this.guardarContadorMisEmpresas(this.contadorMisEmpresas);

    });
  }

  guardarContadorMisEmpresas(contador: number) {
    this.salvaContadorMisEmpresas = contador;
  }

  sumaEmpresasHasta(valor: number) {
    this.empresasDesde += valor;
    if (this.salvaContadorEmpresas - this.empresasDesde <= 10) {
      this.masPaginasE = false;
      this.cargarEmpresas();
    }
    else {
      this.masPaginasE = true;
      this.cargarEmpresas();
      this.masPaginasE = true;
    }
  }

  restaEmpresasHasta(valor: number) {
    this.empresasDesde -= valor;
    this.cargarEmpresas();
    this.masPaginasE = true;
  }

  sumaMisEmpresasHasta(valor: number) {

    this.misEmpresasDesde += valor;
    if (this.salvaContadorMisEmpresas - this.misEmpresasDesde <= 10) {
      this.masPaginasME = false;
      this.cargarMisEmpresas();
    }
    else {
      this.masPaginasME = true;
    }
  }

  restaMisEmpresasHasta(valor: number) {
    this.misEmpresasDesde -= valor;
    this.cargarMisEmpresas();
    this.masPaginasME = true;
  }

  cargarInfoAlForm(datos: any) {
    this.editarEmpresa = {
      id_empresa: datos.id_empresa,
      nombre: datos.nombre,
      propietario_registro: datos.propietario,
      industria: datos.industria,
      no_telefono: datos.no_telefono,
      tipo_cliente: datos.tipo_cliente,
      ciudad: datos.ciudad,
      estado_region: datos.estado_region,
      codigo_postal: datos.codigo_postal,
      no_empleados: datos.no_empleados,
      ingresos_anuales: datos.ingresos_anuales,
      zona_horaria: datos.zona_horaria,
      descripcion: datos.descripcion,
      pagina_corporativa: datos.pagina_corporativa
    };
  }

  actualizarEmpresa(form: NgForm): any {

    if (form.invalid) {
      return;
    }
    this.editarEmpresa = {
      id_empresa: form.value.idEmpresa,
      nombre: form.value.nombre,
      propietario_registro: form.value.propietario,
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
    this._empresaService.actualizarEmpresa(this.editarEmpresa).subscribe();
  }
}
