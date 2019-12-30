import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './EditFilePage.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { Treebeard } from 'react-treebeard';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import { fetchFile, createFile, updateFile } from '../../reducers/file.reducer';
import { MOCK_DATA } from './mock.data';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import FileTreeView from '../../components/FileTreeView';
import Navbar from '../../components/Navbar';
import { TextField, Button } from "@material-ui/core";

import {
  createFolder,
  listFolders
} from '../../reducers/folders.reducer'

export const Context = createContext({});

const EditFilePage = (props) => {
  const { id } = props.match.params;
  const [text, setText] = useState(MOCK_DATA);
  const [fileName, setFileName] = useState('')
  const [parser, setParser] = useState(new MarkdownIt())
  const { file } = props;

  useEffect(() => {
    if (id && !file.id) {
      props.fetchFile(id);
    } else if (file.id) {
      setText(file.content);
      setFileName(file.name)
      props.history.push(`/files/${file.id}/edit`)
    }
  }, [file.id])

  useEffect(() => {
    props.listFolders();
  }, [])

  const navbarButtons = [
    {
      title: 'See Online',
      href: `/files/${file.id}`,
      type: 'link',
      show: file.id
    },
    {
      title: 'Save',
      onClick: () => {
        if (id) {
          props.updateFile(id, fileName, text)
        } else {
          props.createFile(fileName, text)
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
            <Button color="secondary" onClick={() => {
              props.createFolder({
                name: 'New Folder'
              })
            }}>
              Create folder
            </Button>
          </div>
          <FileTreeView
            folders={props.folders.all}
            createFile={(folderId) => {
              props.createFile({
                name: 'New File',
                content: MOCK_DATA,
                folder_id: folderId
              })
              setText('')
              setFileName('New File')
            }}
            onSelectFile={(file) => {
              props.history.push(`/files/${file.id}/edit`)
              setText(file.content)
              setFileName(file.name)
            }}
          />
        </div>
        <div className={styles['editor-container']}>
          <TextField
            label="File name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <MdEditor
            value={text}
            renderHTML={(text) => parser.render(text)}
            onChange={(p) => setText(p.text)}
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
  fetchFile: (id) => dispatch(fetchFile(id)),
  createFile: (file) => dispatch(createFile(file)),
  updateFile: (id, name, content) => dispatch(updateFile(id, name, content)),
  createFolder: (folder) => dispatch(createFolder(folder)),
  listFolders: () => dispatch(listFolders())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFilePage);
