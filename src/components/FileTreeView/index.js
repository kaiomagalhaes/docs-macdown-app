import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

export const Context = createContext({});

const FileTreeView = (props) => {
  const [addAsFirstChild, setAddAsFirstChild] = useState(false)

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const files = [{ title: 'docs', expanded: true, children: props.files.map(file => ({ ...file, title: file.name })) }];
  const treeData = files

  return (
    <SortableTree
      onChange={() => { }}
      theme={FileExplorerTheme}
      treeData={treeData}
      canDrag={false}
      generateNodeProps={({ node, path }) => ({
        onClick: () => props.onSelectFile(node),
        buttons: [
          node.title === 'docs' ?
            <button
              onClick={() => {
                props.createFile('New document')
              }}
            >
              Create document
                </button> : null
        ],
      })}
    />
  )
}

export default FileTreeView;