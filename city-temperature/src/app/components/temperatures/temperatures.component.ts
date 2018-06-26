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
  public cityHistorical: any;
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
    this._timer();
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

  // Function to update cities temperature 
  private _timer() {
    setInterval(() => {
      this._getNewTemperatures();
    }, 30000);
  }

  // Function to get cities temperatures
  private _getNewTemperatures() {
    this._cities.forEach((city) => {
      const date = new Date();

      this._services.getTemperatures(city).subscribe(
        (res) =>  {this._replace(res);
                   this.addNewData(res.main.temp, res.name, date);
                  },
        (error) => console.error('error', error)
      );
    });
  }

  // Function to add new Cities temperatures to the store
  private addNewData(temp, name, date) {
    this.store.dispatch(new temperaturesActions.historicalTemp({temp: temp, name: name, date:date}))
  }

  // Function to replace last temperatures for new one
  private _replace(newInfo) {
    const index = this.citiesNewInfo.findIndex((item) => item.name === newInfo.name);
    this.citiesNewInfo.splice(index, 1, newInfo);
  }
}