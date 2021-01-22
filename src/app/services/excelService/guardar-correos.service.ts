import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class GuardarCorreosService {

  contadorExcel = 0;

  constructor() { }


  public correosExcel(jsonDatos: any[], excelFileName: string): void {
    this.contadorExcel += 1;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonDatos);
    const workbook: XLSX.WorkBook = { Sheets: { 'CorreosEnviados': worksheet }, SheetNames: ['CorreosEnviados'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '-XLSX-' + this.contadorExcel + EXCEL_EXTENSION);
  }
}
