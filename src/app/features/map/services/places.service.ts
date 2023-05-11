import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  apiUrl = environment.apiUrl;
  constructor (private http: HttpClient) { }

  getDataPlace(coordinates: any){

    return this.http.post(`${this.apiUrl}/maps/:place_id`, coordinates)
  
    }
  
}
