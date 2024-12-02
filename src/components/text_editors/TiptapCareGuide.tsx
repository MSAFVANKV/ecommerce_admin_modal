
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import Highlight from "@tiptap/extension-highlight";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import HardBreak from "@tiptap/extension-hard-break"; // Import HardBreak extension
import TipTapToolbar from "./TipTapToolbar";


type Props = {
  careGuide: string;
  label: string;
  onChange: (richText: string) => void;
  error?: string; // Validation error message
  touched?: boolean;
};

export default function TiptapCareGuide({ careGuide, onChange, label }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak.configure({
        HTMLAttributes: {
          class: "hard-break", // Optional: Add a class to style the <br> tags if needed
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link,
      Image,
      TextStyle,
      Text,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: careGuide,
    editorProps: {
      attributes: {
        class: "rounded-b-md border min-h-[150px] border-input p-2 outline-none",
      },
      handleKeyDown(view, event) {
        // Insert a <br> tag on pressing "Enter" instead of creating a new paragraph
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.hardBreak.create()).scrollIntoView());
          return true;
        }
        return false;
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== careGuide) {
      editor.commands.setContent(careGuide);
    }
  }, [careGuide, editor]);

  return (
    <div className="flex justify-between">
      <Label htmlFor="" className="block text-sm font-medium text-textGray">
        {label}
      </Label>
      <div className="w-3/4 changed">
         <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} />
      </div>
     
      {/* {touched && error && (
        <div className="text-red-500 mt-1">{error}</div>
      )} */}
    </div>
  );
}
