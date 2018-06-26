import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppComponent } from '../../app.component';
import { AppState } from '../../reducers/cityTempretatures.states';
import * as temperaturesActions from '../../actions/temperatures.actions';

import { ApiServices } from '../../services/temperatures.services';

import {Data} from '../../models/temperatures.model';

@Component({
  selector: 'temperatures-component',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})

export class TemperaturesComponent implements OnInit {
  // Component Properties
  @Input()
  public citiesTemperatures: Array<object>;
  
  public home: boolean;
  public showHistorical: boolean;
  public citiesNewInfo: Array<any>;
  public city: string;
  private _cities: Array<string>;
  
   // Constructor
   constructor(
     private _services: ApiServices,
     private store: Store<AppState>
   ) {
    this._cities = [
      'Santiago',
      'Buenos Aires',
      'Lima',
      'Sao Paulo'
    ];
   }

  // OnInit
  ngOnInit() {
    this.home = false;
    this.showHistorical = false;
    this.citiesNewInfo = this.citiesTemperatures;
  }

  // Function to show historical temperatures
  public getHistorical(city: string) {
    this.city = city;
    this.showHistorical = true;
  }

  // Function to come back home screen
  public goHome() {
    this.home = true;
  }

  // Function to add new Cities temperatures to the store
  private addNewData(temp, name, time) {
    this.store.dispatch(new temperaturesActions.historicalTemp({temp: temp, name: name, time: time}))
  }
}