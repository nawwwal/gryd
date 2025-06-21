import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlaygroundExperiment } from '../../../types/content';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

export interface ExperimentFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tools: string;
  tags: string;
  intensity: 'low' | 'medium' | 'high';
  visual: string;
}

interface PlaygroundEditFormProps {
  experiment: PlaygroundExperiment | null;
  isCreating: boolean;
  onSave: (data: ExperimentFormData) => void;
  onCancel: () => void;
}

const PlaygroundEditForm = ({ experiment, isCreating, onSave, onCancel }: PlaygroundEditFormProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<ExperimentFormData>();

  useEffect(() => {
    if (experiment) {
      setValue('title', experiment.title);
      setValue('subtitle', experiment.subtitle);
      setValue('description', experiment.description);
      setValue('category', experiment.metadata.category);
      setValue('tools', experiment.metadata.tools.join(', '));
      setValue('tags', experiment.metadata.tags.join(', '));
      setValue('intensity', experiment.intensity);
      setValue('visual', experiment.visual);
    } else {
      reset();
    }
  }, [experiment, reset, setValue]);

  const submit = (data: ExperimentFormData) => {
    onSave(data);
    reset();
  };

  return (
    <Card className="border-gryd-soft/20">
      <CardHeader>
        <CardTitle className="subhead text-gryd-text">
          {isCreating ? 'Create New Experiment' : 'Edit Experiment'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="caption text-gryd-soft mb-2 block">Title</label>
              <Input {...register('title')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Category</label>
              <Input {...register('category')} className="border-gryd-soft/20 focus:border-gryd-accent" />
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
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="caption text-gryd-soft mb-2 block">Intensity</label>
              <select {...register('intensity')} className="w-full px-3 py-2 border border-gryd-soft/20 rounded-md bg-white text-gryd-text focus:border-gryd-accent focus:outline-none">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Visual Style</label>
              <Input {...register('visual')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
            <div>
              <label className="caption text-gryd-soft mb-2 block">Tools (comma separated)</label>
              <Input {...register('tools')} className="border-gryd-soft/20 focus:border-gryd-accent" />
            </div>
          </div>
          <div>
            <label className="caption text-gryd-soft mb-2 block">Tags (comma separated)</label>
            <Input {...register('tags')} className="border-gryd-soft/20 focus:border-gryd-accent" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-gryd-accent hover:bg-gryd-accent/90 text-white">
              Save Experiment
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

export default PlaygroundEditForm;
