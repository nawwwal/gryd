import React from 'react';
import { WorkProject } from '../../../types/content';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import ScrollFade from '../../ScrollFade';
import { Input } from '../../ui/input';
import { Search, Edit } from 'lucide-react';
import { getStatusColor } from '../../../utils/colorUtils';

interface WorkListViewProps {
  projects: WorkProject[];
  searchTerm: string;
  statusFilter: string;
  onSearchTermChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
  onEdit: (project: WorkProject) => void;
}

const WorkListView = ({
  projects,
  searchTerm,
  statusFilter,
  onSearchTermChange,
  onStatusFilterChange,
  onEdit,
}: WorkListViewProps) => {
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || project.metadata.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gryd-soft w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
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
                        onClick={() => onEdit(project)}
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
    </>
  );
};

export default WorkListView;
