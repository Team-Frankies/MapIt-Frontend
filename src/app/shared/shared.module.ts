import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/material/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './stores/reducers/auth.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    StoreModule.forRoot({ loggedIn: authReducer })
  ],
  exports: [AngularMaterialModule ]
})
export class SharedModule { }
