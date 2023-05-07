import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class mapService {
apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMap(coordinates: any){
    const{x,y} = coordinates;
    return this.http.post(`${this.apiUrl}/location/coords`,{
        x,
        y
    })

  }
}