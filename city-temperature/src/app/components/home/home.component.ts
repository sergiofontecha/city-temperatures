import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers/cityTempretatures.states';
import * as temperaturesActions from '../../actions/temperatures.actions';

import { ApiServices } from '../../services/temperatures.services';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

// MAIN CLASS
export class HomeComponent implements OnInit {

  // Component Properties
  public title = 'CitiesTemperature';
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
  }

  // OnInit
  ngOnInit() {
    this._getTempetaures();
    this._timer();
  }

  // Function to get the cities temperatures
  public _getTempetaures() {
    this._cities.forEach((city) => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = this._services.addZero(hour) + ':' + this._services.addZero(minutes);

      this._services.getTemperatures(city).subscribe(
        (res) =>  this.addNewData(res.main.temp, res.name, time),
        (error) => console.error('error', error)
      )
    });
  }

  // Function to update cities temperature 
  private _timer() {
    setInterval(() => {
      this._getTempetaures();
    }, 15000);
  }

  // Function to add new Cities temperatures to the store
  private addNewData(temp, name, time) {
    this.store.dispatch(new temperaturesActions.historicalTemp({temp: temp, name: name, time: time}))
  }
}