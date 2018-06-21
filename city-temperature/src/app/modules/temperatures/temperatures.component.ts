import { Component, Input } from '@angular/core';


@Component({
  selector: 'temperatures-component',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})

export class TemperaturesComponent {
 
@Input()
public citiesInfo: Array<object>;

}