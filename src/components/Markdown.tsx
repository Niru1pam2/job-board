import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <div className="markdown-body space-y-3">
      <ReactMarkdown
        components={{
          ul: (props) => <ul className="list-inside list-disc" {...props} />,
          a: (props) => (
            <a
              className="text-green-500 underline"
              target="_blank"
              {...props}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
