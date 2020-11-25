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
    const workbook: XLSX.WorkBook = { Sheets: { 'Informes': worksheet }, SheetNames: ['Informes'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '-XLSX-' + this.contadorExcel + EXCEL_EXTENSION);
  }
}
