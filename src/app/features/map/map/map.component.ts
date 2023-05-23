import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MarkersService } from '../services/markers.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { PlacesService } from '../services/places.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingHarness } from '@angular/router/testing';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{
  @ViewChild(MapInfoWindow, { static: false })info!: MapInfoWindow;
  @Input() address?:  google.maps.LatLngLiteral;

  sizeMap = 'w-full';
  infoContent: string[] =[]
  place?: any | google.maps.Marker ;
  PlaceDetail?: google.maps.Marker ;
  infoSite= false;

  center={lat: 40.41, lng: -3.7};
  zoom = 15;
  openMap = false;
  
  apiLoaded: Observable<boolean> | undefined;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markers: any[] = [];
  marker:any;

  display: google.maps.LatLngLiteral = {lat: 40.41, lng: -3.7}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

  constructor(private httpClient: HttpClient,private markerService: MarkersService, private infoPlace: PlacesService, private readonly geolocation$: GeolocationService, public snackBar: MatSnackBar){
    
    
    this.getMap()
    this.getUserLocation()
   

  }

  /*******************generando mapa***************************/
  getMap(){
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}&libraries=places`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );   
  }

  
//*******************eventos de ratón************************/
//mapa
  moveMap(event: google.maps.MapMouseEvent) {
    if(!this.infoSite){
    this.center = (event?.latLng?.toJSON()) || this.center;
    this.setMarkers();}
    else{
     this.closeInfoSite();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event?.latLng?.toJSON() || this.display;

  }
//obtener información de marker
  infoMarker(markerElem: MapMarker, marker: any){
    console.log("marker: ")
    console.log(marker)

    console.log("id place: " + marker.place_id)
    this.infoPlace.getDataPlace(marker.place_id).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => { console.log("elem"), console.log(elem[1].address_components), this.setInfoMarker(elem[1], markerElem)})
      //this.setInfoMarker(data, markerElem)
      })

   // this.info.open(markerElem)
  }

  //********************* generación de markers**********************************/
  setMarkers(){

    this.markers=[]
    this.markerService.getMap(this.display).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => {elem.map((e: any) => {this.markers.push(e as google.maps.Marker)})
      })
     })     
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event?.latLng?.toJSON()){
    this.markers.push(event.latLng.toJSON());}
  }

  //********************* actualización de información **********************************/

  //geolocallización de usuario
  getUserLocation(){
    this.geolocation$.pipe(take(1)).subscribe(position =>  {
      this.center={lat: position.coords.latitude, lng: position.coords.longitude}
      , this.display=this.center; this.setMarkers(), this.openMap =true}, (error: GeolocationPositionError) =>{this.setMarkers(),  this.openMap =true, this.snackBar.open('Ubicación no disponible', undefined, {
        duration:400
      })});
  }

  //actualiza informacion de punto
  setInfoMarker(place: any, markerElem: MapMarker){
    console.log(place)
    this.place = place;
    if(place != null){
      this.placeSetInfo();
      this.info.open(markerElem)
     }
  
  }

  closeInfoMarker(){
    this.info.close();
  }

  //actualiza mapa con el buscador de direcciones
  recieveLatLng($event: any) {

    this.center = $event
    this.display = $event
    this.setMarkers()
  }

  //********************* generando información para map-info-window **********************************/
  //metemos todos los datos en un array

  placeSetInfo(){
    this.infoContent =[]

    //this.infoContent =  this.place.address_components;

    this.place.address_components.forEach((element: any) => {
      this.infoContent.push(element.long_name)
    });
   
    //evitamos que provincia, region y/o localidad sean igual
    if(this.infoContent[this.infoContent.length-3].includes(this.infoContent[this.infoContent.length-4])){
      this.infoContent[this.infoContent.length-3] = ""
    }
    if(this.infoContent[this.infoContent.length-4] == this.infoContent[this.infoContent.length-5]){
      this.infoContent[this.infoContent.length-5] = ""
    }

      }


  //********************* ventana emergente **********************************/
  //abrir ventana emergente
  showInfoSite(marker: any){
    this.marker=marker;
    this.infoSite = true;
  }

  //cerrar ventana emergente
  closeInfoSite(){
    this.infoSite = false;
    this.sizeMap = 'w-full';
  }

}





