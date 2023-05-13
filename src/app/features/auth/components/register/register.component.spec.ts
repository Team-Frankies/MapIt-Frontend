import { Token } from './../../../../models/auth.model';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterComponent, RequiredMessages } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/material/angular-material.module';
import { AuthService } from '../../auth.service';
import { LoginComponent } from '../login/login.component';
import { of, Observable } from 'rxjs';

class AuthServiceStub {
  register(): Observable<Token> {
    return of({ token: 'tokenJWT' });
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let email: FormControl;
  let firstname: FormControl;
  let lastname: FormControl;
  let password: FormControl;
  let passwordConfirm: FormControl;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'login', component: LoginComponent }
          ]
        ),
        HttpClientTestingModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    email = component.f.controls.email;
    firstname = component.f.controls.firstname;
    lastname = component.f.controls.lastname;
    password = component.f.controls.password;
    passwordConfirm = component.f.controls.passwordConfirm;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a register form', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should have required fields in the register form', () => {
    expect(component.hasError('email', 'email')).toEqual(RequiredMessages.email)
    expect(email?.hasError('required')).toBeTruthy();
    expect(firstname?.hasError('required')).toBeTruthy();
    expect(lastname?.hasError('required')).toBeTruthy();
    expect(component.hasError('password', 'password')).toEqual(RequiredMessages.password)
    expect(password?.hasError('required')).toBeTruthy();
    expect(component.hasError('passwordConfirm', 'passwordConfirm')).toEqual(RequiredMessages.passwordConfirm)
    expect(passwordConfirm?.hasError('required')).toBeTruthy();
  });

  it('should have a password validator that requires at least 6 characters, 1 uppercase letter, and 1 number', () => {
    const passwordControl = component.f.controls.password;
    passwordControl.setValue('invalid');
    expect(passwordControl.hasError('requirements')).toBeTruthy();
    passwordControl.setValue('Valid1');
    expect(passwordControl.hasError('requirements')).toBeFalsy();
  });

  it('should have a passwordsMatching validator that requires password and passwordConfirm fields to match', () => {
    const passwordControl = component.f.controls.password;
    const passwordConfirmControl = component.f.controls.passwordConfirm;
    passwordControl.setValue('Valid1');
    passwordConfirmControl.setValue('Invalid');
    expect(component.f.hasError('passwordsNotMatching')).toBeTruthy();
    passwordConfirmControl.setValue('Valid1');
    expect(component.f.hasError('passwordsNotMatching')).toBeFalsy();
  });

  it('should call register method on submit if the form is valid', fakeAsync(() => {
    spyOn(component, 'register').and.callThrough();
    expect(component.f.valid).toBeFalsy()
    component.registerForm.controls.email.setValue('validmail@test.es')
    component.registerForm.controls.firstname.setValue('Firstname')
    component.registerForm.controls.lastname.setValue('Lastname')
    component.registerForm.controls.password.setValue('Pass1234')
    component.registerForm.controls.passwordConfirm.setValue('Pass1234')
    expect(component.f.valid).toBeTruthy()
    component.register()
    tick(2000);
    expect(component.register).toHaveBeenCalled();
  }));

});
