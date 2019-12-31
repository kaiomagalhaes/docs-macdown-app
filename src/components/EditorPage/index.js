import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './EditorPage.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import { MOCK_DATA } from './mock.data';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import FileTreeView from '../../components/FileTreeView';
import Navbar from '../../components/Navbar';
import { TextField, Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

export const Context = createContext({});

const EditorPage = (props) => {
  const {
    file,
    id,
    history,
    listFolders,
    fetchFile,
    updateFile,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    folders
  } = props;

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
      fetchFile(id);
    } else if (file.id) {
      selectFile(file)
    }
  }, [file.id])

  const selectFile = (file) => {
    setEditingFile(file)
    history.push(`/files/${file.id}/edit`)
  }


  useEffect(() => {
    listFolders();
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
          updateFile(id, editingFile)
        } else {
          createFile(editingFile)
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
              createFolder({
                name: 'New Folder'
              })
            }}
            />
          </div>
          <FileTreeView
            deleteFile={deleteFile}
            deleteFolder={deleteFolder}
            folders={folders.all}
            createFile={(folderId) => {
              const file = getDefaultFile(folderId);
              createFile({
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
            onChange={(e) => setEditingFile({ ...editingFile, name: e.target.value })}
          />
          <MdEditor
            value={editingFile.content}
            renderHTML={(text) => parser.render(text)}
            onChange={(p) => setEditingFile({ ...editingFile, content: p.text })}
          />
        </div>
      </div>
    </>
  )
}

export default EditorPage;
