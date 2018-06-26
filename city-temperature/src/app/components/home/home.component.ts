import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TemperaturesComponent } from '../temperatures/temperatures.component';
import { AppState } from '../../reducers/cityTempretatures.states';
import * as temperaturesActions from '../../actions/temperatures.actions';

import { ApiServices } from '../../services/temperatures.services';

import {Data} from '../../models/temperatures.model';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

// MAIN CLASS
export class HomeComponent {

  // Component Properties
  public title = 'CitiesTemperature';
  public check = false;
  public citiesTemperatures: Array<object>;
  private _cities: Array<string>; 

  //Constructor
  constructor(
    private _services: ApiServices,
    private store: Store<AppState>
  ){
    this._cities = [
      'Santiago',
      'Buenos Aires',
      'Lima',
      'Sao Paulo'
    ];

    this.citiesTemperatures = [];
  }

  // OnInit
  ngOnInit() {
    this._getTempretaures();
    this._timer();
  }

  // Function to show cities temperatures screen
  public showCities() {
    this.check = true;
  }

  // Function to get the cities temperatures
  private _getTempretaures() {
    this._cities.forEach((city) => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = this._services.addZero(hour) + ':' + this._services.addZero(minutes);

      this._services.getTemperatures(city).subscribe(
        (res) => { this.addNewData(res.main.temp, res.name, time);
                   this.citiesTemperatures.push(res);
                  },
        (error) => console.error('error', error)
      )
    });
  }

  // Function to update cities temperature 
  private _timer() {
    setInterval(() => {
      this._getNewTemperatures();
    }, 15000);
  }

  // Function to get cities temperatures
  private _getNewTemperatures() {
    let newInfo = [];

    this._cities.forEach((city) => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = hour + ':' + minutes;

      this._services.getTemperatures(city).subscribe(
        (res) => {  this.addNewData(res.main.temp, res.name, time);
                    setInterval(this._replace(res), 18000);
                  },
        (error) => console.error('error', error)
      );
    });
  }

  // Function to add new Cities temperatures to the store
  private addNewData(temp, name, time) {
    this.store.dispatch(new temperaturesActions.historicalTemp({temp: temp, name: name, time: time}))
  }

  // Function to replace last temperatures for new one
  private _replace(newInfo) {
    const index = this.citiesTemperatures.findIndex((item) => item[name] === newInfo.name);
    this.citiesTemperatures.splice(index, 1, newInfo);
  }
}