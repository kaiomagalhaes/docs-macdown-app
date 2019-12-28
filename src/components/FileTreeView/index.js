import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

import './FileTreeView.scss';

export const Context = createContext({});

const FileTreeView = (props) => {
  const [addAsFirstChild, setAddAsFirstChild] = useState(false)

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const { folders } = props;

  const getFolderWithChildren = folder => ({
    ...folder,
    title: folder.name,
    expanded: true,
    children: folder.documents.map(doc => ({ ...doc, title: doc.name }))
  })

  const treeData = folders.map(getFolderWithChildren);

  return (
    <SortableTree
      onChange={() => { }}
      theme={FileExplorerTheme}
      treeData={treeData}
      canDrag={false}
      generateNodeProps={({ node, path }) => ({
        onClick: () => props.onSelectFile(node),
        buttons: [
          <button
            onClick={() => {
              props.createFile('New document')
            }}
          >
            New Doc
                </button>
          ,

          node.title === 'docs' ?
            <button
              onClick={() => props.createFolder('Test folder')}
            > New Folder</button> : null
        ],
      })}
    />
  )
}

export default FileTreeView;