import { Component, OnInit } from '@angular/core';
import { mapService } from '../map.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  apiLoaded: Observable<boolean>;

  center={lat: 40, lng: -3};
  zoom = 15;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  //coordinates= {lat: 50, lng: 14}; 
  display?: google.maps.LatLngLiteral = {lat: 40, lng: -3}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

  constructor(private httpClient: HttpClient, private mapServ: mapService){
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );

    
  }

  ngOnInit(){
    this.setMarkers();
   
  }
//*******************eventos de ratón************************/
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(event)
    this.center = (event?.latLng?.toJSON()) || this.center;
    this.setMarkers();
   
  }

  move(event: google.maps.MapMouseEvent) {
 
    this.display = event?.latLng?.toJSON();
  }


  //*********************markers**********************************/
  setMarkers(){
    this.markerPositions=[]
    this.mapServ.getMap(this.display).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => {elem.map((e: any) => {this.markerPositions.push(e.location); console.log(e)})
      })
     })
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event?.latLng?.toJSON()){
    this.markerPositions.push(event.latLng.toJSON());}
  }


}

interface IPlace {
  location: google.maps.LatLngLiteral;
  place_id: string;
}



