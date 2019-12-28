import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth.reducer';
import fileReducer from './reducers/file.reducer';
import foldersReducer from './reducers/folders.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
    folders: foldersReducer
  },
});

export default store;
