import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './FileTreeView.module.scss';

import './FileTreeView.scss';

export const Context = createContext({});

const getNewDocBtn = (props, folder) => (
  <div className={styles['icon-container']}  onClick={() => {
      props.createFile(folder.id)
    }}>
    <span className={styles.plus}>+</span>
    <FontAwesomeIcon className={styles.icon} icon={faFile} />
  </div>
)

const getDeleteBtn = (props, node) => (
  <div className={styles['icon-container']}>
    <FontAwesomeIcon className={styles.icon} icon={faTrash} onClick={() => {
      if (node.folder) {
        props.deleteFolder(node.id)
      } else {
        props.deleteFile(node.id)
      }
    }}
    />
  </div>
)

const FileTreeView = (props) => {
  const [addAsFirstChild, setAddAsFirstChild] = useState(false)

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const { folders } = props;

  const getFolderWithChildren = folder => ({
    ...folder,
    title: folder.name,
    expanded: true,
    folder: true,
    children: folder.documents ? folder.documents.map(doc => ({ ...doc, title: doc.name })) : []
  })

  const treeData = folders.map(getFolderWithChildren);

  return (
    <SortableTree
      onChange={() => { }}
      theme={FileExplorerTheme}
      treeData={treeData}
      canDrag={false}
      generateNodeProps={({ node, path }) => ({
        onClick: () => !node.folder ? props.onSelectFile(node) : null,
        buttons: [
          node.folder ? getNewDocBtn(props, node) : null,
          getDeleteBtn(props, node)
        ],
      })}
    />
  )
}

export default FileTreeView;
