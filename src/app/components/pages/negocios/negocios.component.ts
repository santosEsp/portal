import { Component, OnInit } from '@angular/core';
import { NegocioModel } from '../../../models/negocio.model';
import { NgForm } from '@angular/forms';
import { EmpresaModel } from '../../../models/empresa.model';
import { NegociosContactosService } from '../../../services/negociosContactos/negocios-contactos.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegocioComponent implements OnInit {
  negocio: NegocioModel;
  listaNegocios: any = [];
  contadorNegocios: number;
  arraySuma: any = [];
  suma1 = 0; suma2 = 0; suma3 = 0; suma4 = 0; suma5 = 0;
  suma6 = 0; suma7 = 0; suma8 = 0; suma9 = 0; suma10 = 0;

  constructor(private _negociosContactoService: NegociosContactosService) { }

  ngOnInit(): void {
    this.negocio = new NegocioModel();
    this.negocio.nombre_negocio = "Sistema CRM ClickSoft";
    this.negocio.pipeline = "Sales de Pipeline";
    this.negocio.cantidad = 1;

    this.cargarNegocios();

  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      console.log("Algo salio mal :(");
      console.log(form);
      return;
    }
    console.log("Negocio agregado ..:)");
    console.log(form);
  }

  cargarNegocios() {
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


}
