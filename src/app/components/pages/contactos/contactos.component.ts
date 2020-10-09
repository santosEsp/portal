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
  contador = 0;

  constructor(private consultas: ConsultasService) { }

  ngOnInit() {

    this.arregloContactos = this.consultas.getContactos();
    console.log(this.arregloContactos);

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return 'Formulario inválido';
    }

    console.log(form);
  }
}
