
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Eye, EyeOff, Save } from 'lucide-react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import DOMPurify from 'dompurify';
import { renderToStaticMarkup } from 'react-dom/server';
import { mdxComponents } from '../mdx/MDXComponents';

interface MDXEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
  title?: string;
}

const MDXEditor = ({ content, onContentChange, onSave, title = "Content Editor" }: MDXEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleContentChange = (newContent: string) => {
    setLocalContent(newContent);
    onContentChange(newContent);
  };

  const [previewHTML, setPreviewHTML] = useState('');

  useEffect(() => {
    if (!showPreview) return;

    const generatePreview = async () => {
      try {
        const { default: MDXContent } = await evaluate(localContent, {
          Fragment: runtime.Fragment,
          jsx: runtime.jsx,
          jsxs: runtime.jsxs,
          useMDXComponents: () => mdxComponents
        });
        const html = renderToStaticMarkup(<MDXContent />);
        setPreviewHTML(DOMPurify.sanitize(html));
      } catch (error) {
        setPreviewHTML(`<pre class="text-red-500">${(error as Error).message}</pre>`);
      }
    };

    generatePreview();
  }, [localContent, showPreview]);

  return (
    <Card className="border-gryd-soft/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="subhead text-gryd-text">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
            >
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button 
              size="sm" 
              onClick={onSave}
              className="bg-gryd-accent hover:bg-gryd-accent/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showPreview ? (
          <div className="min-h-[400px] prose prose-gryd max-w-none">
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
          </div>
        ) : (
          <Textarea
            value={localContent}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Write your MDX content here..."
            className="min-h-[400px] font-mono text-sm border-gryd-soft/20 focus:border-gryd-accent resize-none"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MDXEditor;
