import { Component, OnInit } from '@angular/core';

import { ApiServices } from  './services/temperatures.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// MAIN CLASS
export class AppComponent {

  // Component Properties
  public title = 'CityTemperature';
  public check = false;
  public info: Array<object>;
  public errorMessage: string;
  public showMessage = false;

  private _cities = [
    'Santiago',
    'Buenos Aires',
    'Lima',
    'Sao Paolo'
  ];

  //Constructor
  constructor(
    private _services: ApiServices 
  ) {}

  // OnInit
  ngOnInit() {
    this._getTemperatures();
  }

  // Function to get cities temperatures
  private _getTemperatures() {
    this._cities.forEach((city) => {
      this._services.getTemperatures(city).subscribe(
        res => {
          this.info.push(res);
          console.log('res', res);
        },
        error => {
          this.showMessage = true;
          this.errorMessage = 'Lo sentimos, no se ha podido realizar la acción. Por favor reporte el error';
          console.error('error', error);
        }
      );
    });
  }
}
