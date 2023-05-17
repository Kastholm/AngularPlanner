//inject it to other compononents, so that they can use the data
//EventEmitter is used to emit an event when a month is added
import { Injectable } from '@angular/core';
//http request
import { HttpClient } from '@angular/common/http';
//An Observable is a way of handling asynchronous operations, like HTTP requests. It can emit multiple values over time.
import { Observable } from 'rxjs';
// global variables
import { GlobalService } from '../../services/global.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistService {
  //stores the fetched data
  private shoppingdata: any;
  // URL variable to store the base API URL
  private path: string;
  //inject the HttpClient
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.path = this.globalService.globalPath;
  }
  //Fetches data from the API with HTTP
  fetchShoppingData(): Observable<any> {
    return this.http.get(`${this.path}/shoppingdata`);
  }
  //Stores the fetched data in this service file
  setShoppingData(data: any) {
    this.shoppingdata = data;
    console.log('Shopping data set 1', this.shoppingdata);
    return this.shoppingdata;
  }
  // Function to retrieve the data in a component
  /* getShoppingData(): any {
    return this.shoppingdata;
  } */
  /* -------------------------------------------------------------------------- */
  /*                                 SHOP ROUTES                                */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                 Add an item                                */
  /*                          Used by: shopping-list                            */
  /* -------------------------------------------------------------------------- */
  addItem(name: string, description: any): Observable<any> {
    // Send the month name in the request body as a JSON object
    const body = { name: name, description: description };
    return this.http.post(`${this.path}/shoppingdata/addItem`, body);
  }
  /* -------------------------------------------------------------------------- */
  /*                              Delete an item                                */
  /*                          Used by: shopping-list                            */
  /* -------------------------------------------------------------------------- */
  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.path}/shoppingdata/deleteItem/${itemId}`);
  }
}
