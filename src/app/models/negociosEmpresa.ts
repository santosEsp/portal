export class NegociosEmpresaModel {
    id_negocio?: string;
    nombre_negocio: string;
    pipeline: string;
    cantidad: number;
    fketapa: number;
    fkempresa: number;
    fkusuario: number;
    fcierre: string;
    createdAt?: string;
    updatedAt?: string;
}