/* eslint-disable consistent-return */
import { FC, useState, useRef, useEffect } from "react";
import { Delta } from "quill/core";
import Quill from "quill";

export interface RendererProps {
  body: string // * JSON string of Delta | Op[];
}

export const Renderer: FC<RendererProps> = ({ body }) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const rendererRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rendererRef.current) {
      return;
    }

    const container = rendererRef.current;

    const quill = new Quill(document.createElement("div"), {
      theme: "snow",
    });

    quill.enable(false);

    const contents = JSON.parse(body) as Delta;

    quill.setContents(contents);

    const isEmpty = quill.getText().replace(/<(.|\n)*?>/g, "").trim().length === 0;

    setIsEmpty(isEmpty);

    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [body]);

  if (isEmpty) {
    return null;
  }

  return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};

export default Renderer;
