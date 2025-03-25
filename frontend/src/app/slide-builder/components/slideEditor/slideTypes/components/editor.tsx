'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TextEditor = () => {
  const editor = useEditor({
    extensions: [ StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false
        },
    })],
    content: '<p>Text Here...</p>',
  })

  return <EditorContent editor={editor} />
}

export default TextEditor
