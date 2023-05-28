import { createAction, props } from '@ngrx/store';

const login = createAction(
  '[Auth Component] Login',
  props<{ loggedIn: boolean }>()
);
const logout = createAction(
  '[Auth Component] Logout',
  props<{ loggedIn: boolean }>()
);

export const AuthActions = {
  login,
  logout
};
