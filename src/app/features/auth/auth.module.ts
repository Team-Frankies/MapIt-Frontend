import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
