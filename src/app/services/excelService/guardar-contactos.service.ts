import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv';

@Injectable({
  providedIn: 'root'
})
export class ExportarExcelService {

  contadorExcel = 0;
  contadorCsv = 0;
  contadorExcelMisContactos = 0;
  contadorCsvMisContactos = 0;
  constructor() { }

  public contactosExcel(jsonDatos: any[], excelFileName: string): void {
    this.contadorExcel += 1;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
    const workbook: XLSX.WorkBook = { Sheets: { 'contactos': worksheet }, SheetNames: ['contactos'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '-XLSX-' + this.contadorExcel + EXCEL_EXTENSION);
  }
  // Guardar mis contactos, services
  public MisContactosExcel(jsonDatos: any[], excelFileName: string): void {
    this.contadorExcelMisContactos += 1;
    this.contadorExcel += 1;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
    const workbook: XLSX.WorkBook = { Sheets: { 'MisContactos': worksheet }, SheetNames: ['MisContactos'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile2(excelBuffer, excelFileName);
  }
  private saveAsExcelFile2(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '-XLSX-' + this.contadorExcelMisContactos + EXCEL_EXTENSION);
  }

}
