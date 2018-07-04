import { Component, OnInit } from '@angular/core';
// import { ActivedRoute } from '@angular/router';

import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { AppState } from '../../reducers/cityTempretatures.states';
// import * as temperaturesActions from '../../actions/temperatures.actions';

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
    this._services.notifications$.subscribe(
      res => this.citiesNewInfo = res
    );
  }

  // Function to select from data the actual temperatures
  private _takingActualTemperatures() {
    this._data.forEach(item => {
      this._dataInArray.push(item);
    });
    this._dataInArray = _.flatten(this._dataInArray);
    console.log('result', this._dataInArray);
  }
}