import React, { createContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './EditFilePage.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import {Treebeard} from 'react-treebeard';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import { fetchFile, createFile, updateFile } from '../../reducers/file.reducer';
import { listFiles } from '../../reducers/files.reducer';
import { MOCK_DATA } from './mock.data';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';


export const Context = createContext({});

const firstNames = [
  'Abraham',
  'Adam',
  'Agnar',
  'Albert',
  'Albin',
  'Albrecht',
  'Alexander',
  'Alfred',
  'Alvar',
  'Ander',
  'Andrea',
  'Arthur',
  'Axel',
  'Bengt',
  'Bernhard',
  'Carl',
  'Daniel',
  'Einar',
  'Elmer',
  'Eric',
  'Erik',
  'Gerhard',
  'Gunnar',
  'Gustaf',
  'Harald',
  'Herbert',
  'Herman',
  'Johan',
  'John',
  'Karl',
  'Leif',
  'Leonard',
  'Martin',
  'Matt',
  'Mikael',
  'Nikla',
  'Norman',
  'Oliver',
  'Olof',
  'Olvir',
  'Otto',
  'Patrik',
  'Peter',
  'Petter',
  'Robert',
  'Rupert',
  'Sigurd',
  'Simon',
];

const EditFilePage = (props) => {
  const { id } = props.match.params;
  const [text, setText] = useState(MOCK_DATA);
  const [parser, setParser] = useState(new MarkdownIt())
  const { file } = props;

  const defaultState = [{ title: 'Peter Olofsson' }, { title: 'Karl Johansson' }]

  const [ treeData, setTreeData ] = useState(defaultState);
  const [ addAsFirstChild, setAddAsFirstChild ] = useState(false)

  const getNodeKey = ({ treeIndex }) => treeIndex;
  const getRandomName = () => firstNames[Math.floor(Math.random() * firstNames.length)];

  useEffect(() => {
    if (id && !file.id) {
      props.fetchFile(id);
    } else if(file.id) {
      setText(file.content);
      props.history.push(`/files/${file.id}/edit`)
    }
  }, [file.id])

useEffect(() => {
  props.listFiles();
  setTreeData([{title: 'docs', expanded: true, children: props.files.map(file => ({...file, title: file.name}))}])
}, [props.files.length])

  return (
    <>
      <div style={{ textAlign: 'right', width: '90vw', marginBottom: '20px', marginTop: '20px' }}>
        <Link style={{ marginRight: '20px', display: id ? 'inline-block' : 'none' }} className={styles.btn} to={`/files/${file.id}`}>See Online</Link>
        <button onClick={() => {
          if (id) {
            props.updateFile(id, text)
          } else {
            props.createFile(text)
          }
        }} className={styles.btn}>
          Publish
       </button>
      </div>
      <div style={{ display: 'flex' }}>

          <div style={{ height: '90vh', width: '15vw' }}>
            <SortableTree
              theme={FileExplorerTheme}
              treeData={treeData}
              onChange={treeData => setTreeData(treeData)}
              canDrag={false}
              generateNodeProps={({ node, path }) => ({
                buttons: [
                  node.title === 'docs' ? 
                  <button
                    onClick={() =>
                      setTreeData(
                        addNodeUnderParent({
                          treeData: treeData,
                          parentKey: path[path.length - 1],
                          expandParent: true,
                          getNodeKey,
                          newNode: {
                            title: 'new document',
                          },
                          addAsFirstChild: addAsFirstChild,
                        }).treeData
                      )
                    }
                  >
                    Create document
                </button> : null
                ],
              })}
            />
      </div>
        <div style={{ height: '90vh', width: '80vw' }}>
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
  listFiles: () => dispatch(listFiles()),
  fetchFile: (id) => dispatch(fetchFile(id)),
  createFile: (content) => dispatch(createFile(content)),
  updateFile: (id, content) => dispatch(updateFile(id, content)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFilePage);