import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  apiUrl = environment.apiUrl;
  constructor (private http: HttpClient) { }

  getDataPlace(placeId: any){
    
      return this.http.get(`${this.apiUrl}/places/`+ placeId)
    }
  
}
