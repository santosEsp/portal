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
          Swal.fire(contacto.nombre, 'Contacto agregado correctamente', 'success');
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
              text: 'Eliminado correctamente',
              icon: 'success',
            });

            return true;
          }
        )
      );
  }


  actualizarContacto(contacto: ContactoModel): any {

    console.log('Contactos a editar Service', contacto)
    let url = URL_SERVICIOS + '/contactos/' + contacto.id_contacto;
    url += '?token=' + this.token;

    return this.http.put(url, contacto)
      .pipe(
        map(
          (resp: any) => {
            Swal.fire({
              title: 'Contacto actualizado',
              text: 'Actualizado correctamente',
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

  cargarContactos(inicio: number): any {
    let url = URL_SERVICIOS + '/contactos/paginacionContactos/' + inicio;
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


  contadorContactosBD(): any {
    let url = URL_SERVICIOS + '/contactos/contadorContactos';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('ContadorContactos: ', resp.contador);
            return resp.contador[0].contador;
          }
        )
      );
  }

  contadorMisContactosBD(miId: number): any {
    let url = URL_SERVICIOS + '/contactos/contadorMisContactos/'+ miId;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('ContadorMisContactos: ', resp.contador);
            return resp.contador[0].contador;
          }
        )
      );
  }

  cargarMisContactos(miId: number, desde: number): any {

    console.log('service miId', miId);
    let url = URL_SERVICIOS + '/contactos/misContactos/' + miId + '/' + desde;
    url += '?token=' + this.token;
    console.log('url miscontactos id, desde', url);
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


  cargarContactosRelacionados(miId: string): any {

    console.log('service miId', miId);
    let url = URL_SERVICIOS + '/contactos/relacionados/' + miId;
    url += '?token=' + this.token;
    console.log('url consulta', url);
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log('contactos relacionados service: ', resp.contactos);
            return resp.contactos;
          }
        )
      );
  }

  cargarUnContacto(idContacto: string): any {

    console.log('service idContacto', idContacto);
    let url = URL_SERVICIOS + '/contactos/consultaContacto/' + idContacto;
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
