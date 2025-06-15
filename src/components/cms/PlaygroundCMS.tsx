
import React, { useState, useEffect } from 'react';
import { PlaygroundExperiment } from '../../types/content';
import { loadPlaygroundExperiments } from '../../utils/contentLoader';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Search } from 'lucide-react';
import ScrollFade from '../ScrollFade';

interface ExperimentFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tools: string;
  tags: string;
  intensity: 'low' | 'medium' | 'high';
  visual: string;
}

const PlaygroundCMS = () => {
  const [experiments, setExperiments] = useState<PlaygroundExperiment[]>([]);
  const [editingExperiment, setEditingExperiment] = useState<PlaygroundExperiment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, setValue } = useForm<ExperimentFormData>();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const playgroundExperiments = await loadPlaygroundExperiments();
        setExperiments(playgroundExperiments);
      } catch (error) {
        console.error('Failed to load playground experiments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const filteredExperiments = experiments.filter(experiment => {
    const matchesSearch = experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || experiment.metadata.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'text-gryd-accent bg-gryd-accent/10';
      case 'medium': return 'text-gryd-text bg-gryd-soft/10';
      case 'low': return 'text-gryd-soft bg-gryd-soft/5';
      default: return 'text-gryd-soft bg-gryd-soft/5';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-gryd-accent bg-gryd-accent/10';
      case 'prototype': return 'text-gryd-text bg-gryd-soft/10';
      case 'ongoing': return 'text-yellow-600 bg-yellow-50';
      case 'archived': return 'text-gryd-soft bg-gryd-soft/5';
      case 'draft': return 'text-orange-600 bg-orange-50';
      default: return 'text-gryd-soft bg-gryd-soft/5';
    }
  };

  const handleEditExperiment = (experiment: PlaygroundExperiment) => {
    setEditingExperiment(experiment);
    setValue('title', experiment.title);
    setValue('subtitle', experiment.subtitle);
    setValue('description', experiment.description);
    setValue('category', experiment.metadata.category);
    setValue('tools', experiment.metadata.tools.join(', '));
    setValue('tags', experiment.metadata.tags.join(', '));
    setValue('intensity', experiment.intensity);
    setValue('visual', experiment.visual);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingExperiment(null);
    reset();
  };

  const onSubmit = (data: ExperimentFormData) => {
    console.log('Saving experiment:', data);
    setIsCreating(false);
    setEditingExperiment(null);
    reset();
  };

  if (loading) {
    return (
      <div className="editorial-container py-16">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="body text-gryd-soft">Loading playground experiments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editorial-container py-8 space-y-8">
      <ScrollFade>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="headline text-gryd-text">Playground CMS</h1>
              <p className="body text-gryd-soft">Manage experiments, blogs, photography, and research</p>
            </div>
            <Button 
              onClick={handleCreateNew}
              className="bg-gryd-accent hover:bg-gryd-accent/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Experiment
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gryd-soft/5 rounded-lg">
            <div className="text-center">
              <div className="subhead text-gryd-text">{experiments.length}</div>
              <div className="caption text-gryd-soft">Total Items</div>
            </div>
            <div className="text-center">
              <div className="subhead text-gryd-accent">{experiments.filter(e => e.metadata.status === 'live').length}</div>
              <div className="caption text-gryd-soft">Live</div>
            </div>
            <div className="text-center">
              <div className="subhead text-gryd-text">{experiments.filter(e => e.intensity === 'high').length}</div>
              <div className="caption text-gryd-soft">High Intensity</div>
            </div>
            <div className="text-center">
              <div className="subhead text-gryd-soft">{experiments.filter(e => e.metadata.status === 'draft').length}</div>
              <div className="caption text-gryd-soft">Drafts</div>
            </div>
          </div>
        </div>
      </ScrollFade>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gryd-soft w-4 h-4" />
          <Input
            placeholder="Search experiments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gryd-soft/20 rounded-md bg-white text-gryd-text focus:border-gryd-accent focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="code">Code</option>
          <option value="photography">Photography</option>
          <option value="blog">Blog</option>
          <option value="research">Research</option>
          <option value="visual">Visual</option>
          <option value="prototype">Prototype</option>
        </select>
      </div>

      {(isCreating || editingExperiment) && (
        <Card className="border-gryd-soft/20">
          <CardHeader>
            <CardTitle className="subhead text-gryd-text">
              {isCreating ? 'Create New Experiment' : 'Edit Experiment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    setIsCreating(false);
                    setEditingExperiment(null);
                    reset();
                  }}
                  className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {filteredExperiments.map((experiment, index) => (
          <ScrollFade key={experiment.slug} delay={index * 100}>
            <Card className="border-gryd-soft/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="subhead text-gryd-text mb-2">{experiment.title}</h3>
                        <p className="body text-gryd-soft mb-3">{experiment.subtitle}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getStatusColor(experiment.metadata.status)}>
                            {experiment.metadata.status}
                          </Badge>
                          <Badge variant="outline" className="border-gryd-soft/20 text-gryd-text">
                            {experiment.metadata.type}
                          </Badge>
                          <Badge className={getIntensityColor(experiment.intensity)}>
                            {experiment.intensity} intensity
                          </Badge>
                          <Badge variant="outline" className="border-gryd-soft/20 text-gryd-soft">
                            {experiment.visual}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="caption text-gryd-soft">Category:</span>
                        <span className="ml-2 body text-gryd-text">{experiment.metadata.category}</span>
                      </div>
                      <div>
                        <span className="caption text-gryd-soft">Updated:</span>
                        <span className="ml-2 body text-gryd-text">
                          {new Date(experiment.metadata.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {experiment.metadata.tools.length > 0 && (
                      <div className="mb-4">
                        <span className="caption text-gryd-soft block mb-2">Tools:</span>
                        <div className="flex flex-wrap gap-1">
                          {experiment.metadata.tools.map((tool, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-gryd-soft/20 text-gryd-soft">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditExperiment(experiment)}
                        className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
                      >
                        Preview
                      </Button>
                      {experiment.metadata.interactive?.hasDemo && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5"
                        >
                          View Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollFade>
        ))}
      </div>

      {filteredExperiments.length === 0 && (
        <div className="text-center py-12">
          <p className="body text-gryd-soft">No experiments found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default PlaygroundCMS;
