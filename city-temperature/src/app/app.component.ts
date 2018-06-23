import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import{ TemperaturesComponent } from './modules/temperatures/temperatures.component';

import { ApiServices } from  './services/temperatures.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

// MAIN CLASS
export class AppComponent implements OnInit {

  // Component Properties
  @Output()
  public change;

  public title = 'CitiesTemperature';
  public check = false;
  public info: Array<object>;
  public errorMessage: string;
  public showMessage = false;
  private _cities: Array<string>;

  // Constructor
  constructor(
    private _services: ApiServices 
  ) {
    this.change = new EventEmitter(); 
    this._cities = [
      'Santiago',
      'Buenos Aires',
      'Lima',
      'Sao Paulo'
    ];
    this.info = [
      {name: 'Santiago',
       main: {
         temp: '12'
       }},
      {name: 'Lima',
      main: {
        temp: '13'
      }},
      {name: 'Sao Paulo',
      main: {
        temp: '14'
      }},
      {name: 'Buenos Aires',
      main: {
        temp: '15'
      }}
    ];
  }

  // OnInit
  ngOnInit() {
    // this._getTemperatures();
  }

  // Function to show cities temperatures screen
  public showCities() {
    this.check = true;
  }

  // Function to get cities temperatures
  // private _getTemperatures() {
  //   this._cities.forEach((city) => {
  //     this._services.getTemperatures(city).subscribe(
  //       (res) =>  this.info.push(res),
  //       error => console.error('error', error)
  //     );
  //   });
  // }

  // Function to emit updated temperatures
  private _newData() {
    this.change.emit(this.info);
  }
}
