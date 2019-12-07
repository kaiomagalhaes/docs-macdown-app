import { configureStore } from '@reduxjs/toolkit';

import filesReducer from './reducers/files.reducer';
import fileReducer from './reducers/file.reducer';

const store = configureStore({
  reducer: {
    file: fileReducer,
    files: filesReducer,
  },
});

export default store;
