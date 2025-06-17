import React from 'react';
import MDXEditor from '../MDXEditor';

interface PlaygroundContentEditorProps {
  content: string;
  onContentChange: (value: string) => void;
  onSave: () => void;
}

const PlaygroundContentEditor = ({ content, onContentChange, onSave }: PlaygroundContentEditorProps) => (
  <MDXEditor content={content} onContentChange={onContentChange} onSave={onSave} title="Experiment Content (MDX)" />
);

export default PlaygroundContentEditor;
