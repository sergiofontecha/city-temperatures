import { Data } from '../models/temperatures.model';
import * as temperaturesActions from '../actions/temperatures.actions';

export function reducers(state: Data[] = [], action: temperaturesActions.Actions) {
  switch(action.type) {
    case temperaturesActions.ADD_TEMPERATURES:
      return [...state, action.payload];
    default:
      return state;  
  }
} 