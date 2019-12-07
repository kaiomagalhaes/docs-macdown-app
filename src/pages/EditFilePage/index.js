import React, { createContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './EditFilePage.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { fetchFile, createFile, updateFile } from '../../reducers/file.reducer';
import { MOCK_DATA } from './mock.data';

export const Context = createContext({});

const EditFilePage = (props) => {
  const { id } = props.match.params;
  const [text, setText] = useState(MOCK_DATA);
  const [parser, setParser] = useState(new MarkdownIt())
  const { file } = props;

  useEffect(() => {
    if (id && !file.id) {
      props.fetchFile(id);
    } else if(file.id) {
      setText(file.content);
      props.history.push(`/files/${file.id}/edit`)
    }
  }, [file.id])

  return (
    <>
      <div style={{ textAlign: 'right', width: '90vw', marginBottom: '20px', marginTop: '20px' }}>
        <Link style={{ marginRight: '20px', display: id ? 'inline-block' : 'none' }}className={styles.btn} to={`/files/${file.id}`}>See Online</Link>
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
      <div style={{ height: '90vh', width: '90vw' }}>
        <MdEditor
          value={text}
          renderHTML={(text) => parser.render(text)}
          onChange={(p) => setText(p.text)}
        />
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  fetchFile: (id) => dispatch(fetchFile(id)),
  createFile: (content) => dispatch(createFile(content)),
  updateFile: (id, content) => dispatch(updateFile(id, content)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFilePage);