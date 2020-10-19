import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactoModel } from '../../../models/contacto.model';
import { ContactoService } from '../../../services/contactos/contacto.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {

  contacto = new ContactoModel();
  contactos: ContactoModel[] = [];
  contadorContactos = 0;
  tipo: string;
  miUsuario: string;

  constructor(private _ContactoService: ContactoService) {

    this.tipo = "contacto";
    this.miUsuario = JSON.parse(localStorage.getItem('usuario'));
    

    this.contacto.propietario_registro = this.miUsuario.nombre;
    
    // this.Contactos = this.consultas.getContactos();
    // console.log(this.contadorContactos);
    // console.log(this.arregloContactos);

  }

  ngOnInit() {

  this.cargarContactos();
  this.contadorContactos = this.contactos.length;
  console.log('Contactos desde BD', this.contactos);

  
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return 'Formulario inválido';
    }

    console.log(form);
  }



  cargarContactos() {
    this._ContactoService.cargarContactos().subscribe(lista => this.contactos = lista);
    
  }


}
