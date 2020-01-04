import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { TextField } from "@material-ui/core";

const  FileEditor = (props) => {
  const {
    file,
    onChangeFile,
  } = props;

  const [parser, setParser] = useState(new MarkdownIt())

  return (
    <>
      <TextField
        label="File name"
        value={file.name}
        onChange={(e) => onChangeFile({ ...file, name: e.target.value })}
      />
      <MdEditor
        value={file.content}
        renderHTML={(text) => parser.render(text)}
        onChange={(p) => onChangeFile({ ...file, content: p.text })}
      />
    </>
  )
}

export default FileEditor 
