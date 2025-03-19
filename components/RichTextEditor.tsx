'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';

// ==================== Quill Tùy Biến ====================
import Quill from 'quill';

// 1) Tùy biến video YouTube (tăng width, height)
const Video = Quill.import('formats/video');
class YouTubeVideo extends Video {
  static create(value: any) {
    let node = super.create(value);
    if (typeof value === 'string') {
      // Nếu là link YouTube -> chuyển thành link embed
      const youtubeMatch = value.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );
      if (youtubeMatch && youtubeMatch[1]) {
        value = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }
    }
    node.setAttribute('src', value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', 'true');

    // Tùy chỉnh kích thước iframe
    node.setAttribute('width', '640');
    node.setAttribute('height', '360');
    return node;
  }
}
Quill.register('formats/video', YouTubeVideo);

// 2) Đăng ký font (Times New Roman)
const Font = Quill.import('formats/font');
// - Nếu muốn thêm nhiều font, bạn có thể thêm tiếp vào mảng này.
// - Lưu ý: tên value không nên có dấu cách để tránh lỗi class CSS.
Font.whitelist = ['TimesNewRoman', 'Arial', 'Georgia', 'Tahoma', 'Verdana'];
Quill.register(Font, true);

// 3) Đăng ký size (6px -> 24px, mỗi bước +2)
const Size = Quill.import('formats/size');
Size.whitelist = [
  '6px', '8px', '10px', '12px', '14px', 
  '16px', '18px', '20px', '22px', '24px'
];
Quill.register(Size, true);

// Import ReactQuill không dùng SSR
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

  useEffect(() => {
    setIsClient(true);
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.blocks) {
          const htmlContent = parsed.blocks
            .map((block: any) => (block.text ? `<p>${block.text}</p>` : ''))
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
  }, []);

  useEffect(() => {
    if (isClient && value && value !== editorValue) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.blocks) {
          const htmlContent = parsed.blocks
            .map((block: any) => (block.text ? `<p>${block.text}</p>` : ''))
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

  // Bộ màu cơ bản
  const colors = [
    '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', 
    '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', 
    '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
    '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', 
    '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'
  ];

  // Cấu hình toolbar
  const modules = {
    toolbar: {
      container: [
        // font + size
        [
          { font: Font.whitelist }, 
          { size: Size.whitelist }
        ],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: colors }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    }
  };

  // Danh sách các định dạng được hỗ trợ
  const formats = [
    'font', 'size', 'header',
    'bold', 'italic', 'underline', 'strike',
    'color',
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image', 'video'
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
