import { Component, OnInit } from '@angular/core';

import { TemperaturesComponent } from '../temperatures/temperatures.component';

import { ApiServices } from '../../services/temperatures.services';

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
    private _services: ApiServices
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
  }

  // Function to show cities temperatures screen
  public showCities() {
    this.check = true;
  }

  // Function to get the cities temperatures
  private _getTempretaures() {
    this._cities.forEach((city) => {
      this._services.getTemperatures(city).subscribe(
        (res) => this.citiesTemperatures.push(res),
        (error) => console.error('error', error)
      )
    });
  }
}