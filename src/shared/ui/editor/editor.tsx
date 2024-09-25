"use client";

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable consistent-return */
import Quill, { type QuillOptions } from "quill";
import { ButtonHTMLAttributes, memo, MouseEvent, MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Delta, Op } from "quill/core";
import { MdSend } from "react-icons/md";
import { EmojiClickData } from "emoji-picker-react";
import { useFormContext } from "react-hook-form";

import { cn } from "../../lib/utils/cn";
import { Button } from "../button";
import { handleQuillPaste } from "./utils/handle-quill-paste";
import { HideToolbar } from "./hide-toolbar-selector";
import { ImageSelector } from "./image-selector";
import { UpdateVariant } from "./update-variant";
import { formats } from "./consts/formats";
import { Emoji } from "./emoji-selector";
import { ImageDisplay } from "./image-display";

import "quill/dist/quill.snow.css";

type EditorType = "create" | "update";

/**
 * `body` - JSON string of `Delta` from `quill` package.
 *
 * `images` - An optional array of `File` base type.
 *
 * To use body, do:
 *
 * @example
 * import { Delta } from "quill";
 *
 * const deltaContent = JSON.parse(body) as Delta;
 *
 * console.log(deltaContent);
 */
export type EditorValue = {
  images?: File[];
  body: string; // * JSON of `Delta` from quill
};

const actionClassName = "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white";
const actionClassNameDisabled = "bg-white hover:bg-white text-muted-foreground";

interface EditorProps {
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: EditorType;
  actionButtonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  initialImages?: File[];
}

export const Editor = memo((props: EditorProps) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>(props?.initialImages || []);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const formContext = useFormContext<EditorValue>();

  const { onCancel, innerRef } = props;
  const {
    placeholder = "Write your message...",
    defaultValue = [],
    actionButtonType = "button",
    variant = "create",
    disabled = false,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(onCancel);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageElementRef = useRef<HTMLInputElement | null>(null);
  const virtualSubmitButtonRef = useRef<HTMLButtonElement | null>(null);

  const imagesRef = useRef<File[]>(images);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useLayoutEffect(() => {
    cancelRef.current = onCancel;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  const onSaveSubmitAction = useCallback(() => {
    formContext.setValue("body", JSON.stringify(quillRef.current?.getContents()));

    formContext.setValue("images", imagesRef.current);

    setImages([]);
  }, [formContext]);

  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }

    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));

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
              handler: () => {
                const quill = quillRef.current;
                if (!quill) return;

                const text = quill.getText();
                const imagesFromInput = Array.from(imageElementRef.current?.files || []);

                const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0 && imagesFromInput.length <= 0;

                if (isEmpty) {
                  return;
                }

                onSaveSubmitAction();

                virtualSubmitButtonRef.current?.click();
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                const quill = quillRef.current;
                if (!quill) return;

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
    quill.root.addEventListener("paste", handleQuillPaste(setImages, formContext));

    return () => {
      quill.off(Quill.events.TEXT_CHANGE, textChangeHandler);
      quill.root.removeEventListener("paste", handleQuillPaste(setImages, formContext));

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
  }, [innerRef, variant, onSaveSubmitAction, formContext]);

  const toggleToolbar = useCallback(() => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  }, []);

  const onEmojiSelect = (emojiData: EmojiClickData) => {
    const quill = quillRef.current;

    const index = quill ? quill.getText().length - 1 : 0;

    quill?.insertText(index, emojiData.emoji);
  };

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0 && images.length <= 0;
  const actionDisabled = isEmpty || disabled;

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        className="hidden"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(
              (_image, index) => index < 5,
            );

            setImages((prevImages) => {
              const newFiles = [...prevImages, ...selectedFiles];

              if (newFiles.length > 5) {
                formContext.setValue("images", prevImages);

                return prevImages;
              }

              formContext.setValue("images", newFiles);

              return newFiles;
            });
          }
        }}
      />
      <button type="submit" className="hidden" ref={virtualSubmitButtonRef} />
      <div className={cn("flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white", disabled && "opacity-50")}>
        <div ref={containerRef} className="h-full ql-custom" />
        {images.length > 0 && (
          <ImageDisplay
            images={images}
            setImages={setImages}
            imageElementRef={imageElementRef}
            form={formContext}
          />
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <HideToolbar
            toggleToolbar={toggleToolbar}
            isToolbarVisible={isToolbarVisible}
            disabled={disabled}
          />
          <Emoji
            disabled={disabled}
            onEmojiSelect={onEmojiSelect}
          />
          <ImageSelector
            disabled={disabled}
            imageElementRef={imageElementRef}
          />
          {variant === "update" && (
            <UpdateVariant
              disabled={actionDisabled}
              actionClassName={actionClassName}
              actionButtonType={actionButtonType}
              saveAction={onSaveSubmitAction}
              onCancelAction={onCancel}
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
              onClick={() => onSaveSubmitAction()}
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
            <strong>Shift + Enter(Return)</strong>
            {" "}
            to add a new line
          </p>
        </div>
      )}
    </div>
  );
});

export default Editor;
