import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'CityTemperature';
  public check = false;

  public showCities() {
    this.check = true;
  }

}
