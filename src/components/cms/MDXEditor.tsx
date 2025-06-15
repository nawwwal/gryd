
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Eye, EyeOff, Save } from 'lucide-react';

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

  const renderMDXPreview = (mdxContent: string) => {
    // Simple MDX to HTML conversion for preview
    return mdxContent
      .replace(/^# (.*$)/gim, '<h1 class="headline text-gryd-text mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="subhead text-gryd-text mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="body font-medium text-gryd-text mb-2">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n\n/gim, '</p><p class="body text-gryd-text mb-4">')
      .replace(/^(?!<[h\d|p])(.+)$/gim, '<p class="body text-gryd-text mb-4">$1</p>')
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gryd-soft/5 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm font-mono">$2</code></pre>');
  };

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
            <div 
              dangerouslySetInnerHTML={{ 
                __html: renderMDXPreview(localContent) 
              }} 
            />
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
