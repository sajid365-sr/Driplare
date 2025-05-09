
import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline, List, Heading, Image, Link, Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadEditorImage } from '@/utils/blog-utils';
import { toast } from 'sonner';

interface TiptapMenuBarProps {
  editor: Editor;
}

const TiptapMenuBar = ({ editor }: TiptapMenuBarProps) => {
  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        try {
          const imageUrl = await uploadEditorImage(file);
          if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
        } catch (error) {
          toast.error('Failed to upload image');
        }
      }
    };
    input.click();
  };

  const setLink = () => {
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

  return (
    <div className="border-b p-2 flex flex-wrap gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-muted' : ''}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="h-6 mx-1 border-r border-gray-300"></div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
      >
        <Heading className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-muted' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      
      <div className="h-6 mx-1 border-r border-gray-300"></div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={addImage}
      >
        <Image className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={setLink}
        className={editor.isActive('link') ? 'bg-muted' : ''}
      >
        <Link className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TiptapMenuBar;
