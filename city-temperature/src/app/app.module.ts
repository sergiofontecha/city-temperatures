import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TemperaturesComponent } from './components/temperatures/temperatures.component';
import { HistoricalComponent } from './components/historical/historical.component';

import { ApiServices } from './services/temperatures.services';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemperaturesComponent,
    HistoricalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [ApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
