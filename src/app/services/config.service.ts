import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  base_url: string = 'http://localhost:1337/api/v1';
}
