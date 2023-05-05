
import { RouterModule, Routes } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
      component: MapComponent,
      /*children: [
        {
          path: '',
          component: SearchBarComponent,
        },
        
      ],*/
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:  [RouterModule],
})

export class MapRoutingModule{}