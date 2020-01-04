import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { TextField } from "@material-ui/core";
import styles from './EmptyEditor.module.scss';

const EmptyEditor = () => (
  <div className={styles.container}>
    <span>
      Your selected file or folder will appear here.
    </span>
  </div>
)

export default EmptyEditor 
