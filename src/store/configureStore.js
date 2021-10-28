import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Root reducer
import reducer from './reducer';

// Custom middlewares
import api from './middleware/api';
// import logger from './middleware/logger';
// import toast from './middleware/toast';
// import func from './middleware/func';

// Store configuration
export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
}
