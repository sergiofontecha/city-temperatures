import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Data } from '../models/temperatures.model';
 
export const ADD_TEMPERATURES = '[TEMPERATURES] Add';

export class historicalTemp implements Action {
  readonly type = ADD_TEMPERATURES;

  constructor(public payload: Data) {}
}

export type Actions = historicalTemp;

