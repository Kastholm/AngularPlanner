//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable, EventEmitter } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
//Transforms the values emitted by an observable by applying a function to each value
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoutingService{

  constructor(
    private route: ActivatedRoute,
  ) {
  }
}
