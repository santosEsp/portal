
import { Component, OnInit } from '@angular/core';
import { InformesService, Informe } from '../../../services/informes/informes.service';
import { NgForm } from '@angular/forms';
import {InformesModel} from '../../../models/informes.models';
import {ExportarExcelService} from '../../../services/excelService/guardar-informes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
})

export class InformesComponent {
  num : Int8Array;
  historico = new InformesModel();
  contadorContactos = 0;
  informes: Informe[] = [];
  informescontactos: InformesModel[] = [];
  lishistorico: any =[];
  info: any = [];
  infosuma: any = [];
  infomejor: any = [];
  infofechaMm: any = [];
  numero : number;
  mejor : number;
  fechaI : string;
  fechaF : string;
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

    //console.log(this.informes);

    this.cargarFechaMinMax();
    this.cargarContactos();
    this.cargarContactossuma();
    this.cargarMejorSemana();
    

  }
   
cargarMejorSemana():any{
  this._informesService.cargarMejorSemana().subscribe(lista => {
      //console.log('lista de la mejor semana ---> ', lista);
      this.infomejor = lista;
      this.mejor= this.infomejor[0].Mayor;
      this.fechaI= this.infomejor[0].FechaI;
      this.fechaF= this.infomejor[0].FechaF;
      //console.log('Mejor semana --->',this.mejor);
      //console.log('Fecha I --->',this.fechaI);
      //console.log('Fecha F --->',this.fechaF);

  });
 
}

exportarinformes(): void{
  //console.log('Exportando informes');
  Swal.fire({
    icon: 'success',
    title: 'Se esta exportando el informe del numero de  contactos registrados (.xlsx)',
    showConfirmButton: false,
    timer: 3000
  });
  //console.log('Lista Info ---->',this.info);

  if (this.lishistorico.length == 0){
      //console.log('Se entro al IF',this.lishistorico.length);
      this._excelService.contactosExcel(this.info,'Informes');

  } else {
      //console.log('Se entro al else',this.lishistorico.length);
      this._excelService.contactosExcel(this.lishistorico,'Informes');
  }
 //this._excelService.contactosExcel(this.info,'Informes');
  
}


cargarFechaMinMax() : any{
  this._informesService.cargarFechaMinMax().subscribe(Lista => {
      this.infofechaMm =Lista;
      //console.log('Fecha Min - Max',this.infofechaMm);
      this.fechaMin=this.infofechaMm[0].FechaMin;
      this.fechaMax=this.infofechaMm[1].FechaMax;
      //console.log('Fecha min --->',this.fechaMin);
      //console.log('Fecha man --->',this.fechaMax);
  })
}

historicoSemana(forma: NgForm): any {
  if (forma.invalid) {
    return 'Formulario no válido';
  }
  this.historico = {
      fechaI: forma.value.historico
  };  
  //console.log('Historico ---> ',this.historico);
 
  this.hisSema(this.historico);
  
}

hisSema(fecha:InformesModel): any{  
  this._informesService.cargarHistorico(fecha.fechaI).subscribe(listaHistorico => {
    this.lishistorico= listaHistorico;
    //console.log('Lista mis contactos component', this.lishistorico);
   


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
     //console.log('lista de cargar Contactos suma ', lista),
      this.infosuma=lista;
     //console.log(' Suma de esta semana (InfoSuma) ---> ', this.infosuma[0].Suma_Contactos); 

     this.numero=this.infosuma[0].Suma_Contactos;
    
     this. promedio = this.numero/7;
    this.promedio = "" + this.promedio;
    this.promedio = this.promedio.trim();
    this.promedio = parseFloat(this.promedio).toFixed(1);
    //console.log('Promedio --->',this.promedio);
    });
  }

  cargarContactos(): any {
    this._informesService.cargarContactos().subscribe(lista => {
      this.info = lista;
      this.contadorContactos = this.info.length;
      //console.log('lista --->',lista);

      this.domingo = this.info[0].Num_Contactos;

      this.lunes = this.info[1].Num_Contactos;
     // console.log('Lunes ---> ', this.lunes);
      this.martes = this.info[2].Num_Contactos;
      //console.log('Martes ---> ', this.martes);
      this.miercoles = this.info[3].Num_Contactos;
     // console.log('Miercoles ---> ', this.miercoles);
      this.jueves = this.info[4].Num_Contactos;
   //   console.log('Jueves---> ', this.jueves);
      this.viernes = this.info[5].Num_Contactos;
    //  console.log('Viernes ---> ', this.viernes);
      this.sabado = this.info[6].Num_Contactos;
    //  console.log('Sabado ---> ', this.sabado);
      
     // console.log('Domingo ---> ', this.domingo);
      this. dia= this.info;
      

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
 
  public barChartLabels: string[] =     [
    'Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'
  ];

  public barChartType = 'bar';
  
  public barChartLegend = false;

  
  public barChartData: any[] = [
    {
      data: [0, 0, 0, 0, 0 , 0, 0],
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


