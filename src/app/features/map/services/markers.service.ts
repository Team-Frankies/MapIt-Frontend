import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMap(coordinates: google.maps.LatLngLiteral){
  return this.http.post(`${this.apiUrl}/maps/location/coords`, coordinates)

  }
}