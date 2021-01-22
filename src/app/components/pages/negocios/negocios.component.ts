import { Component, OnInit } from '@angular/core';
import { NegocioModel } from '../../../models/negocio.model';
import { NgForm } from '@angular/forms';
import { EmpresaModel } from '../../../models/empresa.model';
import { NegociosContactosService } from '../../../services/negociosContactos/negocios-contactos.service';
import { NegociosEmpresasService } from '../../../services/negocioEmpresas/negocios-empresas.service';
import { EtapasNegociosService } from '../../../services/etapasNegocios/etapas-negocios.service';
@Component({
  selector: 'app-negocio',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegocioComponent implements OnInit {
  negocio: NegocioModel;
  listaNegocios: any = [];
  listaNegociosEmpresas: any = [];
  contadorNegocios: number;
  arraySuma: any = [];
  suma1 = 0; suma2 = 0; suma3 = 0; suma4 = 0; suma5 = 0;
  suma6 = 0; suma7 = 0; suma8 = 0; suma9 = 0; suma10 = 0;
  arrayEtapas: any[] = [];

  constructor(private _negociosContactoService: NegociosContactosService,
    private _negociosEmpresaService: NegociosEmpresasService, private _etapasService: EtapasNegociosService) { }

  ngOnInit(): void {
    this.negocio = new NegocioModel();
    this.negocio.nombre_negocio = "Sistema CRM ClickSoft";
    this.negocio.pipeline = "Sales de Pipeline";
    this.negocio.cantidad = 1;
    this.cargarNegociosConContactos();
    this.cargarNegociosConEmpresas();
    this.cargarInfoEtapas();
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }
  }

  cargarInfoEtapas() {
    this._etapasService.cargarEtapas().subscribe(lista => {
      this.arrayEtapas = lista;
    });
  }

  cargarNegociosConContactos() {
    this._negociosContactoService.cargarNegocios().subscribe(
      lista => {
        this.listaNegocios = lista;
        this.contadorNegocios = this.listaNegocios.length;
        for (let i = 0; i < this.listaNegocios.length; i++) {

          if (this.listaNegocios[i].fketapa === 1) {
            this.suma1 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 2) {
            this.suma2 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 3) {
            this.suma3 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 4) {
            this.suma4 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 5) {
            this.suma5 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 6) {
            this.suma6 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 7) {
            this.suma7 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 8) {
            this.suma8 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 9) {
            this.suma9 += this.listaNegocios[i].cantidad;
          }

          if (this.listaNegocios[i].fketapa === 10) {
            this.suma10 += this.listaNegocios[i].cantidad;
          }
        }
      }
    );
  }

  cargarNegociosConEmpresas() {
    this._negociosEmpresaService.cargarNegocios().subscribe(
      lista => {
        this.listaNegociosEmpresas = lista;

        for (let i = 0; i < this.listaNegociosEmpresas.length; i++) {

          if (this.listaNegociosEmpresas[i].fketapa === 1) {
            this.suma1 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 2) {
            this.suma2 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 3) {
            this.suma3 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 4) {
            this.suma4 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 5) {
            this.suma5 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 6) {
            this.suma6 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 7) {
            this.suma7 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 8) {
            this.suma8 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 9) {
            this.suma9 += this.listaNegociosEmpresas[i].cantidad;
          }

          if (this.listaNegociosEmpresas[i].fketapa === 10) {
            this.suma10 += this.listaNegociosEmpresas[i].cantidad;
          }
        }
      }
    );
  }


  // intentaré unir los arrays

}
