import React from 'react';
import { PlaygroundExperiment } from '../../../types/content';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import ScrollFade from '../../ScrollFade';
import { Input } from '../../ui/input';
import { Search, Edit } from 'lucide-react';
import { getStatusColor, getIntensityColor } from '../../../utils/colorUtils';

interface PlaygroundListViewProps {
  experiments: PlaygroundExperiment[];
  searchTerm: string;
  typeFilter: string;
  onSearchTermChange: (term: string) => void;
  onTypeFilterChange: (type: string) => void;
  onEdit: (experiment: PlaygroundExperiment) => void;
}

const PlaygroundListView = ({
  experiments,
  searchTerm,
  typeFilter,
  onSearchTermChange,
  onTypeFilterChange,
  onEdit,
}: PlaygroundListViewProps) => {
  const filteredExperiments = experiments.filter((experiment) => {
    const matchesSearch =
      experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || experiment.metadata.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gryd-soft w-4 h-4" />
          <Input
            placeholder="Search experiments..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10 border-gryd-soft/20 focus:border-gryd-accent"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
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
                        onClick={() => onEdit(experiment)}
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
                        <Button size="sm" variant="outline" className="border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5">
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
    </>
  );
};

export default PlaygroundListView;
