import { Component, Input, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';

import { ApiServices } from '../../services/temperatures.services';

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
     private _services: ApiServices
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
      this._services.getTemperatures(city).subscribe(
        (res) =>  this._replace(res),
        (error) => console.error('error', error)
      );
    });
  }

  // Function to replace last temperatures for new one
  private _replace(newInfo) {
    const index = this.citiesNewInfo.findIndex((item) => item.name === newInfo.name);
    this.citiesNewInfo.splice(index, 1, newInfo);
  }
}