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
  contadorContactos: number;
  contadorMisContactos: number;
  tipo: string;
  miUsuario: string;
  miId: number;
  listaEmpresas: any = [];
  llamadasRealizadas: any = [];
  listaMisContactos: ContactoModel[] = [];
  reunionesRealizadas: any = [];
  proveedores;
  Contacto: any = [];

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
    // this.Contactos = this.consultas.getContactos();
    // console.log(this.contadorContactos);
    // console.log(this.arregloContactos);
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

  }

  onSubmit(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario inválido';
    }

    console.log(form);
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
      console.log('ContadorContactos COMP: ' + this.contadorContactos);

      this.guardarContadorContactos(this.contadorContactos);

    });
  }

  contadorMisContactosBD() {

    this._ContactoService.contadorMisContactosBD(this.miId).subscribe(contador => {
      this.contadorMisContactos = contador;
      console.log('ContadorMisContactos COMP: ' + this.contadorMisContactos);
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
      console.log('HAY MAS PAGINAS', this.masPaginasC);
    }
    else {
      this.masPaginasC = true;
      console.log('HAY MAS PAGINAS', this.masPaginasC);
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
    console.log('Contador MC ', this.salvaContadorMisContactos);
  }

  sumaMisContactosHasta(valor: number) {

    this.misContactosDesde += valor;
    if (this.salvaContadorMisContactos - this.misContactosDesde <= 10) {
      this.masPaginasMC = false;
      console.log('HAY MAS PAGINAS', this.masPaginasMC);
      this.cargarMisContactos();
    }

    else {
      this.masPaginasMC = true;
      console.log('HAY MAS PAGINAS', this.masPaginasMC);
    }
  }

  restaMisContactosHasta(valor: number) {
    this.misContactosDesde -= valor;
    this.cargarMisContactos();
    console.log('Despues de resta MCD', this.misContactosDesde);
    this.masPaginasMC = true;

  }






  cargarContactos(): any {
    this._ContactoService.cargarContactos(this.desde).subscribe(lista => {
      this.contactos = lista;
    });
  }

  cargarMisContactos(): any {

    this._ContactoService.cargarMisContactos(this.miId, this.misContactosDesde).subscribe(listaMisContactos => {
      this.listaMisContactos = listaMisContactos;
    });

  }

  cargarListaEmpresas(): any {
    this._EmpresaService.cargarListaEmpresas().subscribe(lista => this.listaEmpresas = lista);

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


  cargarInfoAlForm(datos: any) {
    console.log('Data para cargar al form Contactos', datos);

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

    console.log('Actualiza Contactos info a enviar', this.contacto);
    this._ContactoService.actualizarContacto(this.contacto).subscribe();
  }

}
