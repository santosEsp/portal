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
    console.log('service guardar Excel', jsonDatos);
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

  // public contactosCsv(jsonDatos: any[], excelFileName: string): void {
  //   console.log('service guardar CSV', jsonDatos);
  //   this.contadorCsv += 1;
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'contactos': worksheet }, SheetNames: ['contactos'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  //   this.saveAsCsvFile(excelBuffer, excelFileName);
  // }
  // private saveAsCsvFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '-CSV-' + this.contadorCsv + CSV_EXTENSION);
  // }

// Guardar mis contactos, services
  public MisContactosExcel(jsonDatos: any[], excelFileName: string): void {
    this.contadorExcelMisContactos += 1;
    console.log('service guardar Excel', jsonDatos);
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

  // public MisContactosCsv(jsonDatos: any[], excelFileName: string): void {
  //   this.contadorCsvMisContactos += 1;
  //   console.log('service guardar MC CSV', jsonDatos);
  //   this.contadorCsv += 1;
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'MisContactos': worksheet }, SheetNames: ['MisContactos'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  //   this.saveAsCsvFile2(excelBuffer, excelFileName);
  // }
  // private saveAsCsvFile2(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '-CSV-' + this.contadorCsvMisContactos + CSV_EXTENSION);
  // }
}
