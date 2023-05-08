import { environment } from './../../../../environments/environment.development';
import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  apiLoaded: Observable<boolean>;
  //ejemplo

  center = { lat: 40.41, lng: -3.7 };;
  zoom = 10;
  display?: google.maps.LatLngLiteral;

  coordinates: google.maps.LatLngLiteral = { lat: 40.41, lng: -3.7 };;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  iPlaces: any;

  constructor(
    private mapServ: MapService,
    private httpClient: HttpClient
  ){
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(){
    this.mapServ.getMap(this.coordinates).subscribe({
      next: (data) => this.iPlaces = data,
    });
   console.log(this.coordinates)
  }

}



