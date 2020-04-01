import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  _apiURI: string;

  constructor() {
    //this._apiURI = 'http://localhost:64147/api';
    this._apiURI = 'http://pvm-pto-01:5000/api';
    //this._apiURI = 'http://tui.ackdoc.ru/api';
  }

  getApiURI() {
    return this._apiURI;
  }
}
