import React, { createContext, useState, useEffect } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './ShowFilePage.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { fetchFile } from '../../reducers/file.reducer';

export const Context = createContext({});

const ShowFilePage = (props) => {
  const { id } = props.match.params;
  const [parser, setParser] = useState(new MarkdownIt())

  useEffect(() => {
    props.fetchFile(id)
  }, [0])

  return (
    <>
      <div style={{ width: '90vw', height: '90vh' }}>
        <ReactMarkdown source={props.file.content} />
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  fetchFile: (id) => dispatch(fetchFile(id))
 })

export default connect(mapStateToProps, mapDispatchToProps)(ShowFilePage);