import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '' , redirectTo: 'mapa', pathMatch: 'full'},
{
  path: 'mapa',
  loadChildren: () =>
    import('./features/mapa/mapa.module').then((m) => m.MapaModule),
},];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
