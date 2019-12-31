import React, { createContext, useState, useEffect } from 'react';
import locations from '../../routes';
import { connect } from 'react-redux';
import {
  fetchFile,
  createFile,
  updateFile,
  deleteFile,
} from '../../reducers/file.reducer';

import {
  createFolder,
  listFolders,
  deleteFolder
} from '../../reducers/folders.reducer'

import EditorPage from '../../components/EditorPage';

export const Context = createContext({});

const EditFilePage = (props) => {
  const { file, match } = props;
  const { id } = match.params;

  useEffect(() => {
    if (id && !file.id) {
      props.fetchFile(id);
    }
  }, [file.id])

  useEffect(() => {
    props.listFolders();
  }, [])


  return (
    <EditorPage
      id={id}
      {...props}
    />
  )
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  deleteFile: (id) => dispatch(deleteFile(id)),
  deleteFolder: (id) => dispatch(deleteFolder(id)),
  fetchFile: (id) => dispatch(fetchFile(id)),
  createFile: (file) => dispatch(createFile(file)),
  updateFile: (id, name, content) => dispatch(updateFile(id, name, content)),
  createFolder: (folder) => dispatch(createFolder(folder)),
  listFolders: () => dispatch(listFolders())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFilePage);
