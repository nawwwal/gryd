import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { WorkProject } from '../../../types/content';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { FileText } from 'lucide-react';

export interface WorkFormData {
  title: string;
  subtitle: string;
  description: string;
  timeline: string;
  impact: string;
  category: string;
  tools: string;
  tags: string;
}

interface WorkEditFormProps {
  project: WorkProject | null;
  isCreating: boolean;
  onSave: (data: WorkFormData) => void;
  onCancel: () => void;
  showContentEditor: boolean;
  onToggleContentEditor: () => void;
}

const WorkEditForm = ({
  project,
  isCreating,
  onSave,
  onCancel,
  showContentEditor,
  onToggleContentEditor,
}: WorkEditFormProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<WorkFormData>();

  useEffect(() => {
    if (project) {
      setValue('title', project.title);
      setValue('subtitle', project.subtitle);
      setValue('description', project.description);
      setValue('timeline', project.timeline);
      setValue('impact', project.impact);
      setValue('category', project.metadata.category);
      setValue('tools', project.metadata.tools.join(', '));
      setValue('tags', project.metadata.tags.join(', '));
    } else {
      reset();
    }
  }, [project, reset, setValue]);

  const submit = (data: WorkFormData) => {
    onSave(data);
    reset();
  };

  return (
    <Card className="border-gryd-soft/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="subhead text-gryd-text">
            {isCreating ? 'Create New Project' : 'Edit Project'}
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleContentEditor}
            className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
          >
            <FileText className="w-4 h-4 mr-2" />
            {showContentEditor ? 'Hide Content Editor' : 'Edit Content'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="caption text-gryd-soft mb-2 block">Title</label>
              <Input {...register('title')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Timeline</label>
              <Input {...register('timeline')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
          </div>
          <div>
            <label className="caption text-gryd-soft mb-2 block">Subtitle</label>
            <Input {...register('subtitle')} className="border-gryd-soft/20 focus:border-gryd-accent" />
          </div>
          <div>
            <label className="caption text-gryd-soft mb-2 block">Description</label>
            <Textarea {...register('description')} className="border-gryd-soft/20 focus:border-gryd-accent" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="caption text-gryd-soft mb-2 block">Impact</label>
              <Input {...register('impact')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Category</label>
              <Input {...register('category')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="caption text-gryd-soft mb-2 block">Tools (comma separated)</label>
              <Input {...register('tools')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Tags (comma separated)</label>
              <Input {...register('tags')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-gryd-accent hover:bg-gryd-accent/90 text-white">
              Save Project
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onCancel();
              }}
              className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkEditForm;
