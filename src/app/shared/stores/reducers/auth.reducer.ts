import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface State {
  loggedIn: boolean
}

export const initialState: State = {
  loggedIn: false,
};

export const authReducer = createFeature({
  name: 'Auth',
  reducer: createReducer<State>(
    initialState,
    on(AuthActions.login, (state) => ({
      ...state,
      loggedIn: true,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      loggedIn: false,
    })),
  ),
});

