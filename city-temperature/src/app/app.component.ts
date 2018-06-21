import { Component, OnInit } from '@angular/core';

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
  public title = 'CitiesTemperature';
  public check = false;
  public info: Array<object>;
  public errorMessage: string;
  public showMessage = false;

  private _cities = [
    'Santiago',
    'Buenos Aires',
    'Lima',
    'Sao Paulo'
  ];

  // Constructor
  constructor(
    private _services: ApiServices 
  ) {
    this.info = [];
  }

  // OnInit
  ngOnInit() {
    this._getTemperatures();
  }

  // Function to get cities temperatures
  private _getTemperatures() {
    this._cities.forEach((city) => {
      this._services.getTemperatures(city).subscribe(
        (res) => { this.info.push(res);
                    console.log(res);
                  },
        error => console.error('error', error)
      );
    });
  }

  // Function to show cities temperatures screen
  public showCities() {
    this.check = true;
  }
}
