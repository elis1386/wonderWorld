import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  base_url: string = 'https://api-r3paoizkka-uc.a.run.app/api/v1';
  local_url: string = 'https:localhost:1337/api/v1';
}
