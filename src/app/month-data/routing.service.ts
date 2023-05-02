//Injects data to other components
import { Injectable } from '@angular/core';
//Listen to route parameter changes
import { ActivatedRoute } from '@angular/router';
//Emits a new value whenever the route parameters change
import { Observable } from 'rxjs';
//Transforms the values emitted by an observable by applying a function to each value
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private route: ActivatedRoute) { }

  getCurrentMonth(): Observable<string> {
    return this.route.params.pipe(map((params) => params['month']));
    
  }

  
}
