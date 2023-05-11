import { AuthService } from './../../../features/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from '../../stores/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  appTitle = 'HelpDesk';
  theme = false;
  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<{ loggedIn: boolean }>,
    private router: Router,
    private authService: AuthService
  ) {
    this.loggedIn$ = store.select('loggedIn');
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth']);
    }
  }

  toggleTheme() {
    //console.log(this.theme);
    this.theme = !this.theme;
    //console.log(this.theme);
    this.setTheme(this.theme);
  }

  private setTheme(darkTheme: boolean) {
    const lightClass = 'light-theme';
    const darkClass = 'dark-theme';
    const removeClass = darkTheme ? lightClass : darkClass;
    const addClass = darkTheme ? darkClass : lightClass;
    document.body.classList.remove(removeClass);
    document.body.classList.add(addClass);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
