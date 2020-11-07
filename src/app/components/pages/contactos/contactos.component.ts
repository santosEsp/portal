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
  contadorContactos = 0;
  tipo: string;
  miUsuario: string;
  miId: string;
  listaEmpresas: any = [];
  llamadasRealizadas: any = [];
  listaMisContactos: ContactoModel[] = [];
  reunionesRealizadas: any = [];

  constructor(private _ContactoService: ContactoService, private _EmpresaService: EmpresaService,
    private _excelService: ExportarExcelService, private _guardarLlamadasService: GuardarLlamadasService, private _llamadasService: LlamadasService,
    private _registrarReunionService: RegistrarReunionService, private _guardarReunionesService: GuardarReunionesService) {

    this.tipo = 'contacto';
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.propietario.propietario_registro = this.miUsuario['nombre'];
    this.miId = this.miUsuario['id_usuario'];
    // this.Contactos = this.consultas.getContactos();
    // console.log(this.contadorContactos);
    // console.log(this.arregloContactos);

  }

  ngOnInit(): any {

    this.cargarContactos();
    this.cargarListaEmpresas();
    this.cargarMisContactos();
    this.cargarLlamadasRealizadas();
    this.cargarReunionesRealizadas();
  }

  onSubmit(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario inválido';
    }

    console.log(form);
  }



  cargarContactos(): any {
    this._ContactoService.cargarContactos().subscribe(lista => {
      this.contactos = lista;
      this.contadorContactos = this.contactos.length;
      console.log('N contactos', this.contadorContactos);

    });
  }

  cargarMisContactos(): any {
    this._ContactoService.cargarMisContactos(this.miId).subscribe(listaMisContactos => {
      this.listaMisContactos = listaMisContactos;
      console.log('Lista mis contactos component', listaMisContactos);
    });

  }

  cargarListaEmpresas(): any {
    this._EmpresaService.cargarEmpresas().subscribe(lista => this.listaEmpresas = lista);


  }

  agregarContacto(forma: NgForm): any {
    if (forma.invalid) {
      return 'Formulario no válido';
    }

    console.log('Sí entró al método agregar C');
    this.contacto = {
      email: forma.value.email,
      nombre: forma.value.nombre,
      apellido: forma.value.apellido,
      propietario_registro: this.contacto.propietario_registro = this.miUsuario['id_usuario'],
      departamento: forma.value.departamento,
      telefono: forma.value.telefono,
      fkempresa: forma.value.fkempresa
    };

    console.log('Contacto', this.contacto);
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'

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



  actualizarContacto(contacto: ContactoModel): any {
    this._ContactoService.actualizarContacto(contacto).subscribe();
    console.log('Actualiza C', contacto);
  }


  exportarContactos(): void {

    Swal.fire({
      icon: 'success',
      title: 'Se están exportando los contactos (.xlsx)',
      showConfirmButton: false,
      timer: 3000
    });
    this._excelService.contactosExcel(this.contactos, 'Contactos');
  }

  exportarMisContactos(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se están exportando mis contactos (.xlsx)',
      showConfirmButton: false,
      timer: 3000
    });
    this._excelService.MisContactosExcel(this.listaMisContactos, 'MisContactos');
  }

  cargarLlamadasRealizadas() {
    this._llamadasService.reporteLlamadas().subscribe(lista => this.llamadasRealizadas = lista);
    console.log('llamadas realizadas comp', this.llamadasRealizadas);
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
    console.log('Reuniones realizadas', this.reunionesRealizadas);
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
}
