// **EditorComponent.tsx**

"use client";
import React from 'react';
// Import các plugins cần thiết, đảm bảo bạn đã cài đặt @types/ckeditor5 nếu cần
import {
  ClassicEditor,
  Essentials, Paragraph,
  Bold, Italic, Underline, Strikethrough,
  Link,
  Image, ImageToolbar, ImageCaption, ImageResizeEditing, ImageResizeHandles, ImageUpload,
  Table, TableToolbar,
  CodeBlock,
  Widget
  // Không cần SimpleUploadAdapter nữa
} from "ckeditor5";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";

// Import plugin custom
import { CustomUploadAdapterPlugin } from "../../utils/CustomUploadAdapter"; // Đảm bảo đúng đường dẫn và tên file

const EditorComponent: React.FC = () => {
  // CKEditorConfig được ngầm định từ ClassicEditor, nhưng bạn có thể tạo một interface rõ ràng hơn
  const editorConfig = {
    licenseKey: "GPL",
    plugins: [
      Essentials, Paragraph,
      Bold, Italic, Underline, Strikethrough,
      Link,
      Image, ImageToolbar, ImageCaption, ImageResizeEditing, ImageResizeHandles, ImageUpload,
      Table, TableToolbar,
      CodeBlock,
      CustomUploadAdapterPlugin,
      Widget
    ],

    toolbar: [
      "undo", "redo",
      "|", "bold", "italic", "underline", "strikethrough",
      "|", "link",
      "|", "uploadImage", "insertTable", "codeBlock"
    ],
    image: {
      toolbar: [
        "imageTextAlternative", "imageStyle:inline", "imageStyle:block",
        "|", "resizeImage"
      ],
      style: [
        'block',
        'inline',
        'side',
      ],
    },
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data="<p>Viết bài ở đây...</p>"
      />
    </div>
  );
};

export default EditorComponent;