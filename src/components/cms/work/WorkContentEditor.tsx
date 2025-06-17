import React from 'react';
import MDXEditor from '../MDXEditor';

interface WorkContentEditorProps {
  content: string;
  onContentChange: (value: string) => void;
  onSave: () => void;
}

const WorkContentEditor = ({ content, onContentChange, onSave }: WorkContentEditorProps) => (
  <MDXEditor content={content} onContentChange={onContentChange} onSave={onSave} title="Project Content (MDX)" />
);

export default WorkContentEditor;
