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
  token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  crearContacto(contacto: ContactoModel): any {
    let url = URL_SERVICIOS + '/contactos/';
    url += '?token=' + this.token;

    return this.http.post(url, contacto).pipe(
      map(
        (resp: any) => {
          Swal.fire(contacto.nombre, 'Contactos agregado correctamente', 'success');
          return resp.contacto;
        }
      )
    );
  }


  eliminarContacto(id: string): any {

    let url = URL_SERVICIOS + '/contactos/' + id;
    url += '?token=' + this.token;

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
      );
  }


  actualizarContacto(contacto: ContactoModel): any {

    let url = URL_SERVICIOS + '/contactos/' + contacto.id_contacto;
    url += '?token=' + this.token;

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
      );
  }


  actualizarMiContacto(contacto: ContactoModel): any {

    let url = URL_SERVICIOS + '/contactos/' + contacto.id_contacto;
    url += '?token=' + this.token;

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
      );
  }

  cargarContactos(): any {
    let url = URL_SERVICIOS + '/contactos/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('todos contactos: ', resp.contactos);
            return resp.contactos;
          }
        )
      );
  }

  cargarMisContactos(miId: string): any {

    console.log('service miId', miId);
    let url = URL_SERVICIOS + '/contactos/miscontactos/' + miId;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('misContactos service: ', resp.misContactos);
            return resp.misContactos;
          }
        )
      );
  }


  cargarUnContacto(idContacto: string): any {

    console.log('service idContacto', idContacto);
    let url = URL_SERVICIOS + '/contactos/' + idContacto;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('cargarUnContacto service: ', resp.unContacto);
            return resp.unContacto;
          }
        )
      );
  }


}
