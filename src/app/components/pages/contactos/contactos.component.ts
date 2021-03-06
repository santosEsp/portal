import { Component, OnInit, ViewChild } from '@angular/core';
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
import { GuardarCorreosService } from '../../../services/excelService/guardar-correos.service'
import { EnviarCorreoService } from '../../../services/enviarCorreo/enviar-correo.service'


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})


export class ContactosComponent implements OnInit {

  @ViewChild('closeModalContacto') closeModalContacto;
  @ViewChild('closeModalEditarContacto') closeModalEditarContacto;

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
  correosEnviados: any = [];
  proveedores;
  Contacto: any = [];


  propietarionombre: string;


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
  numeroBoton = 1;

  constructor(private _ContactoService: ContactoService, private _EmpresaService: EmpresaService,
    private _excelService: ExportarExcelService, private _guardarLlamadasService: GuardarLlamadasService, private _llamadasService: LlamadasService,
    private _registrarReunionService: RegistrarReunionService, private _guardarReunionesService: GuardarReunionesService,
    private _guardarCorreosEnviadosService: GuardarCorreosService, private _correosService: EnviarCorreoService) {

    this.tipo = 'contacto';
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.propietario.propietario_registro = this.miUsuario['nombre'];
    this.propietarionombre = this.miUsuario['nombre'];
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
    this.cargarCorreosEnviados();
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
    this._ContactoService.buscarMiCantacto(termino, this.miId)
      .subscribe(lista => { this.listaMisContactos = lista });
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

  numeroBotonSeleccionado(numero: number) {
    this.numeroBoton = numero;
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

    Swal.showLoading();

    this._ContactoService.crearContacto(this.contacto).subscribe(
      (resp: any) => {
        this.cargarContactos();
        this.cargarMisContactos();
        this.cargarTodosLosContactos();
        this.cargarTodosMisContactos();
        this.contadorContactosBD();
        this.contadorMisContactosBD();

        Swal.close();
        Swal.fire({
          title: 'Contacto registrado',
          text: 'Contacto registrado correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {

              if (this.numeroBoton == 1) {
                this.closeModalContacto.nativeElement.click();
                forma.resetForm();
                this.propietarionombre = this.miUsuario['nombre'];
              }

              if (this.numeroBoton == 2) {
                forma.resetForm();
                this.propietarionombre = this.miUsuario['nombre'];
              }
            }
          });
      },
      (error): any => {
        Swal.close();
        if (error.error.errors.name === 'SequelizeUniqueConstraintError') {
          Swal.fire({
            title: 'El correo debe ser único para cada contacto',
            text: 'Hubo un error, verifique',
            icon: 'error',
          });
        }
      }
    );
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

          this._ContactoService.eliminarContacto(contacto.id_contacto).subscribe(
            (resp: any) => {
              Swal.fire({
                title: 'Empresa eliminada',
                text: 'Empresa eliminada correctamente',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#E5B53A',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              });
              this.cargarContactos();
              this.cargarMisContactos();
              this.cargarTodosLosContactos();
              this.cargarTodosMisContactos();
              this.contadorContactosBD();
              this.contadorMisContactosBD();
            }, (error): any => {
              if (error.error.error.name === 'SequelizeForeignKeyConstraintError') {
                Swal.fire({
                  title: 'No puede eliminar a este contacto',
                  text: 'Ya que tiene varios eventos asignados',
                  icon: 'error',
                });
              }
            }
          );

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


  cargarCorreosEnviados() {
    this._correosService.reporteUltimosCorreosEnviados().subscribe(lista => {
      this.correosEnviados = lista
    });
  }
  exportarCorreosEnviados() {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando los correos enviados (Excel)',
      showConfirmButton: false,
      timer: 3000
    });
    this._guardarCorreosEnviadosService.correosExcel(this.correosEnviados, 'CorreosEnviados');
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
    this.propietarionombre = datos.propietario;
  }

  actualizarContacto(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }
    this.editarContacto = {
      id_contacto: form.value.idContacto,
      email: form.value.email,
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      propietario_registro: this.propietarionombre,
      departamento: form.value.departamento,
      telefono: form.value.telefono,
      fkempresa: form.value.fkempresa
    };
    Swal.showLoading();
    this._ContactoService.actualizarContacto(this.editarContacto).subscribe(

      (resp: any) => {
        Swal.close();


        Swal.fire({
          title: 'Actualizado',
          text: 'Contacto actualizado correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
              this.cargarContactos();
              this.cargarMisContactos();
              this.cargarTodosLosContactos();
              this.cargarTodosMisContactos();
              this.closeModalEditarContacto.nativeElement.click();
            }
          });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          title: 'No actualizado',
          text: 'Error al actualizar contacto',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#E5B53A',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
          .then((ok) => {
            if (ok.isConfirmed) {
            }
          });

      }
    );
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
    if (form.invalid) {
      return 'Formulario no válido';
    }
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
