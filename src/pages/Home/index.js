import React, { createContext, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import styles from './Home.module.scss';
import { NavLink } from 'react-router-dom';
import locations from '../../routes';
import ReactMarkdown from 'react-markdown';

export const Context = createContext({});

const MOCK_DATA = `
# Dillinger

![N](https://upload.wikimedia.org/wikipedia/pt/6/6f/Donald.png)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

  - Type some Markdown on the left
  - See HTML in the right
  - Magic

# New Features!

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)


You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop markdown and HTML files into Dillinger
  - Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]
`
const Home = () => {
  const [publish, setPublish] = useState(false);
  const [text, setText] = useState(MOCK_DATA);
  const [parser, setParser] = useState(new MarkdownIt())

  if (publish) {
    return (
      <>
      <div style={{ textAlign: 'right', width: '90vw', marginBottom: '20px', marginTop: '20px' }}>
        <button onClick={() => setPublish(false)} className={styles.btn}>
         Edit 
         </button>
      </div>
      <div style={{ width: '90vw', height: '90vh' }}>
        <ReactMarkdown source={text} />
      </div>
      </>
    )
  }

  return (
    <>
      <div style={{ textAlign: 'right', width: '90vw', marginBottom: '20px', marginTop: '20px' }}>
        <button onClick={() => setPublish(true)} className={styles.btn}>
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



export default Home;
