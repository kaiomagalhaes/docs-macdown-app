import { createSlice } from '@reduxjs/toolkit';

const URL = `${process.env.REACT_APP_API_URL}/documents`;

const filesSlice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
    getFiles(state, action) {
      return action.payload;
    }
  }
})

const { actions, reducer } = filesSlice;
const { getFiles } = actions;

export const listFiles = () => async dispatch => {
  const files = await fetch(`${URL}`)
    .then(data => data.json())
    
  dispatch(getFiles(files))
}
// Extract the action creators object and the reducer
// Extract and export each action creator by name
// Export the reducer, either as a default or named export
export default reducer