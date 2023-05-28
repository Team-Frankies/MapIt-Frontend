import { createSelector } from '@ngrx/store';
import { authReducer } from '../reducers/auth.reducer';

const {
  selectLoggedIn,
} = authReducer;

const isLoggedIn = createSelector(
  selectLoggedIn,
  (loggedIn) => loggedIn === true
);

// export
export const fromAuth = {
  isLoggedIn,
};
