import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
    createFile(state, action) {
      return action.payload;
    },
  }
})
// Extract the action creators object and the reducer
const { actions, reducer } = filesSlice;
// Extract and export each action creator by name
export const { createFile } = actions
// Export the reducer, either as a default or named export
export default reducer