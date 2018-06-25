import { Component, OnInit, Input } from '@angular/core';

import { TemperaturesComponent } from '../temperatures/temperatures.component';

@Component({
  selector: 'historical-component',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})

export class HistoricalComponent implements OnInit {

  // Componenet Properties
  @Input()
  public city: string;

  public chartOptions = {
    responsive: true
  };
  public chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];
  public chartLabels = ['January', 'February', 'Mars', 'April'];
  public leaveScreen: boolean;

  // OnInit
  ngOnInit() {
    this.leaveScreen = false
  }

  // Function to come back to cities temperatures screen
  public goToCitiesTemperatures() {
    this.leaveScreen = true;
  }
}