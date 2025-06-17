import React, { useState, useEffect } from 'react';
import { WorkProject } from '../../types/content';
import { loadWorkProjects } from '../../utils/contentLoader';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import ScrollFade from '../ScrollFade';
import WorkListView from './work/WorkListView';
import WorkEditForm, { WorkFormData } from './work/WorkEditForm';
import WorkContentEditor from './work/WorkContentEditor';


const WorkCMS = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [editingProject, setEditingProject] = useState<WorkProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [currentContent, setCurrentContent] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const workProjects = await loadWorkProjects();
        setProjects(workProjects);
      } catch (error) {
        console.error('Failed to load work projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);


  const handleEditProject = (project: WorkProject) => {
    setEditingProject(project);
    setCurrentContent(project.content);
    setIsCreating(false);
    setShowContentEditor(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingProject(null);
    setCurrentContent('# New Project\n\nStart writing your case study here...');
    setShowContentEditor(false);
  };

  const handleContentSave = () => {
    console.log('Saving content:', currentContent);
    // TODO: Implement content save
  };

  const handleSaveProject = (data: WorkFormData) => {
    console.log('Saving project:', { ...data, content: currentContent });
    // TODO: Implement actual save functionality
    setIsCreating(false);
    setEditingProject(null);
    setShowContentEditor(false);
  };

  if (loading) {
    return (
      <div className="editorial-container py-16">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="body text-gryd-soft">Loading work projects...</p>
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
              <h1 className="headline text-gryd-text">Work Portfolio CMS</h1>
              <p className="body text-gryd-soft">Manage case studies and client projects</p>
            </div>
            <Button 
              onClick={handleCreateNew}
              className="bg-gryd-accent hover:bg-gryd-accent/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gryd-soft/5 rounded-lg">
            <div className="text-center">
              <div className="subhead text-gryd-text">{projects.length}</div>
              <div className="caption text-gryd-soft">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="subhead text-gryd-accent">{projects.filter(p => p.metadata.status === 'live').length}</div>
              <div className="caption text-gryd-soft">Live</div>
            </div>
            <div className="text-center">
              <div className="subhead text-gryd-text">{projects.filter(p => p.metadata.featured).length}</div>
              <div className="caption text-gryd-soft">Featured</div>
            </div>
            <div className="text-center">
              <div className="subhead text-gryd-soft">{projects.filter(p => p.metadata.status === 'draft').length}</div>
              <div className="caption text-gryd-soft">Drafts</div>
            </div>
          </div>
        </div>
      </ScrollFade>

      {(isCreating || editingProject) && (
        <>
          <WorkEditForm
            project={editingProject}
            isCreating={isCreating}
            onSave={handleSaveProject}
            onCancel={() => {
              setIsCreating(false);
              setEditingProject(null);
              setShowContentEditor(false);
            }}
            showContentEditor={showContentEditor}
            onToggleContentEditor={() => setShowContentEditor(!showContentEditor)}
          />
          {showContentEditor && (
            <WorkContentEditor
              content={currentContent}
              onContentChange={setCurrentContent}
              onSave={handleContentSave}
            />
          )}
        </>
      )}

      <WorkListView
        projects={projects}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchTermChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onEdit={handleEditProject}
      />
    </div>
  );
};

export default WorkCMS;
