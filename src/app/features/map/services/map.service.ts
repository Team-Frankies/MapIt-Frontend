import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getMap(){
    return this.http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}&libraries=places`, 'callback')
    ;  
    
   
  }

}
