import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class ApiServices {
  private subject = new Subject<any>();
  public notifications$ = this.subject.asObservable();
  private _URL: string;
  private apiKey = '&units=metric&APPID=3ac17d3a731c0102bbc7694c0e2c5f96';

  constructor(private _http: HttpClient) {
    this._URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  }

  // Service to get cities temperatures
  public getTemperatures(city: string): Observable<any> {
    return this._http.get(`${this._URL}${city}${this.apiKey}`);
  }

  public emit(notification) {
    this.subject.next(notification);
  }

  public addZero(number) {
    if (number < 10 && number !== 0) {
      return '0' + number;
    } else {
      return number;
    }
  }
}