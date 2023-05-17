import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MarkersService } from '../services/markers.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  @ViewChild(MapInfoWindow, { static: false })info!: MapInfoWindow;
  @Input() address?:  google.maps.LatLngLiteral;

  sizeMap = 'w-full';
  infoContent = '';
  place?: any | google.maps.Marker ;
  infoSite= false;


  apiLoaded: Observable<boolean>;

  center={lat: 40.41, lng: -3.7};
  zoom = 15;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markers: any[] = [];

  //coordinates= {lat: 50, lng: 14};
  display: google.maps.LatLngLiteral = {lat: 40.41, lng: -3.7}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

  constructor(private httpClient: HttpClient,private markerService: MarkersService, private infoPlace: PlacesService){
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}&libraries=places`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );

  }


  ngOnInit(){
    this.setMarkers();

  }

  

//*******************eventos de ratón************************/
//mapa
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(event)
    this.infoSite = false;
    this.sizeMap = 'w-full';
    this.center = (event?.latLng?.toJSON()) || this.center;
    this.setMarkers();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event?.latLng?.toJSON() || this.display;

  }
//marcadores
  infoMarker(markerElem: MapMarker, marker: any){
  
    this.infoPlace.getDataPlace(marker.place_id).subscribe({ 
      next:  (data)=>  {this.setInfoMarker(data, markerElem)}
      })

    this.setInfoMarker(marker, markerElem);   
   // this.info.open(markerElem)
  }

  showInfoSite(marker: any){
    this.infoSite = true;
    this.sizeMap = 'w-2/3';
  }



  //********************* generación de markers**********************************/
  setMarkers(){

    this.markers=[]
    this.markerService.getMap(this.display).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => {elem.map((e: any) => {this.markers.push(e as google.maps.Marker)})
      })
     })
     console.log('markers')
     console.log(this.markers)

     
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event?.latLng?.toJSON()){
    this.markers.push(event.latLng.toJSON());}
  }

  //********************* actualización de información **********************************/

  placeToString(){

    /**div jstcache="2">  <div class="address"> <div jstcache="3" class="title full-width" jsan="7.title,7.full-width">Shoko Madrid</div><div jstcache="4" jsinstance="0" class="address-line full-width" jsan="7.address-line,7.full-width">C. de Toledo, 86</div><div jstcache="4" jsinstance="1" class="address-line full-width" jsan="7.address-line,7.full-width">28005 Madrid</div><div jstcache="4" jsinstance="*2" class="address-line full-width" jsan="7.address-line,7.full-width">España</div> </div> </div> */
   /* return `<div class="address"><div jstcache="3" class="title full-width" jsan="7.title,7.full-width">${this.place.name}</div> 
    <div jstcache="4" jsinstance="0" class="address-line full-width" jsan="7.address-line,7.full-width">${this.place.formatted_address}</div>
    <div jstcache="4" jsinstance="*2" class="address-line full-width" jsan="7.address-line,7.full-width">estrellas: ${this.place.rating}</div> </div> </div> 
    `;*/

    return `${this.place.name},  ${this.place.formatted_address}, estrellas: ${this.place.rating}`;
  }

  //actualiza ventana emergente
  setInfoMarker(place: any, markerElem: MapMarker){
   
    
      this.place = place;
      console.log(place);
      this.infoContent = this.placeToString()
      this.info.open(markerElem)
  
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
  


}





