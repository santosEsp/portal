import { Component, OnInit } from '@angular/core';
import { NotaModel } from '../../../models/nota.model';
import { NgForm } from '@angular/forms';

// Rutas activas
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

// Importacion de modelos
import { ContactoModel } from '../../../models/contacto.model';
import { EmpresaModel } from '../../../models/empresa.model';
import { RegistrarCorreoModel } from '../../../models/registrarCorreo.model';
import { RegistrarLlamadaModel } from '../../../models/registrarLlamada.model';
import { RegistrarReunionModel } from '../../../models/registrarReunion.model';
import { NegocioModel } from '../../../models/negocio.model';

// Importacion de servicios
import { ContactoService } from '../../../services/contactos/contacto.service';
import { NotasService } from '../../../services/notas/notas.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import { RegistrarCorreoService } from '../../../services/registrarCorreo/registrar-correo.service';
import { LlamadasService } from '../../../services/llamadas/llamadas.service';
import { RegistrarReunionService } from '../../../services/registrarReunion/registrar-reunion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';




@Component({
  selector: 'app-perfil',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {
  tipoEmpresa: string;
  nota: NotaModel;
  correo: RegistrarCorreoModel;
  llamada: RegistrarLlamadaModel;
  reunion: RegistrarReunionModel;
  negocio: NegocioModel;
  fecha: Date = new Date();
  unContacto = new ContactoModel();
  unaEmpresa = new EmpresaModel();
  idContacto: string;
  idEmpresa: number;
  correosR: RegistrarCorreoModel[] = [];
  notasR: NotaModel[] = [];
  llamadasR: RegistrarLlamadaModel[] = [];
  reunionesR: RegistrarReunionModel[] = [];
  nombreEmpresa = new EmpresaModel();
  fkempresaContacto: number;
  nombrePropietario = new UsuarioModel();
  nombrePropietarioEmpresa = new UsuarioModel();
  fkpropietarioContacto: number;
  fkpropietarioEmpresa: number;
  listaContactosRelacionados: ContactoModel[] = [];

  ruta: { tipo: string, id: string };

  constructor(private rutaActiva: ActivatedRoute, private _contactoService: ContactoService, private _empresaService: EmpresaService,
    private _registrarCorreoService: RegistrarCorreoService, private _notasService: NotasService,
    private _llamadasService: LlamadasService, private _registrarReunionService: RegistrarReunionService,
    private _usuarioService: UsuarioService, private router: Router) {

    this.tipoEmpresa = 'empresa';

    this.rutaActiva.params.subscribe(params => {

      // this.unContacto = this.consultaService.getContacto(params['id']);

      console.log('Se suscribió contacto');
      console.log(this.unContacto);


    });



    this.rutaActiva.params.subscribe(params => {

      // this.unaEmpresa = this.consultaService.getEmpresa(params['id']);

      console.log('Se suscribió empresa');
      console.log(this.unaEmpresa);


    });

    console.log(this.fecha);
  }

  ngOnInit(): void {

    this.nota = new NotaModel();
    this.correo = new RegistrarCorreoModel();
    this.llamada = new RegistrarLlamadaModel();
    this.reunion = new RegistrarReunionModel();
    this.negocio = new NegocioModel();

    this.ruta = {
      tipo: this.rutaActiva.snapshot.params.tipo,
      id: this.rutaActiva.snapshot.params.id
    };

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.ruta.tipo = params.tipo;
        this.ruta.id = params.id;
      }
    );

    this.idContacto = this.ruta.id;
    this.idEmpresa = parseInt(this.ruta.id);

    console.log(' Verificando valores Array Ruta ');
    console.log(this.ruta);
    console.log(this.ruta.tipo);

    if (this.ruta.tipo === 'contacto') {
      this.infoContacto();
      console.log('Se cumple condicion contactos');
    }
    else {
      this.infoEmpresa();
      console.log('Se cumple condicion empresas');
    }

    this.cargarCorreosRegistrados();
    this.cargarNotas();
    this.cargarLlamadas();
    this.cargarReuniones();

  }

  // '/informacion',tipo, empresa.id_empresa


  cargarCorreosRegistrados(): any {
    this._registrarCorreoService.cargarCorreos(this.idContacto).subscribe(listaCorreosR => {
      this.correosR = listaCorreosR;
      console.log('N correosR registrados', this.correosR);

    });
  }


  cargarNotas(): any {
    this._notasService.cargarNotas(this.idContacto).subscribe(listaNotas => {
      this.notasR = listaNotas;
      console.log('Notas registrados comp', this.notasR);

    });
  }

  cargarLlamadas(): any {
    this._llamadasService.cargarLlamadas(this.idContacto).subscribe(listaLlamadas => {
      this.llamadasR = listaLlamadas;
      console.log('Llamadas registradas comp', this.llamadasR);

    });
  }

  cargarReuniones(): any {
    this._registrarReunionService.cargarReuniones(this.idContacto).subscribe(listaReuniones => {
      this.reunionesR = listaReuniones;
      console.log('Reuniones registrados comp', this.reunionesR);

    });
  }



  infoContacto(): any {
    this._contactoService.cargarUnContacto(this.idContacto).subscribe(contacto => {
      this.unContacto = contacto;
      this.fkempresaContacto = this.unContacto.fkempresa;
      this.fkpropietarioContacto = parseInt(this.unContacto.propietario_registro);
      console.log('valor asignado fkempresa', this.fkempresaContacto);
      console.log('info recibido un contacto', contacto);

      this.cargaEmpresaDeContacto();
      this.cargaNombrePropietarioContacto();
    });
  }

  cargaEmpresaDeContacto() {
    console.log('CargarNombreEmpresa valor:', this.fkempresaContacto);
    this._empresaService.cargarUnaEmpresa(this.fkempresaContacto).subscribe(nombreEmpresa => {
      this.nombreEmpresa = nombreEmpresa;
      console.log('Nombre empresa comp: ', this.nombreEmpresa);
    });
  }


  cargaNombrePropietarioContacto() {
    console.log('CargarNombrePropietario valor:', this.fkpropietarioContacto);
    this._usuarioService.cargarUnUsuario(this.fkpropietarioContacto).subscribe(nombreContacto => {
      this.nombrePropietario = nombreContacto;
      console.log('Nombre empresa comp: ', this.nombrePropietario);
    });
  }



  infoEmpresa(): any {
    this._empresaService.cargarUnaEmpresa(this.idEmpresa).subscribe(empresa => {
      this.unaEmpresa = empresa;
      console.log('info recibido una empresa', empresa);

      this.fkpropietarioEmpresa = parseInt(this.unaEmpresa.propietario_registro);
      console.log('fkPropietarioEmpresa: ', this.fkpropietarioEmpresa);
      this.cargaNombrePropietarioEmpresa();
      this.cargarContactosRelacionados();
    });
  }


  cargaNombrePropietarioEmpresa() {
    console.log('CargarNombrePropietarioEmpresa valor:', this.fkpropietarioEmpresa);
    this._usuarioService.cargarUnUsuario(this.fkpropietarioEmpresa).subscribe(nombrePropietario => {
      this.nombrePropietarioEmpresa = nombrePropietario;
      console.log('Nombre propietario empresa comp: ', this.nombrePropietarioEmpresa.nombre);
    });
  }

  cargarContactosRelacionados(): any {
    this._contactoService.cargarMisContactos(this.unaEmpresa.id_empresa).subscribe(listaContactosRelacionados => {
      this.listaContactosRelacionados = listaContactosRelacionados;
      console.log('Lista contactos Relacionados component', listaContactosRelacionados);
    });

  }


  registrarNota(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarCorreo(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarLlamada(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarReunion(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }

  registrarNegocio(form: NgForm): any {
    if (form.invalid) {
      return 'Formulario no válido';
    }

    console.log(form);
  }
}
