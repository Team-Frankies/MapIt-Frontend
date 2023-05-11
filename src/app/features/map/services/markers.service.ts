import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class markersService {
apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMarkers(coordinates: any){

  return this.http.post(`${this.apiUrl}/maps/location/coords`, coordinates)

  }

  
}