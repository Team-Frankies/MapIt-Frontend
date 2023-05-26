import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MapRoutingModule } from './map-routing.module';
import { InfoWindowComponent } from './info-window/info-window.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/modules/material/angular-material.module';

@NgModule({
  declarations: [
    MapComponent,
    SearchBarComponent,
    InfoWindowComponent,

  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MapRoutingModule,
    AngularMaterialModule
  ],
  exports: [
    RouterModule
  ]
})
export class MapModule { }
