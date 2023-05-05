import { Component, OnInit } from '@angular/core';
import { mapService } from '../map.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  //ejemplo

  center = {lat: 24, lng: 12};
  zoom = 15;
  display?: google.maps.LatLngLiteral;

  coordinates=  [50.055212613655925, 14.230025210187506];

  constructor(private mapServ: mapService){}
  
  ngOnInit(){
    this.mapServ.getMap(this.coordinates);
   console.log(this.coordinates)
  }

}



