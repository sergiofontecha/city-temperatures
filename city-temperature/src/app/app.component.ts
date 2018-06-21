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
    this.change = new EventEmitter(); 
    this.info = [];
  }

  // OnInit
  ngOnInit() {
    this._getNewTemperatures();
  }

  // Function to show cities temperatures screen
  public showCities() {
    this.check = true;
  }

   // Function to get cities temperatures
  //  private _getTemperatures() {
  //   this._cities.forEach((city) => {
  //     this._services.getTemperatures(city).subscribe(
  //       (res) => { this.info.push(res);
  //                   console.log(res);
  //                 },
  //       error => console.error('error', error)
  //     );
  //   });
  //   // this._getNewTemperatures();
  // }

  // Function to call Api each 3 minutes
  private _getNewTemperatures() {
    console.log('hola1');
    setTimeout(function () {
      this._cities.forEach((city) => {
        this._services.getTemperatures(city).subscribe(
          (res) => { this.info.push(res);
                      console.log(res);
                    },
          error => console.error('error', error)
        );
      });

      this._getNewTemperatures();
    }, 5000);
  }

  // Function to emit updated temperatures
  private _newData() {
    this.change.emit(this.info);
  }
}
