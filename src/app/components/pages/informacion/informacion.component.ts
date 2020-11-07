import { Component, OnInit } from '@angular/core';
import { NotaModel } from '../../../models/nota.model';
import { NgForm } from '@angular/forms';

// Rutas activas
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

// Importacion de modelos para contactos
import { ContactoModel } from '../../../models/contacto.model';
import { EmpresaModel } from '../../../models/empresa.model';
import { RegistrarCorreoModel } from '../../../models/registrarCorreo.model';
import { RegistrarLlamadaModel } from '../../../models/registrarLlamada.model';
import { RegistrarReunionModel } from '../../../models/registrarReunion.model';
import { NegocioModel } from '../../../models/negocio.model';


// Importacion de servicios para contactos
import { ContactoService } from '../../../services/contactos/contacto.service';
import { NotasService } from '../../../services/notas/notas.service';
import { EmpresaService } from '../../../services/empresas/empresa.service';
import { RegistrarCorreoService } from '../../../services/registrarCorreo/registrar-correo.service';
import { LlamadasService } from '../../../services/llamadas/llamadas.service';
import { RegistrarReunionService } from '../../../services/registrarReunion/registrar-reunion.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import Swal from 'sweetalert2';

// Importacion de modelos, servicios para empresas
import { NotasEmpresasService } from '../../../services/notasEmpresas/notas-empresas.service';
import { NotasEmpresasModel } from 'src/app/models/notasEmpresas';
import { ReunionesEmpresasService } from '../../../services/reunionesEmpresas/reuniones-empresas.service';
import { ReunionesEmpresasModel } from 'src/app/models/reunionesEmpresas';
import { LlamadasEmpresasModel } from '../../../models/llamadasEmpresas';
import { LlamadasEmpresasService} from '../../../services/llamadasEmpresas/llamadas-empresas.service';
import { CorreosEmpresasService } from '../../../services/correosEmpresas/correos-empresas.service';
import { CorreosEmpresasModel } from 'src/app/models/correosEmpresas';


@Component({
  selector: 'app-perfil',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {

  // Variables, modelos y arrays para obtener info de contactos
  
  correo = new RegistrarCorreoModel();
  llamada = new RegistrarLlamadaModel();
  reunion = new RegistrarReunionModel();
  negocio = new NegocioModel();

  unContacto = new ContactoModel();
  correosR: RegistrarCorreoModel[] = [];
  notasR: NotaModel[] = [];
  llamadasR: RegistrarLlamadaModel[] = [];
  reunionesR: RegistrarReunionModel[] = [];
  nombreEmpresa = new EmpresaModel();
  fkempresaContacto: number;
  idContacto: string;
  nombrePropietario = new UsuarioModel();
  fkpropietarioContacto: number;

 

  // variables para cargar info de empresas
  unaEmpresa = new EmpresaModel();
  idEmpresa: number;
  nombrePropietarioEmpresa = new UsuarioModel();
  fkpropietarioEmpresa: number;
  listaContactosRelacionados: ContactoModel[] = [];
  notasEmpresa: NotasEmpresasModel[] = [];
  ReunionesEmpresa: ReunionesEmpresasModel[] = [];
  llamadasEmpresa: LlamadasEmpresasModel[] = [];
  correosEmpresa: CorreosEmpresasModel[] = [];
  

  ruta: { tipo: string, id: string };

  constructor(private rutaActiva: ActivatedRoute, private _contactoService: ContactoService, private _empresaService: EmpresaService,
    private _registrarCorreoService: RegistrarCorreoService, private _notasService: NotasService,
    private _llamadasService: LlamadasService, private _registrarReunionService: RegistrarReunionService,
    private _usuarioService: UsuarioService, private router: Router,
    private _notasEmpresasService : NotasEmpresasService, private _reunionesEmpresas:ReunionesEmpresasService,
    private _llamadasEmpresa: LlamadasEmpresasService,
    private _correosEmpresas: CorreosEmpresasService
    ) {

    this.rutaActiva.params.subscribe(params => {
      console.log('Se suscribió contacto');
      console.log(this.unContacto);
    });

    this.rutaActiva.params.subscribe(params => {
      console.log('Se suscribió empresa');
      console.log(this.unaEmpresa);
    });

    
  }

  ngOnInit(): void {

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
      Swal.fire(
        'Cargando',
        'Obteniendo datos',
        'info'
      );
      Swal.showLoading();

      this.infoContacto();
      this.cargarCorreosRegistrados();
      this.cargarNotas();
      this.cargarLlamadas();
      this.cargarReuniones();

      Swal.close();

      console.log('Se cumple condicion contactos');
    }
    else {
      console.log('Se cumple condicion empresas');

      Swal.fire(
        'Cargando',
        'Obteniendo datos',
        'info'
      );
      Swal.showLoading();

      this.infoEmpresa();
      this.cargarNotasEmpresas();
      this.cargarReunionesEmpresas();
      this.cargarLlamadasEmpresas();
      this.cargarCorreosEmpresas();

      Swal.close();
    }

  }

  // Métodos para cargar info de contactos
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
    console.log('Cargar empresa relacionada id:', this.fkempresaContacto);
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


  // Cargando datos de empresas si se cumple la condicion
  // Métodos para cargar info de empresas

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
    this._contactoService.cargarContactosRelacionados(this.unaEmpresa.id_empresa).subscribe(listaContactosRelacionados => {
      this.listaContactosRelacionados = listaContactosRelacionados;
      console.log('Lista contactos Relacionados component', listaContactosRelacionados);
    });

  }

  cargarNotasEmpresas(): any {
    this._notasEmpresasService.cargarNotas( this.idEmpresa.toString()).subscribe(listaNotasEmpresas => {
      this.notasEmpresa = listaNotasEmpresas;
      console.log('Notas de empresas comp', this.notasEmpresa);

    });
  }

  cargarReunionesEmpresas(): any {
    this._reunionesEmpresas.cargarReuniones(this.idEmpresa.toString()).subscribe(listaReunionesEmpresas => {
      this.ReunionesEmpresa = listaReunionesEmpresas;
      console.log('Reuniones Empresa comp', this.ReunionesEmpresa);

    });
  }

  cargarLlamadasEmpresas(): any {
    this._llamadasEmpresa.cargarLlamadas(this.idEmpresa.toString()).subscribe(listaLlamadasEmpresas => {
      this.llamadasEmpresa = listaLlamadasEmpresas;
      console.log('Llamadas empresas comp', this.llamadasEmpresa);

    });
  }

  cargarCorreosEmpresas(): any {
    this._correosEmpresas.cargarCorreos(this.idContacto).subscribe(listaCorreosEmpresas => {
      this.correosEmpresa = listaCorreosEmpresas;
      console.log('Correos empresa comp', this.correosEmpresa);
    });
  }


 

  
}
