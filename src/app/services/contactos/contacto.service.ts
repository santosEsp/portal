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
          return resp.contacto;
        }
      )
    );
  }
  ultimaAccion( id: string, accion: string): any {
    console.log('id U -->',id);  
    let url = URL_SERVICIOS + '/contactos/ultima/' + id + '/' + accion;
    url += '/?token=' + this.token;
    console.log('url ultima ---->', url);
    return this.http.put(url,id)
      .pipe(
        map(
          (resp: any) => {
            console.log('ultima actividad actualizada');
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
            return resp.contador[0].contador;
          }
        )
      );
  }

  contadorMisContactosBD(miId: number): any {
    let url = URL_SERVICIOS + '/contactos/contadorMisContactos/' + miId;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.contador[0].contador;
          }
        )
      );
  }

  cargarMisContactos(miId: number, desde: number): any {

    let url = URL_SERVICIOS + '/contactos/misContactos/' + miId + '/' + desde;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.misContactos;
          }
        )
      );
  }


  cargarContactosRelacionados(miId: string): any {

    let url = URL_SERVICIOS + '/contactos/relacionados/' + miId;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.contactos;
          }
        )
      );
  }

  cargarUnContacto(idContacto: string): any {

    let url = URL_SERVICIOS + '/contactos/consultaContacto/' + idContacto;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.unContacto;
          }
        )
      );
  }


  cargarTodosLosContactos(): any {
    let url = URL_SERVICIOS + '/contactos/';
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log(resp.contactos);
            return resp.contactos;
          }
        )
      );
  }


  buscarCantacto(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/contactos/' + "'" + termino + "'";
    console.log(url);
    return this.http.get(url)
      .pipe(map((resp: any) => resp.contactos));
  }

  buscarMiCantacto(termino: string, id: number) {

    let url = URL_SERVICIOS + '/busqueda/miscontactos/' + id + '/' + "'" + termino + "'";
    console.log(url);
    return this.http.get(url)
      .pipe(map((resp: any) => resp.contactos));
  }
  cargarTodosMisContactos(id: number): any {
    let url = URL_SERVICIOS + '/contactos/todosMisContactos/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            console.log(resp.contactos);
            return resp.contactos;
          }
        )
      );
  }
}
