import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TemperaturesComponent } from './modules/temperatures/temperatures.component';

import { ApiServices } from './services/temperatures.services';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TemperaturesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
