import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  //apiUrl = environment.apiUrl;
  constructor (private http: HttpClient) { 
    
  }

  getPhotoPlace(photoReference: string){
    //return this.http.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${environment.googleAPIKey}`)
   
  }


  
}
