import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  //public globalPath: string = 'http://localhost:4000';
  public globalPath: string = 'https://express.webtify.dk';

  constructor() {}
}
