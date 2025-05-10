
import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, 
  Image as ImageIcon, Link as LinkIcon, Code, Quote, AlignLeft, 
  AlignCenter, AlignRight, Undo, Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadEditorImage } from '@/utils/blog-utils';
import { Separator } from '@/components/ui/separator';

interface TiptapMenuBarProps {
  editor: Editor;
}

const TiptapMenuBar = ({ editor }: TiptapMenuBarProps) => {
  const addImage = async () => {
    if (!editor) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        try {
          console.log("Uploading image file:", file.name);
          const imageUrl = await uploadEditorImage(file);
          console.log("Received image URL:", imageUrl);
          if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
        } catch (error) {
          console.error('Image upload error:', error);
        }
      }
    };
    input.click();
  };

  const setLink = () => {
    if (!editor) return;
    
    const url = window.prompt('URL');
    
    // Cancelled
    if (url === null) {
      return;
    }
    
    // Empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    // Add https:// if no protocol is specified
    const httpUrl = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
      
    editor.chain().focus().extendMarkRange('link').setLink({ href: httpUrl }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 overflow-x-auto">
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
          type="button"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
          type="button"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-muted' : ''}
          type="button"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
          type="button"
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
          type="button"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}
          type="button"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-muted' : ''}
          type="button"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-muted' : ''}
          type="button"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}
          type="button"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}
          type="button"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}
          type="button"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={addImage}
          type="button"
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-muted' : ''}
          type="button"
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
          type="button"
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
          type="button"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
          type="button"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TiptapMenuBar;
