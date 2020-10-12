import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultasService } from '../../../services/consultas.service';
import { ContactoModel } from '../../../models/contacto.model';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {

  contacto = new ContactoModel();
  arregloContactos: ContactoModel[] = [];
  contadorContactos = 0;
  tipo: string;

  constructor(private consultas: ConsultasService) {
    
    this.tipo = "contacto";
    this.arregloContactos = this.consultas.getContactos();
    this.contadorContactos = this.arregloContactos.length;
    console.log(this.contadorContactos);
    console.log(this.arregloContactos);
  }

  ngOnInit() {

    

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return 'Formulario inválido';
    }

    console.log(form);
  }
}
