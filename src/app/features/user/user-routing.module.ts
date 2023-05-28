import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuardFn } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuardFn],
    // canActivateChild: [authGuardFn],
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: ':id',
        component: ProfileComponent,
        data: { title: 'User Profile', mode: 'edit' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
