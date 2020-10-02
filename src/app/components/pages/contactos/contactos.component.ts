import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactoModel } from '../../../models/contacto.model';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {
  contacto: ContactoModel;
  constructor() {}

  ngOnInit(){
  this.contacto = new ContactoModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return 'Formulario inválido';
    }

    console.log(form);
  }
}
