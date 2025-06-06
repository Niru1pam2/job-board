"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default forwardRef<object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <div>
        <Editor
          {...props}
          editorClassName={cn(
            "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-wthin:ring-offset-2",
            props.editorClassName
          )}
          toolbar={{
            options: ["inline", "list", "link", "history"],
            inline: {
              options: ["bold", "italic", "underline"],
            },
          }}
          editorRef={(r) => {
            if (!ref) return;

            if (typeof ref === "function") {
              ref(r);
            } else if ("current" in ref && r !== null) {
              ref.current = r;
            }
          }}
        />
      </div>
    );
  }
);
