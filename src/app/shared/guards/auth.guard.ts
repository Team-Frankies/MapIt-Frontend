import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from '@ngrx/store';

export const authGuardFn: CanActivateFn  = () => {
  const router = inject(Router);
  const store = inject(Store);
  const isLoggedIn =  store.select('loggedIn');
  return !isLoggedIn ? router.navigate(['/auth/login']) : true
}
