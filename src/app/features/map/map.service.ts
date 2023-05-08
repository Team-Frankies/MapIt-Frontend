import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMap(coordinates: google.maps.LatLngLiteral){
    const{lat,lng} = coordinates;
    return this.http.post(`${this.apiUrl}/maps/location/coords`,{
        lat,
        lng
    })

  }
}
