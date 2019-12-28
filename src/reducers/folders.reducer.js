import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../axiosInstance";

const BASE_PATH = `folders`;

const foldersSlice = createSlice({
  name: 'folder',
  initialState: [],
  reducers: {
    getFolders(state, action) {
      return action.payload;
    }
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = foldersSlice;
// Extract and export each action creator by name
const { getFolders } = actions;

export const listFolders = () => async dispatch => {
  const response = await axiosInstance.get(BASE_PATH)
  dispatch(getFolders(response.data))
}

export const createFolder = ({ name }) => async dispatch => {
  await axiosInstance.post(`admin/${BASE_PATH}`, { folder: { name } })
  dispatch(listFolders())
};

// export const updateFolder = (id, name, content) => async dispatch => {
//   const folder = await fetch(`${URL}/${id}`, {
//     method: 'PATCH',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       content,
//       name
//     })
//   }).then(data => data.json());
//
//   dispatch(getFolder(folder))
//   dispatch(listFolders())
// };
// Export the reducer, either as a default or named export
export default reducer
