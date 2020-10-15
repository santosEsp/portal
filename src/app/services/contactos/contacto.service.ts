import { Injectable } from '@angular/core';
import { ContactoModel } from '../../models/contacto.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  constructor(private http: HttpClient) { }


  crearContacto(contacto: ContactoModel) {
    let url = URL_SERVICIOS + '/contactos/';

    return this.http.post(url, contacto).pipe(
      map(
        (resp: any) => {
          Swal.fire(contacto.nombre, 'Contactos agregado correctamente', 'success');
          return resp.contacto;
        }
      )
    );
  }


  eliminarContacto(id: string) {

    let url = URL_SERVICIOS + '/contactos/' + id;

    return this.http.delete(url)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Contacto eliminado',
              text: 'Eliminado correctaente',
              icon: 'success',
            });

            return true;
          }
        )
      )
  }


  actualizarContacto(contacto: ContactoModel) {

    let url = URL_SERVICIOS + '/contactos' + contacto.id;

    return this.http.put(url, contacto)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Contacto actualizado',
              text: 'Actualizado correctaente',
              icon: 'success',
            });

            return resp.contacto;
          }
        )
      )
  }


  cargarContactos() {
    let url = URL_SERVICIOS + '/contactos/'

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.contactos;
          }
        )
      )
  }

}
