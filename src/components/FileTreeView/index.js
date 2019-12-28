import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { Button } from "@material-ui/core";

import './FileTreeView.scss';

export const Context = createContext({});

const getNewDocBtn = (props, folder) => (
  <Button
    color="primary"
    size="small"
    onClick={() => {
      props.createFile(folder.id)
    }}
  >
    New Doc
  </Button>
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
        onClick: () => !node.folder ? props.onSelectFile(node): null,
        buttons: [
          node.folder ? getNewDocBtn(props, node): null
        ],
      })}
    />
  )
}

export default FileTreeView;
