import { createSlice } from '@reduxjs/toolkit';
import { listFiles } from './files.reducer';

const URL = 'https://docs-macdown-api.herokuapp.com/files';

const filesSlice = createSlice({
  name: 'file',
  initialState: {},
  reducers: {
    getFile(state, action) {
      return action.payload;
    }
  }
})

export const fetchFile = (id) => async dispatch => {
  const file = await fetch(`${URL}/${id}`)
    .then(data => data.json())
    
  dispatch(getFile(file))
}


// Extract the action creators object and the reducer
const { actions, reducer } = filesSlice;
// Extract and export each action creator by name
const { getFile } = actions;

export const createFile = (name, content) => async dispatch => {
  console.log(name, content)
  const file = await fetch(URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      name
    })
  }).then(data => data.json());

  dispatch(getFile(file))
  dispatch(listFiles())
};

export const updateFile = (id, name, content) => async dispatch => {
  const file = await fetch(`${URL}/${id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      name
    })
  }).then(data => data.json());

  dispatch(getFile(file))
  dispatch(listFiles())
};
// Export the reducer, either as a default or named export
export default reducer