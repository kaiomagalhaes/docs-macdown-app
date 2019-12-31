import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './EditFilePage.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import { fetchFile, createFile, updateFile, deleteFile } from '../../reducers/file.reducer';
import { MOCK_DATA } from './mock.data';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import FileTreeView from '../../components/FileTreeView';
import Navbar from '../../components/Navbar';
import { TextField, Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

import {
  createFolder,
  listFolders
} from '../../reducers/folders.reducer'

export const Context = createContext({});

const EditFilePage = (props) => {
  const { file, match } = props;
  const { id } = match.params;
  const [parser, setParser] = useState(new MarkdownIt())

  const getDefaultFile = (folderId) => ({
    id: undefined,
    content: MOCK_DATA,
    folderId,
    name: 'Your file name'
  })

  const [editingFile, setEditingFile] = useState(getDefaultFile())

  useEffect(() => {
    if (id && !file.id) {
      props.fetchFile(id);
    } else if (file.id) {
      selectFile(file)
    }
  }, [file.id])

  const selectFile = (file) => {
    setEditingFile(file)
    props.history.push(`/files/${file.id}/edit`)
  }


  useEffect(() => {
    props.listFolders();
  }, [])

  const navbarButtons = [
    {
      title: 'See Online',
      href: locations.getShowFilePath(editingFile.id),
      type: 'link',
      show: editingFile.id
    },
    {
      title: 'Save',
      onClick: () => {
        if (id) {
          props.updateFile(id, editingFile)
        } else {
          props.createFile(editingFile)
        }
      },
      type: 'button',
      show: true
    },
  ]

  return (
    <>
      <Navbar buttons={navbarButtons} />
      <div style={{ display: 'flex' }}>
        <div className={styles['tree-container']}>
          <div className={styles['title-container']}>
            <span className={styles.title}>Documents</span>
            <FontAwesomeIcon className={styles.icon} icon={faFolderPlus} onClick={() => {
              props.createFolder({
                name: 'New Folder'
              })
            }}
            />
          </div>
          <FileTreeView
            deleteFile={props.deleteFile}
            folders={props.folders.all}
            createFile={(folderId) => {
              console.log('creating file', folderId)
              const file = getDefaultFile(folderId);
              props.createFile({
                ...file,
                folder_id: folderId
              })
              setEditingFile(file)
            }}
            onSelectFile={selectFile}
          />
        </div>
        <div className={styles['editor-container']}>
          <TextField
            label="File name"
            value={editingFile.name}
            onChange={(e) => setEditingFile({...editingFile, name: e.target.value})}
          />
          <MdEditor
            value={editingFile.content}
            renderHTML={(text) => parser.render(text)}
            onChange={(p) => setEditingFile({...editingFile, content: p.text})}
          />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  deleteFile: (id) => dispatch(deleteFile(id)),
  fetchFile: (id) => dispatch(fetchFile(id)),
  createFile: (file) => dispatch(createFile(file)),
  updateFile: (id, name, content) => dispatch(updateFile(id, name, content)),
  createFolder: (folder) => dispatch(createFolder(folder)),
  listFolders: () => dispatch(listFolders())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFilePage);
