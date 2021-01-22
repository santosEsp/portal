import { DatePipe } from '@angular/common';

export class RegistrarCorreoModel {
    id?: string;
    fkusuario: string;
    fkcontacto: string;
    fecha: string;
    hora: string;
    descripcion: string;
    createdAt?: string;
    updatedAt?: string;
}