
import { Component, OnInit } from '@angular/core';
import { InformesService, Informe } from '../../../services/informes/informes.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
})

export class InformesComponent{

 
  informes: Informe [] = [];
  constructor(private _informesService:InformesService){

  }
  
  ngOnInit(){
    this.informes = this._informesService.getInformes();

    console.log(this.informes);
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[] = [{data: [100, 100, 100, 100, 100, 100, 100]}];




  // events
  public chartClicked(e: any ): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
