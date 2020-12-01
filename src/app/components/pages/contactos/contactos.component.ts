import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactoModel } from '../../../models/contacto.model';
import { ContactoService } from '../../../services/contactos/contacto.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import Swal from 'sweetalert2';
import { ExportarExcelService } from '../../../services/excelService/guardar-contactos.service';
import { GuardarLlamadasService } from '../../../services/excelService/guardar-llamadas.service';
import { LlamadasService } from '../../../services/llamadas/llamadas.service';
import { RegistrarReunionService } from '../../../services/registrarReunion/registrar-reunion.service';
import { GuardarReunionesService } from '../../../services/excelService/guardar-reuniones.service';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {

  contacto = new ContactoModel();
  propietario = new ContactoModel();
  contactos: ContactoModel[] = [];
  todosLosContactos: ContactoModel[] = [];
  todosMisContactos: ContactoModel[] = [];
  contadorContactos: number;
  contadorMisContactos: number;
  tipo: string;
  miUsuario: string;
  miId: number;
  listaEmpresas: any = [];
  llamadasRealizadas: any = [];
  listaMisContactos: ContactoModel[] = [];
  reunionesRealizadas: any = [];
<<<<<<< HEAD
=======
  proveedores;
  Contacto: any = [];
>>>>>>> 6e241ac2eecf97835ec1518c0fd3fad1d965448e

  desde: number;
  divi;
  limiteC;
  misContactosDesde: number;
  masPaginasMC: boolean;
  masPaginasC: boolean;
  salvaContadorMisContactos: number;
  salvaContadorContactos: number;
  salvaIdUsuario: any;
  editarContacto = new ContactoModel();

  constructor(private _ContactoService: ContactoService, private _EmpresaService: EmpresaService,
    private _excelService: ExportarExcelService, private _guardarLlamadasService: GuardarLlamadasService, private _llamadasService: LlamadasService,
    private _registrarReunionService: RegistrarReunionService, private _guardarReunionesService: GuardarReunionesService) {

    this.tipo = 'contacto';
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.propietario.propietario_registro = this.miUsuario['nombre'];
    this.miId = this.miUsuario['id_usuario'];

    this.desde = 0;
    this.misContactosDesde = 0;
  }

  ngOnInit(): any {
    this.contadorContactosBD();
    this.cargarContactos();
    this.cargarListaEmpresas();
    this.contadorMisContactosBD();
    this.cargarMisContactos();
    this.cargarLlamadasRealizadas();
    this.cargarReunionesRealizadas();
    this.cargarTodosLosContactos();
    this.cargarTodosMisContactos();
  }

  onSubmit(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario inválido';
    }
  }

  buscarContactos(termino: string) {
    if (termino.length <= 0) {
      this.cargarContactos();
      return;
    }    
    // this.cargando = true;
    this._ContactoService.buscarCantacto(termino)
      .subscribe(lista => {
         this.contactos = lista
        });
    // this.cargando = false;

  }
  buscarMisContactos(termino: string) {
    if (termino.length <= 0) {
      this.cargarMisContactos();
      return;
    }    
    // this.cargando = true;
    this._ContactoService.buscarMiCantacto(termino,this.miId)
      .subscribe(lista => { this.listaMisContactos = lista});
    // this.cargando = false;

  }

  contadorContactosBD() {
    this._ContactoService.contadorContactosBD().subscribe(contador => {
      this.contadorContactos = contador;
      this.guardarContadorContactos(this.contadorContactos);
    });
  }

  contadorMisContactosBD() {

    this._ContactoService.contadorMisContactosBD(this.miId).subscribe(contador => {
      this.contadorMisContactos = contador;
      this.guardarContadorMisContactos(this.contadorMisContactos);
    });
  }

  guardarContadorContactos(contador: number) {
    this.salvaContadorContactos = contador;
  }

  sumaContactosHasta(valor: number) {
    this.desde += valor;
    if (this.salvaContadorContactos - this.desde <= 10) {
      this.masPaginasC = false;
      this.cargarContactos();
    }
    else {
      this.masPaginasC = true;
      this.cargarContactos();
      this.masPaginasC = true;
    }
  }

  restaContactosHasta(valor: number) {
    this.desde -= valor;
    this.cargarContactos();
    this.masPaginasC = true;
  }

  guardarContadorMisContactos(contador: number) {
    this.salvaContadorMisContactos = contador;
  }

  sumaMisContactosHasta(valor: number) {

    this.misContactosDesde += valor;
    if (this.salvaContadorMisContactos - this.misContactosDesde <= 10) {
      this.masPaginasMC = false;
      this.cargarMisContactos();
    }
    else {
      this.masPaginasMC = true;
    }
  }
  restaMisContactosHasta(valor: number) {
    this.misContactosDesde -= valor;
    this.cargarMisContactos();
    this.masPaginasMC = true;
  }

  cargarContactos(): any {
    this._ContactoService.cargarContactos(this.desde).subscribe(lista => {
      this.contactos = lista;
    });
  }

  cargarTodosLosContactos(): any {
    this._ContactoService.cargarTodosLosContactos().subscribe(lista => {
      this.todosLosContactos = lista;
    });
  }

  cargarMisContactos(): any {

    this._ContactoService.cargarMisContactos(this.miId, this.misContactosDesde).subscribe(listaMisContactos => {
      this.listaMisContactos = listaMisContactos;
    });
  }


  cargarTodosMisContactos(): any {

    this._ContactoService.cargarTodosMisContactos(this.miId).subscribe(listaMisContactos => {
      this.todosMisContactos = listaMisContactos;
    });
  }
  cargarListaEmpresas(): any {
    this._EmpresaService.cargarListaEmpresas().subscribe(lista => this.listaEmpresas = lista);
  }

  agregarContacto(forma: NgForm): any {
    if (forma.invalid) {
      return 'Formulario no válido';
    }
    this.contacto = {
      email: forma.value.email,
      nombre: forma.value.nombre,
      apellido: forma.value.apellido,
      propietario_registro: this.contacto.propietario_registro = this.miUsuario['id_usuario'],
      departamento: forma.value.departamento,
      telefono: forma.value.telefono,
      fkempresa: forma.value.fkempresa
    };

    this._ContactoService.crearContacto(this.contacto).subscribe(() => {
      this.cargarContactos();
    });
  }

  vaciarFormulario(): any {
    this.contacto = {
      email: '',
      nombre: '',
      apellido: '',
      propietario_registro: '',
      departamento: '',
      telefono: '',
      fkempresa: 0
    };
  }


  eliminarContacto(contacto: ContactoModel): any {

    Swal.fire({
      title: '¿Está seguro de esos cambios?',
      text: 'Eliminará a: ' + contacto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#E5B53A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((borrar) => {
        if (borrar.isConfirmed) {

          this._ContactoService.eliminarContacto(contacto.id_contacto).subscribe(() => {
            Swal.fire(
              'Eliminado',
              'Usuario eliminado',
              'success'
            );
            this.cargarContactos();
          });

        }
      });
  }

  exportarContactos(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando los contactos (.xlsx)',
      showConfirmButton: false,
      timer: 3000
    });
    this._excelService.contactosExcel(this.todosLosContactos, 'Contactos');
  }

  exportarMisContactos(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando mis contactos (.xlsx)',
      showConfirmButton: false,
      timer: 3000
    });
    this._excelService.MisContactosExcel(this.todosMisContactos, 'MisContactos');
  }

  cargarLlamadasRealizadas() {
    this._llamadasService.reporteLlamadas().subscribe(lista => this.llamadasRealizadas = lista);
  }

  exportarLlamadasRealizadas() {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando las llamadas realizadas (.xlsx)',
      showConfirmButton: false,
      timer: 3000
    });
    this._guardarLlamadasService.llamadasExcel(this.llamadasRealizadas, 'LlamadasRealizadas');
  }

  cargarReunionesRealizadas() {
    this._registrarReunionService.reporteReuniones().subscribe(lista => this.reunionesRealizadas = lista);
  }

  exportarReunionesRealizadas() {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando las reuniones realizadas (Excel)',
      showConfirmButton: false,
      timer: 3000
    });
    this._guardarReunionesService.reunionesExcel(this.reunionesRealizadas, 'ReunionesRealizadas');
  }

  cargarInfoAlForm(datos: any) {
    this.editarContacto.id_contacto = datos.id_contacto;
    this.editarContacto.email = datos.email;
    this.editarContacto.nombre = datos.nombre;
    this.editarContacto.apellido = datos.apellido;
    this.editarContacto.propietario_registro = datos.propietario;
    this.editarContacto.departamento = datos.departamento;
    this.editarContacto.telefono = datos.telefono;
    this.editarContacto.fkempresa = datos.id_empresa;
    this.salvaIdUsuario = datos.id_usuario;
  }

  actualizarContacto(form: NgForm): any {
    this.editarContacto = {
      id_contacto: form.value.idContacto,
      email: form.value.email,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      propietario_registro: this.salvaIdUsuario,
      departamento: form.value.departamento,
      telefono: form.value.telefono,
      fkempresa: form.value.fkempresa
    };
    this._ContactoService.actualizarContacto(this.editarContacto).subscribe();
  }


  cargarInfoAlFormMC(datos: any) {
    this.editarContacto.id_contacto = datos.id_contacto;
    this.editarContacto.email = datos.email;
    this.editarContacto.nombre = datos.nombre;
    this.editarContacto.apellido = datos.apellido;
    this.editarContacto.propietario_registro = datos.propietario;
    this.editarContacto.departamento = datos.departamento;
    this.editarContacto.telefono = datos.telefono;
    this.editarContacto.fkempresa = datos.id_empresa;
    this.salvaIdUsuario = datos.id_usuario;
  }

  actualizarMiContacto(form: NgForm): any {
    this.contacto = {
      id_contacto: form.value.idContacto,
      email: form.value.email,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      propietario_registro: this.salvaIdUsuario,
      departamento: form.value.departamento,
      telefono: form.value.telefono,
      fkempresa: form.value.fkempresa
    }
    this._ContactoService.actualizarContacto(this.contacto).subscribe();
  }

}
