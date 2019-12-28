import { configureStore } from '@reduxjs/toolkit';

import fileReducer from './reducers/file.reducer';
import foldersReducer from './reducers/folders.reducer';

const store = configureStore({
  reducer: {
    file: fileReducer,
    folders: foldersReducer
  },
});

export default store;
