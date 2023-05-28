import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { authGuardFn } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuardFn],
    component: MapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
