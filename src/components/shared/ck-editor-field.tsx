"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  Strikethrough,
  Underline,
} from "ckeditor5";
export interface CKEditorFieldProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  error?: boolean;
}

export function CKEditorField({
  value = "",
  onChange,
  placeholder = "Write your blog content here...",
  minHeight = 310,
  error = false,
}: CKEditorFieldProps) {
  return (
    <div
      className={`ck-editor-field ${error ? "is-invalid" : ""}`}
      style={
        { "--ck-editor-min-height": `${minHeight}px` } as React.CSSProperties
      }
    >
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          placeholder,
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Link,
            List,
            BlockQuote,
          ],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "link",
            "blockQuote",
            "undo",
            "redo",
          ],
        }}
        onChange={(_, editor) => onChange(editor.getData())}
      />
    </div>
  );
}
