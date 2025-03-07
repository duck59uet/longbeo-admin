// components/RichTextEditor.tsx
'use client';

import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  // Khởi tạo EditorState từ giá trị JSON truyền vào
  const initialState = (() => {
    try {
      const rawContent = JSON.parse(value);
      return EditorState.createWithContent(convertFromRaw(rawContent));
    } catch (error) {
      return EditorState.createEmpty();
    }
  })();

  const [editorState, setEditorState] = useState(initialState);

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
        options: ['inline', 'blockType', 'list', 'link', 'image', 'history'],
      }}
    />
  );
};

export default RichTextEditor;
