import { createSlice } from '@reduxjs/toolkit';
import { listFolders } from './folders.reducer';
import axiosInstance from "../axiosInstance";

const BASE_PATH = `documents`;

const filesSlice = createSlice({
  name: 'file',
  initialState: {},
  reducers: {
    getFile(state, action) {
      return action.payload;
    }
  }
});

export const fetchFile = (id) => async dispatch => {
  const response = await axiosInstance.get(`${BASE_PATH}/${id}`)
  dispatch(getFile(response.data))
};

// Extract the action creators object and the reducer
const { actions, reducer } = filesSlice;
// Extract and export each action creator by name
const { getFile } = actions;

export const createFile = ({ content, name, folder_id }) => async dispatch => {
  const response = await axiosInstance.post(`admin/${BASE_PATH}`, { document: {
      content,
      name,
      folder_id
    }});

  dispatch(getFile(response.data));
  dispatch(listFolders())
};

export const updateFile = (id, name, content) => async dispatch => {
  const response = await axiosInstance.patch(`admin/${BASE_PATH}/${id}`, {document: {
    content,
    name,
  }});

  dispatch(getFile(response.data));
  dispatch(listFolders())
};
// Export the reducer, either as a default or named export
export default reducer
