import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { AppState } from '../../reducers/cityTempretatures.states';

import { ApiServices } from '../../services/temperatures.services';

import { Data } from '../../models/temperatures.model';

@Component({
  selector: 'temperatures-component',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})

export class TemperaturesComponent implements OnInit {
  // Component Properties
  public citiesNewInfo: Array<any>;

  private _data: Observable<Data[]>;
  private _dataInArray = [];

  // Constructor
  constructor(
    private _services: ApiServices,
    private _store: Store<AppState>
  ) {}

  // OnInit
  ngOnInit() {
    this._data = this._store.select('data');
    this._takingActualTemperatures();
    this._timer();
  }

  // Timer to update data to show in the view
  private _timer() {
    setInterval(() => {
      this._data = this._store.select('data');
      this._takingActualTemperatures();
    }, 15000);
  }

  // Function to select from data the actual temperatures
  private _takingActualTemperatures() {
    this._dataInArray = [];
    this.citiesNewInfo = [];

    this._data.forEach(item => {
      this._dataInArray.push(item);
    });

    this._dataInArray = _.flatten(this._dataInArray);

    for( let i = 1; i <= 4; i++ ) {
      this.citiesNewInfo.push(this._dataInArray[this._dataInArray.length - i]);
    }
    this._arrayOrder();
  }

  private _arrayOrder() {
    this.citiesNewInfo = _.orderBy(this.citiesNewInfo, ['name'], ['asc']);
  }
}