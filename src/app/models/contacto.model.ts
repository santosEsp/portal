export class ContactoModel{
    id?: string;
    correo: string;
    nombre: string;
    apellido: string;
    propietario_registro: string;
    departamento: string;
    telefono: string;
    fkempresa: number;
    ultimaActividad?: string;
}