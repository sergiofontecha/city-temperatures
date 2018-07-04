import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../../reducers/cityTempretatures.states';

import { Data } from '../../models/temperatures.model';

@Component({
  selector: 'historical-component',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})

export class HistoricalComponent implements OnInit {

  // Componenet Properties
  public city: string;

  // Chart
  public lineChartData:Array<any> = [
    { data: [], label: 'Historico' },
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    { 
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

  private _data: Observable<Data[]>;

  // Constructor
  constructor(
    private _store: Store<AppState>,
    private _route: ActivatedRoute
  ) { 
    this._data = this._store.select('data');
    this.city = this._route.snapshot.paramMap.get('city');
  }

  // OnInit
  ngOnInit() {
    this._feedChart();
  }

  // Creating data to show city´s historical into a chart
  private _feedChart() {
    this._data.forEach(temperature => {
      for (const item of temperature) {
        if(item.name === this.city) {
          this.lineChartData[0].data.push(item.temp);
          this.lineChartLabels.push(item.time);
        }
      }
    });
  }
}