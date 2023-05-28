import { AuthService } from './../../../features/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthActions } from '../../stores/actions/auth.actions';
import { fromAuth } from '../../stores/selectors/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appTitle = 'MapIt';
  theme = false;
  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    this.loggedIn$ = this.store.select(fromAuth.isLoggedIn);
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
    }
  }

  toggleTheme() {
    this.theme = !this.theme;
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
    this.store.dispatch(AuthActions.logout({ loggedIn: false }));
    this.router.navigate(['/auth']);
  }
}
