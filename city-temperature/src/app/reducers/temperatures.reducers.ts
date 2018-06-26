import { Action } from '@ngrx/store';
import { Data } from '../models/temperatures.model';
import * as temperaturesActions from '../actions/temperatures.actions';

const initialSatate: Data = {
    temp: 20,
    name: 'Barcelona',
    date: new Date()
}


export function reducers(state: Data[] = [initialSatate], action: temperaturesActions.Actions) {
  switch(action.type) {
    case temperaturesActions.ADD_TEMPERATURES:
      return [...state, action.payload];
    default:
      return state;  
  }
} 