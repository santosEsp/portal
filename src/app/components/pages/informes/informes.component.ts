
import { Component, OnInit } from '@angular/core';
import { InformesService, Informe } from '../../../services/informes/informes.service';
import { NgForm } from '@angular/forms';
import { InformesModel } from '../../../models/informes.models';
import { ExportarExcelService } from '../../../services/excelService/guardar-informes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
})

export class InformesComponent {
  num: Int8Array;
  historico = new InformesModel();
  contadorContactos = 0;
  informes: Informe[] = [];
  informescontactos: InformesModel[] = [];
  lishistorico: any = [];
  info: any = [];
  infosuma: any = [];
  infomejor: any = [];
  infofechaMm: any = [];
  numero: number;
  mejor: number;
  fechaI: string;
  fechaF: string;
  fechaMin;
  fechaMax;
  dia;
  lunes;
  martes;
  miercoles;
  jueves;
  viernes;
  sabado;
  domingo;
  promedio;

  constructor(private _informesService: InformesService, private _excelService: ExportarExcelService) {

  }


  ngOnInit(): any {

    var dia;
    this.informes = this._informesService.getInformes();
    this.cargarFechaMinMax();
    this.cargarContactos();
    this.cargarContactossuma();
    this.cargarMejorSemana();
  }

  cargarMejorSemana(): any {
    this._informesService.cargarMejorSemana().subscribe(lista => {
      this.infomejor = lista;
      this.mejor = this.infomejor[0].Mayor;
      this.fechaI = this.infomejor[0].FechaI;
      this.fechaF = this.infomejor[0].FechaF;
    });

  }

  exportarinformes(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se esta exportando el informe del numero de  contactos registrados (.xlsx)',
      showConfirmButton: false,
      timer: 3000
    });

    if (this.lishistorico.length == 0) {
      this._excelService.contactosExcel(this.info, 'Informes');

    } else {
      this._excelService.contactosExcel(this.lishistorico, 'Informes');
    }
  }


  cargarFechaMinMax(): any {
    this._informesService.cargarFechaMinMax().subscribe(Lista => {
      this.infofechaMm = Lista;
      this.fechaMin = this.infofechaMm[0].FechaMin;
      this.fechaMax = this.infofechaMm[1].FechaMax;
    })
  }

  historicoSemana(forma: NgForm): any {
    if (forma.invalid) {
      return 'Formulario no válido';
    }
    this.historico = {
      fechaI: forma.value.historico
    };
    this.hisSema(this.historico);

  }

  hisSema(fecha: InformesModel): any {
    this._informesService.cargarHistorico(fecha.fechaI).subscribe(listaHistorico => {
      this.lishistorico = listaHistorico;

      this.barChartData[0].data = [
        this.lishistorico[0].Num_Contactos,
        this.lishistorico[1].Num_Contactos,
        this.lishistorico[2].Num_Contactos,
        this.lishistorico[3].Num_Contactos,
        this.lishistorico[4].Num_Contactos,
        this.lishistorico[5].Num_Contactos,
        this.lishistorico[6].Num_Contactos];
    });
  }
  cargarContactossuma(): any {
    this._informesService.cargarContactossuma().subscribe(lista => {
      this.infosuma = lista;
      this.numero = this.infosuma[0].Suma_Contactos;

      this.promedio = this.numero / 7;
      this.promedio = "" + this.promedio;
      this.promedio = this.promedio.trim();
      this.promedio = parseFloat(this.promedio).toFixed(1);
    });
  }

  cargarContactos(): any {
    this._informesService.cargarContactos().subscribe(lista => {
      this.info = lista;
      this.contadorContactos = this.info.length;
      this.domingo = this.info[0].Num_Contactos;
      this.lunes = this.info[1].Num_Contactos;
      this.martes = this.info[2].Num_Contactos;
      this.miercoles = this.info[3].Num_Contactos;
      this.jueves = this.info[4].Num_Contactos;
      this.viernes = this.info[5].Num_Contactos;
      this.sabado = this.info[6].Num_Contactos;
      this.dia = this.info;


      this.barChartData[0].data = [
        this.domingo,
        this.lunes,
        this.martes,
        this.miercoles,
        this.jueves,
        this.viernes,
        this.sabado
      ];


    });






  }

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels: string[] = [
    'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'
  ];

  public barChartType = 'bar';

  public barChartLegend = false;


  public barChartData: any[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        'rgb(229,181,58)',
        'rgb(229,181,58)',
        'rgb(229,181,58)',
        'rgb(229,181,58)',
        'rgb(229,181,58)',
        'rgb(229,181,58)',
        'rgb(229,181,58)'
      ],
      borderColor: [
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)'
      ],
      borderWidth: 2,
      hoverBorderWidth: 0,
      hoverBackgroundColor: [
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)',
        'rgb(108,107,109)'
      ]
    }
  ];




}


