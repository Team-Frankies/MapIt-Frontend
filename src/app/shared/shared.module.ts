import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/material/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './stores/reducers/auth.reducer';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    StoreModule.forRoot({ loggedIn: authReducer })
  ],
  exports: [AngularMaterialModule, NavbarComponent ]
})
export class SharedModule { }
