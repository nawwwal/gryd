import React, { useState, useEffect } from 'react';
import { PlaygroundExperiment } from '../../types/content';
import { loadPlaygroundExperiments } from '../../utils/contentLoader';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import ScrollFade from '../ScrollFade';
import PlaygroundListView from './playground/PlaygroundListView';
import PlaygroundEditForm, { ExperimentFormData } from './playground/PlaygroundEditForm';
import PlaygroundContentEditor from './playground/PlaygroundContentEditor';


const PlaygroundCMS = () => {
  const [experiments, setExperiments] = useState<PlaygroundExperiment[]>([]);
  const [editingExperiment, setEditingExperiment] = useState<PlaygroundExperiment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);


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



  const handleEditExperiment = (experiment: PlaygroundExperiment) => {
    setEditingExperiment(experiment);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingExperiment(null);
  };

  const handleSaveExperiment = (data: ExperimentFormData) => {
    console.log('Saving experiment:', data);
    setIsCreating(false);
    setEditingExperiment(null);
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

      {(isCreating || editingExperiment) && (
        <>
          <PlaygroundEditForm
            experiment={editingExperiment}
            isCreating={isCreating}
            onSave={handleSaveExperiment}
            onCancel={() => {
              setIsCreating(false);
              setEditingExperiment(null);
            }}
          />
          <PlaygroundContentEditor
            content={editingExperiment ? editingExperiment.content : ''}
            onContentChange={(val) => {
              if (editingExperiment) {
                setEditingExperiment({ ...editingExperiment, content: val });
              }
            }}
            onSave={() => console.log('Saving content:', editingExperiment?.content)}
          />
        </>
      )}

      <PlaygroundListView
        experiments={experiments}
        searchTerm={searchTerm}
        typeFilter={typeFilter}
        onSearchTermChange={setSearchTerm}
        onTypeFilterChange={setTypeFilter}
        onEdit={handleEditExperiment}
      />
    </div>
  );
};

export default PlaygroundCMS;
