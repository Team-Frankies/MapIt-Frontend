import { Component, Input, ViewChild } from '@angular/core';
import { MarkersService } from '../services/markers.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { PlacesService } from '../services/places.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaceInterface } from '../ifaces';
import { MapService } from '../services/map.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{
  @ViewChild(MapInfoWindow, { static: false })info!: MapInfoWindow;
  @Input() address?:  google.maps.LatLngLiteral;

  infoContent: string[] =[]
  place!: PlaceInterface | undefined ;

  center={lat: 40.41, lng: -3.7};
  zoom = 15;
  openMap = false;
  
  apiLoaded: Observable<boolean> | undefined;
  mapLoaded: Observable<boolean> | undefined;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markers: any[] = [];
  marker:any;

  display: google.maps.LatLngLiteral = {lat: 40.41, lng: -3.7}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

    //variables de ventana emergente
    idPlaceInfoWindow?: string | any;
    placeInfoWindow?: PlaceInterface | any;
    infoSite= false;

  constructor(private httpClient: HttpClient,private mapService: MapService, private markerService: MarkersService, private infoPlace: PlacesService, private readonly geolocation$: GeolocationService, public snackBar: MatSnackBar){
    
    this.getUserLocation()
    this.getMap()
    
    
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

  resizeMap(){
    console.log(1)
    this.zoom =0;
    this.zoom = 15;
  }
//obtener información de marker
  infoMarker(markerElem: MapMarker, marker: any){
    
    let auxPlace: PlaceInterface;

    console.log("id place: " + marker.place_id)
    this.infoPlace.getDataPlace(marker.place_id).subscribe({ 
      next: (data) => Object.entries(data).map ((elem:any) => {auxPlace = (elem[1] as PlaceInterface), console.log(auxPlace), this.setInfoMarker(auxPlace, markerElem)}), 
      error: (error) => {
        this.place=undefined;
      }
    
      });
    
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
      , this.display=this.center; this.setMarkers(), this.openMap =true}, (error: GeolocationPositionError) =>{this.setMarkers(),  this.openMap =true, this.getErrorMessage('Ubicación no disponible')
       
    });
  }

  //actualiza informacion de punto
  setInfoMarker(place: PlaceInterface, markerElem: MapMarker){
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
 
    if($event != undefined){
    this.resizeMap();
    this.center = $event
    this.display = $event
    
    this.setMarkers()}
    else{
      this.getErrorMessage('Ubicación no localizada')
    }
  }

  getErrorMessage(message: string){
    this.snackBar.open(message, undefined, {
      duration:400})
  }

  //********************* generando información para map-info-window **********************************/
  //metemos todos los datos en un array

  placeSetInfo(){
    this.infoContent =[]
    if(this.place){
    this.place.longName.forEach((element: any) => {
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
      }


  //********************* ventana emergente **********************************/
  //abrir ventana emergente
  showInfoSite(marker: any){
    if(this.place){
    this.idPlaceInfoWindow = marker.place_id;
    this.placeInfoWindow = this.place;
    this.infoSite = true;
    }
    else{
      this.getErrorMessage('lugar no localizado')
    }
  }

  //cerrar ventana emergente
  closeInfoSite(){
    this.infoSite = false;
  }

}





