import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';

export const initialState = false;

export const authReducer = createReducer(
  initialState,
  on(login, (state) => true),
  on(logout, (state) => false),
);
