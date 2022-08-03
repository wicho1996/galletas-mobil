import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import clientsReducer from '../features/clients/clients';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
  },
});
