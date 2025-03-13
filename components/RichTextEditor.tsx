'use client';

import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  // Khởi tạo EditorState từ chuỗi JSON ban đầu
  const [editorState, setEditorState] = useState(() => {
    try {
      const rawContent = JSON.parse(value);
      return EditorState.createWithContent(convertFromRaw(rawContent));
    } catch (error) {
      return EditorState.createEmpty();
    }
  });

  // Mỗi khi prop value thay đổi, re-init lại EditorState
  useEffect(() => {
    try {
      const rawContent = JSON.parse(value);
      const newEditorState = EditorState.createWithContent(convertFromRaw(rawContent));
      setEditorState(newEditorState);
    } catch (error) {
      setEditorState(EditorState.createEmpty());
    }
  }, [value]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    // Chuyển đổi state sang raw JSON string để đồng bộ với form
    const raw = convertToRaw(state.getCurrentContent());
    onChange(JSON.stringify(raw));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      toolbar={{
        options: ['inline', 'blockType', 'list', 'link', 'image', 'history']
      }}
    />
  );
};

export default RichTextEditor;
