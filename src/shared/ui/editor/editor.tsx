// Editor.tsx

"use client";

/* eslint-disable consistent-return */
import Quill, { type QuillOptions } from "quill";
import {
  ButtonHTMLAttributes,
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Delta, Op } from "quill/core";
import { MdSend } from "react-icons/md";
import { EmojiClickData } from "emoji-picker-react";

import { cn } from "../../lib/utils/cn";
import { Button } from "../button";
import { HideToolbar } from "./hide-toolbar";
import { ImageSelector } from "./image-selector";
import { UpdateVariant } from "./update-variant";
import { formats } from "./formats";
import { Emoji } from "./emoji";
import { handleQuillPaste } from "./utils/handle-quill-paste";

import "quill/dist/quill.snow.css";
import { ImageDisplay } from "./image-display";

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

export const Editor: FC<EditorProps> = (props) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const { onChange, onCancel, innerRef } = props;
  const {
    placeholder = "Write your message...",
    defaultValue = [],
    actionButtonType = "button",
    variant = "create",
    disabled = false,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef(onChange);
  const cancelRef = useRef(onCancel);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageElementRef = useRef<HTMLInputElement | null>(null);

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
      formats,
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

    const textChangeHandler = () => {
      setText(quill.getText());
    };

    quill.on(Quill.events.TEXT_CHANGE, textChangeHandler);

    quill.root.addEventListener("paste", handleQuillPaste(setImages));

    return () => {
      quill.off(Quill.events.TEXT_CHANGE, textChangeHandler);
      quill.root.removeEventListener("paste", handleQuillPaste(setImages));

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

  const onEmojiSelect = (emojiData: EmojiClickData) => {
    const quill = quillRef.current;

    const index = text.length < 0 ? 0 : text.length - 1;

    quill?.insertText(index, emojiData.emoji);
  };

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  const actionDisabled = isEmpty || disabled;

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(e) => {
          if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            setImages((prevImages) => [...prevImages, ...selectedFiles]);
          }
        }}
        className="hidden"
        multiple
      />
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        {images.length > 0 && (
          <ImageDisplay
            images={images}
            setImages={setImages}
            imageElementRef={imageElementRef}
          />
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <HideToolbar
            toggleToolbar={toggleToolbar}
            isToolbarVisible={isToolbarVisible}
            disabled={disabled}
          />
          {variant === "create" && (
            <Emoji disabled={disabled} onEmojiSelect={onEmojiSelect} />
          )}
          <ImageSelector
            disabled={disabled}
            imageElementRef={imageElementRef}
          />
          {variant === "update" && (
            <UpdateVariant
              disabled={actionDisabled}
              actionClassName={actionClassName}
              actionButtonType={actionButtonType}
            />
          )}
          {variant === "create" && (
            <Button
              disabled={actionDisabled}
              size="iconSm"
              className={cn(
                actionClassName,
                "ml-auto",
                isEmpty && actionClassNameDisabled,
              )}
              type={actionButtonType}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-xs text-muted-foreground flex justify-end opacity-0 transition",
            !isEmpty && "opacity-100",
          )}
        >
          <p>
            <strong>Shift + Enter</strong>
            {" "}
            to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
