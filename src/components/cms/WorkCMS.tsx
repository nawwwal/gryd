
import React, { useState, useEffect } from 'react';
import { WorkProject } from '../../types/content';
import { loadWorkProjects } from '../../utils/contentLoader';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Search, Filter } from 'lucide-react';
import ScrollFade from '../ScrollFade';

interface WorkFormData {
  title: string;
  subtitle: string;
  description: string;
  timeline: string;
  impact: string;
  category: string;
  tools: string;
  tags: string;
}

const WorkCMS = () => {
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [editingProject, setEditingProject] = useState<WorkProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, setValue } = useForm<WorkFormData>();

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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.metadata.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleEditProject = (project: WorkProject) => {
    setEditingProject(project);
    setValue('title', project.title);
    setValue('subtitle', project.subtitle);
    setValue('description', project.description);
    setValue('timeline', project.timeline);
    setValue('impact', project.impact);
    setValue('category', project.metadata.category);
    setValue('tools', project.metadata.tools.join(', '));
    setValue('tags', project.metadata.tags.join(', '));
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingProject(null);
    reset();
  };

  const onSubmit = (data: WorkFormData) => {
    console.log('Saving project:', data);
    // TODO: Implement actual save functionality
    setIsCreating(false);
    setEditingProject(null);
    reset();
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gryd-soft w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gryd-soft/20 rounded-md bg-white text-gryd-text focus:border-gryd-accent focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="live">Live</option>
          <option value="prototype">Prototype</option>
          <option value="ongoing">Ongoing</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {(isCreating || editingProject) && (
        <Card className="border-gryd-soft/20">
          <CardHeader>
            <CardTitle className="subhead text-gryd-text">
              {isCreating ? 'Create New Project' : 'Edit Project'}
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
                    setIsCreating(false);
                    setEditingProject(null);
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
        {filteredProjects.map((project, index) => (
          <ScrollFade key={project.slug} delay={index * 100}>
            <Card className="border-gryd-soft/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="subhead text-gryd-text mb-2">{project.title}</h3>
                        <p className="body text-gryd-soft mb-3">{project.subtitle}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getStatusColor(project.metadata.status)}>
                            {project.metadata.status}
                          </Badge>
                          <Badge variant="outline" className="border-gryd-soft/20 text-gryd-text">
                            {project.metadata.category}
                          </Badge>
                          {project.metadata.featured && (
                            <Badge className="bg-gryd-accent/10 text-gryd-accent">Featured</Badge>
                          )}
                        </div>
                      </div>
                      {project.metadata.assets.hero && (
                        <div className="w-20 h-20">
                          <img 
                            src={project.metadata.assets.hero} 
                            alt={project.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="caption text-gryd-soft">Timeline:</span>
                        <span className="ml-2 body text-gryd-text">{project.timeline}</span>
                      </div>
                      <div>
                        <span className="caption text-gryd-soft">Impact:</span>
                        <span className="ml-2 body text-gryd-accent">{project.impact}</span>
                      </div>
                      <div>
                        <span className="caption text-gryd-soft">Updated:</span>
                        <span className="ml-2 body text-gryd-text">
                          {new Date(project.metadata.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {project.metadata.tools.length > 0 && (
                      <div className="mt-4">
                        <span className="caption text-gryd-soft block mb-2">Tools:</span>
                        <div className="flex flex-wrap gap-1">
                          {project.metadata.tools.map((tool, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-gryd-soft/20 text-gryd-soft">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 mt-6">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditProject(project)}
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
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollFade>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="body text-gryd-soft">No projects found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default WorkCMS;
