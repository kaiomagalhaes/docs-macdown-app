import { configureStore } from '@reduxjs/toolkit';

import filesReducer from './reducers/files.reducer';
import fileReducer from './reducers/file.reducer';
import foldersReducer from './reducers/folders.reducer';

const store = configureStore({
  reducer: {
    file: fileReducer,
    files: filesReducer,
    folders: foldersReducer
  },
});

export default store;
