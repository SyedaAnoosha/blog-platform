/*
Redux store for Scroll Space.
Configures the app's global state management.
*/

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});