"use client";
import React, { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Link2,
  Palette,
  BaselineIcon,
  ImagePlus,
} from "lucide-react";
import ColorPalette from "./ColorPalette";

type Props = {
  editor: Editor | null;
};

export default function TipTapToolbar({ editor }: Props) {
  const [showTextColorPalette, setShowTextColorPalette] = useState(false);
  const [showBgColorPalette, setShowBgColorPalette] = useState(false);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const setImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const toggleTextColorPalette = () => {
    setShowTextColorPalette(!showTextColorPalette);
  };

  const toggleBgColorPalette = () => {
    setShowBgColorPalette(!showBgColorPalette);
  };

  const applyTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setShowTextColorPalette(false);
  };

  const applyBgColor = (color: any) => {
    editor.chain().focus().toggleHighlight({ color: color }).run();
    setShowBgColorPalette(false);
  };

  return (
    <div className="border rounded-t-md bg-[#F3F3F3] border-input p-2 flex flex-wrap relative">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className="p-2"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className="p-2"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className="p-2"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className="p-2"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="p-2"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className="p-2"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={setLink}
        className="p-2"
      >
        <Link2 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={setImage} className="p-2">
        <ImagePlus className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={toggleTextColorPalette}
        className="p-2"
      >
        <BaselineIcon className="h-4 w-4" />
      </Toggle>
      {showTextColorPalette && (
        <div className="absolute top-10 left-0 bg-white border p-2 z-10">
          <ColorPalette onSelectColor={applyTextColor} />
        </div>
      )}
      <Toggle size="sm" onPressedChange={toggleBgColorPalette} className="p-2">
        <Palette className="h-4 w-4" style={{ background: "#ffff00" }} />
      </Toggle>
      {showBgColorPalette && (
        <div className="absolute top-10 left-20 bg-white border p-2 z-10">
          <ColorPalette onSelectColor={applyBgColor} />
        </div>
      )}
    </div>
  );
}
