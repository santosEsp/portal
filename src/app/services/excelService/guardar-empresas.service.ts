import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv';
@Injectable({
  providedIn: 'root'
})
export class ExcelEmpresasService {

  contadorExcel = 0;
  contadorCsv = 0;
  contadorExcelMisEmpresas = 0;
  contadorCsvMisEmpresas = 0;

  constructor() { }

  public empresasExcel(jsonDatos: any[], excelFileName: string): void {
    console.log('service guardar Excel', jsonDatos);
    this.contadorExcel += 1;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
    const workbook: XLSX.WorkBook = { Sheets: { 'empresas': worksheet }, SheetNames: ['empresas'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '-XLSX-' + this.contadorExcel + EXCEL_EXTENSION);
  }

  // public empresasCsv(jsonDatos: any[], excelFileName: string): void {
  //   console.log('service guardar CSV', jsonDatos);
  //   this.contadorCsv += 1;
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'empresas': worksheet }, SheetNames: ['empresas'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  //   this.saveAsCsvFile(excelBuffer, excelFileName);
  // }
  // private saveAsCsvFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '-CSV-' + this.contadorCsv + CSV_EXTENSION);
  // }

// Guardar mis contactos, services
  public MisEmpresasExcel(jsonDatos: any[], excelFileName: string): void {
    this.contadorExcelMisEmpresas += 1;
    console.log('service guardar Excel', jsonDatos);
    this.contadorExcel += 1;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
    const workbook: XLSX.WorkBook = { Sheets: { 'MisEmpresas': worksheet }, SheetNames: ['MisEmpresas'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile2(excelBuffer, excelFileName);
  }
  private saveAsExcelFile2(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '-XLSX-' + this.contadorExcelMisEmpresas + EXCEL_EXTENSION);
  }

  // public MisEmpresasCsv(jsonDatos: any[], excelFileName: string): void {
  //   this.contadorCsvMisEmpresas += 1;
  //   console.log('service guardar MC CSV', jsonDatos);
  //   this.contadorCsv += 1;
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'MisEmpresas': worksheet }, SheetNames: ['MisEmpresas'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  //   this.saveAsCsvFile2(excelBuffer, excelFileName);
  // }
  // private saveAsCsvFile2(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '-CSV-' + this.contadorCsvMisEmpresas + CSV_EXTENSION);
  // }
}
