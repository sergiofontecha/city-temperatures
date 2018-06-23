import { Component, Input, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';


@Component({
  selector: 'temperatures-component',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})

export class TemperaturesComponent implements OnInit {

  @Input()
  public citiesInfo: Array<object>;

  public home: boolean;

  ngOnInit() {
    this.home = false;
  }

  public goHome() {
    this.home = true;
  }

}