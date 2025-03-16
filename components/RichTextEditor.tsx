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

  // Định nghĩa bộ màu cơ bản
  const colors = [
    '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', 
    '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', 
    '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
    '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', 
    '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'
  ];

  // Cấu hình toolbar của Quill với chỉ thêm tùy chọn màu chữ
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': colors }], // Chỉ thêm tùy chọn màu chữ
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  // Định nghĩa các định dạng được hỗ trợ
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', // Chỉ bao gồm màu chữ, không có background
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image',
  ];

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
        formats={formats}
        placeholder={placeholder || 'Nhập nội dung...'}
      />
    </div>
  );
};

export default RichTextEditor;
