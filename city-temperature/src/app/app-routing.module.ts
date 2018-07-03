import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TemperaturesComponent } from './components/temperatures/temperatures.component';
import { HistoricalComponent } from './components/historical/historical.component';

const routes = [
  {path: 'home', component: HomeComponent, data: { title: 'Wellcome To Cities Temperatures' }},
  {path: 'temperatures', component: TemperaturesComponent, data: { title: 'Current Cities Temperatures' }},
  {path: 'historical/:city', component: HistoricalComponent, data: { title: '´s Historical Temperatures' }},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
export const routingComponents = [HomeComponent, TemperaturesComponent, HistoricalComponent];