export class ContactoModel {
    id_contacto?: string;
    email: string;
    nombre: string;
    apellido: string;
    propietario_registro?: string;
    departamento: string;
    telefono: string;
    fkempresa: number;
    ultima_actividad?: string;
    createdAt?: string;
}