import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { TemperaturesComponent } from '../temperatures/temperatures.component';
import { AppState } from '../../reducers/cityTempretatures.states';

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

  public data: Observable<Data[]>;
  public chartOptions = {
    responsive: true
  };
  public chartData = [
    { }
  ];
  public chartLabels = [];
  public leaveScreen: boolean;

  // Constructor
  constructor(private store: Store<AppState>) { 
    this.data = store.select('data')
    console.log('data', this.data);
  }

  // OnInit
  ngOnInit() {
    this.leaveScreen = false
  }

  // Function to come back to cities temperatures screen
  public goToCitiesTemperatures() {
    this.leaveScreen = true;

  }
}