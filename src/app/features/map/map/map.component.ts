import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { mapService } from '../map.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  @ViewChild(MapInfoWindow, { static: false })info!: MapInfoWindow;
  @Input() address?:  google.maps.LatLngLiteral;

  infoContent =''

  apiLoaded: Observable<boolean>;

  center={lat: 40.41, lng: -3.7};
  zoom = 15;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markers: any[] = [];

  //coordinates= {lat: 50, lng: 14}; 
  display?: google.maps.LatLngLiteral = {lat: 40.41, lng: -3.7}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

  constructor(private httpClient: HttpClient, private mapServ: mapService){
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}&libraries=places`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );

    console.log(3)
  }


  ngOnInit(){
    console.log(4)
    this.setMarkers();

  }

  

//*******************eventos de ratón************************/
//mapa
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(event)
    this.center = (event?.latLng?.toJSON()) || this.center;
    this.setMarkers();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event?.latLng?.toJSON();
   
  }
//marcadores
  infoMarker(markerElem: MapMarker, marker: any){
    console.log(this.infoContent)
    console.log(this.info)

    this.setInfoMarker(marker);   
    this.info.open(markerElem)
  }

  infoPosition(marker: any){

    console.log(marker)
  }


  //********************* generación de markers**********************************/
  setMarkers(){
    
    this.markers=[]
    this.mapServ.getMap(this.display).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => {elem.map((e: any) => {this.markers.push(e as google.maps.Marker)})
      })
     })

     console.log(this.markers)
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event?.latLng?.toJSON()){
    this.markers.push(event.latLng.toJSON());}
  }

  //********************* actualización de información **********************************/

  //actualiza ventana emergente
  setInfoMarker(marker: any){
    this.infoContent ="id: " + marker.place_id;
  }

  //actualiza mapa con el buscador de direcciones
  recieveLatLng($event: any) {

    console.log('event' + $event)
    console.log($event)
    this.center = $event
    this.display = $event
    this.setMarkers()
  }
  


}

 



