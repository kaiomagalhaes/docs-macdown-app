import { createSlice } from '@reduxjs/toolkit';

const URL = 'https://docs-macdown-api.herokuapp.com/files';

const filesSlice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = filesSlice;
// Extract and export each action creator by name
// Export the reducer, either as a default or named export
export default reducer