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

  center={lat: 50, lng: 14};
  zoom = 10;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  //iPoints?: any;
  iPoints: IPlace[] = [];
 


  //coordinates= {lat: 50, lng: 14}; 
  display?: google.maps.LatLngLiteral = {lat: 50, lng: 14}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

  constructor(private httpClient: HttpClient, private mapServ: mapService){
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
    
  }
/**************************** 
  
  this.mapServ.getMap(this.display).subscribe({
    next: data: Point[] => {
      data.map(elem: Point => this.iPoints.push(elem))
    }
  })
/************************************************ */
  async ngOnInit(){
    var puntos: any[] = [];
    //console.log(typeof this.iPoints)
    var funcion = await this.mapServ.getMap(this.display).subscribe({ 
      next:  (data)=>   Object.entries(data).map((elem: any) => { puntos.push(elem); //console.log(elem)
      })
      })
/*
      console.log("variable iPoints")
      console.log({puntos})
      /*console.log(typeof puntos)
      console.log(puntos.length)*/

     /* for(let element of Object.entries(this.iPoints).map((elem: any)=> console.log(elem))){
        console.log(".")
        console.log(element)
      }
*/


      /*this.iPoints.forEach(element => {
        console.log(".")
       console.log(element)
        
      });*/

      //Object.entries(element).map((elem: any) => console.log(elem))
      
      //next: (data)=>  this.iPoints = data as IPlace[],
      //data.map((elem: any) => this.iPoints.push(elem))
      //this.iPoints.push(data)
    //this.iPoints = data

    /*this.mapServ.getMap(this.display).subscribe({
  next: data: object[] => {
    data.map(elem => this.iPoints.push(elem))
  }
})*/
     
     // })
    /* 
    
    this.iPoints.forEach(element => {
      
      console.log(element)
      /*console.log('i')
      console.log(element)
      if(element === MapComponent){
        this.markerPositions.push(element.getCoordinates)
      }*/
      //console.log(element)
    
   // });

/*console.log('markers')
console.log(this.markerPositions)
*/

   
  }
//*******************eventos de ratón************************/
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(event)
    this.center = (event?.latLng?.toJSON()) || this.center;
  }

  move(event: google.maps.MapMouseEvent) {
 
    this.display = event?.latLng?.toJSON();
  }


  //*********************markers**********************************/

  setMarkers(mPoints: any[]){

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



