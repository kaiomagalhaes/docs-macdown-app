import { createSlice } from '@reduxjs/toolkit';

const URL = 'https://docs-macdown-api.herokuapp.com/files';

const filesSlice = createSlice({
  name: 'file',
  initialState: [],
  reducers: {
  }
})

export const fetchFile = () => async dispatch => {
  const files = await fetch(URL)
    .then(data => data.json())
    .then(a => a);

  return files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
}

export const createFile = (content) => async dispatch => {
  const file = await fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      name: 'nice name'
    })
  }).then(data => data.json());

  return file;
};

// Extract the action creators object and the reducer
const { actions, reducer } = filesSlice;
// Extract and export each action creator by name
// Export the reducer, either as a default or named export
export default reducer