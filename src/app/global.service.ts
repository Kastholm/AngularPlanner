import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public globalPath: string = 'http://localhost:4000';
  //public globalPath: string = 'http://192.168.87.155:27019';

  constructor() {}
}
