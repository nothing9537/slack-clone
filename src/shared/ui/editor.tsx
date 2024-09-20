/* eslint-disable consistent-return */
import { ButtonHTMLAttributes, FC, memo, MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill, { type QuillOptions } from "quill";
import { Delta, Op } from "quill/core";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { ImageIcon, Smile } from "lucide-react";

import { Button } from "@/shared/ui/button";

import "quill/dist/quill.snow.css";
import { Hint } from "@/shared/ui/hint";
import { cn } from "../lib/utils/cn";

type EditorType = "create" | "update";
type EditorValue = {
  image: File | null;
  body: string;
};

const actionClassName = "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white";
const actionClassNameDisabled = "bg-white hover:bg-white text-muted-foreground";

interface EditorProps {
  onChange: (editorValue: EditorValue) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: EditorType;
  actionButtonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Editor: FC<EditorProps> = memo((props) => {
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const { onChange, onCancel, innerRef } = props;
  const { placeholder = "Write your message...", defaultValue = [], actionButtonType = "button", variant = "create", disabled = false } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef(onChange);
  const cancelRef = useRef(onCancel);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    changeRef.current = onChange;
    cancelRef.current = onCancel;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => { },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);

      if (container) {
        container.innerHTML = "";
      }

      if (quillRef?.current) {
        quillRef.current = null;
      }

      if (innerRef?.current) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = useCallback(() => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  }, []);

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  const actionDisabled = isEmpty || disabled;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label={isToolbarVisible ? "Show formatting" : "Hide formatting"}>
            <Button disabled={disabled} size="iconSm" variant="ghost" type="button" onClick={toggleToolbar}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="Emoji">
              <Button disabled={disabled} size="iconSm" variant="ghost" type="button">
                <Smile className="size-4" />
              </Button>
            </Hint>
          )}
          <Hint label="Image">
            <Button disabled={disabled} size="iconSm" variant="ghost" type="button">
              <ImageIcon className="size-4" />
            </Button>
          </Hint>
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button disabled={disabled} size="sm" variant="outline">
                Cancel
              </Button>
              <Button disabled={actionDisabled} size="sm" variant="outline" className={actionClassName} type={actionButtonType}>
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button disabled={actionDisabled} size="iconSm" className={cn(actionClassName, "ml-auto", isEmpty && actionClassNameDisabled)} type={actionButtonType}>
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 text-xs text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Enter</strong>
          {" "}
          to add a new line
        </p>
      </div>
    </div>
  );
});
