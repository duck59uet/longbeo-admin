// @/components/RichTextEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css'; // Tạo file CSS này sau

// Import Quill không sử dụng SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="quill-loading">Loading editor...</div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [editorValue, setEditorValue] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Xử lý khi component được mount
  useEffect(() => {
    setIsClient(true);
    
    // Xử lý giá trị ban đầu
    if (value) {
      try {
        // Kiểm tra xem value có phải là JSON không
        const parsed = JSON.parse(value);
        if (parsed.blocks) {
          // Nếu là Draft.js format
          const htmlContent = parsed.blocks
            .map((block: any) => {
              if (!block.text) return '';
              return `<p>${block.text}</p>`;
            })
            .join('');
          setEditorValue(htmlContent);
        } else if (parsed.content) {
          // Nếu là object với thuộc tính content
          setEditorValue(parsed.content);
        } else {
          // Trường hợp khác
          setEditorValue(value);
        }
      } catch (e) {
        // Nếu không phải JSON, giả sử là HTML
        setEditorValue(value);
      }
    }
  }, []);

  // Cập nhật khi value prop thay đổi từ bên ngoài
  useEffect(() => {
    if (isClient && value && value !== editorValue) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.blocks) {
          const htmlContent = parsed.blocks
            .map((block: any) => {
              if (!block.text) return '';
              return `<p>${block.text}</p>`;
            })
            .join('');
          setEditorValue(htmlContent);
        } else if (parsed.content) {
          setEditorValue(parsed.content);
        } else {
          setEditorValue(value);
        }
      } catch (e) {
        setEditorValue(value);
      }
    }
  }, [value, isClient]);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  // Cấu hình toolbar của Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (!isClient) {
    return <div className="quill-loading">Loading editor...</div>;
  }

  return (
    <div className="quill-editor-container">
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        placeholder={placeholder || 'Nhập nội dung...'}
      />
    </div>
  );
};

export default RichTextEditor;
