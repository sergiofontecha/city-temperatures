import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { TemperaturesComponent } from '../temperatures/temperatures.component';
import { AppState } from '../../reducers/cityTempretatures.states';

import { ApiServices } from '../../services/temperatures.services';

import {Data} from '../../models/temperatures.model';

@Component({
  selector: 'historical-component',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})

export class HistoricalComponent implements OnInit {

  // Componenet Properties
  @Input()
  public city: string;

  public citiesTemperatures: Array<object>;
  public data: Observable<Data[]>;
  public leaveScreen: boolean;
  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Historico'},
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  private _cities: Array<string>; 

  // Constructor
  constructor(
    private _services: ApiServices,
    private store: Store<AppState>
  ) { 
    this.data = store.select('data');
    this.citiesTemperatures = [];
    this._cities = [
      'Santiago',
      'Buenos Aires',
      'Lima',
      'Sao Paulo'
    ];
  }

  // OnInit
  ngOnInit() {
    this._feedChart();
    this.leaveScreen = false;
  }

  // Function to come back to cities temperatures screen
  public goToCitiesTemperatures() {
    this._getTempretaures();
    this.leaveScreen = true;

  }

  // Function to get the cities temperatures
  private _getTempretaures() {
    this._cities.forEach((city) => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = this._services.addZero(hour) + ':' + this._services.addZero(minutes);

      this._services.getTemperatures(city).subscribe(
        (res) => this.citiesTemperatures.push(res),
        (error) => console.error('error', error)
      )
    });
  }

  // Creating data to show city´s historical into a chart
  private _feedChart() {
    this.data.forEach(temperature => {
      for (const item of temperature) {
        if(item.name === this.city) {
          this.lineChartData[0].data.push(item.temp);
          this.lineChartLabels.push(item.time);
        }
      }
    });
  }
}