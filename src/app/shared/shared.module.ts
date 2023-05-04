import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/material/angular-material.module';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    StoreModule.forRoot({}, {})
  ],
  exports: [ AngularMaterialModule ]
})
export class SharedModule { }
