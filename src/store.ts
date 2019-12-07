import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './reducers/files.reducer';

const store = configureStore({
  reducer: {
    files: filesReducer
  },
});

export default store;
