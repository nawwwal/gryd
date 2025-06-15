
import React, { useState, useEffect } from 'react';
import { ContentItem, ContentMetadata } from '../../types/content';
import { loadWorkProjects, loadPlaygroundExperiments } from '../../utils/contentLoader';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import ScrollFade from '../ScrollFade';

const CMSInterface = () => {
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState<ContentMetadata['type'] | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [projects, experiments] = await Promise.all([
          loadWorkProjects(),
          loadPlaygroundExperiments()
        ]);
        setAllContent([...projects, ...experiments]);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const filteredContent = filter === 'all' 
    ? allContent 
    : allContent.filter(item => item.metadata.type === filter);

  const contentTypes: (ContentMetadata['type'] | 'all')[] = [
    'all', 'blog', 'code', 'photography', 'prototype', 'research', 'visual', 'note'
  ];

  const getStatusColor = (status: ContentMetadata['status']) => {
    switch (status) {
      case 'live': return 'bg-green-500';
      case 'prototype': return 'bg-blue-500';
      case 'ongoing': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      case 'draft': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="cms-interface p-8">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="body text-gryd-soft">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cms-interface p-8 max-w-7xl mx-auto">
      <ScrollFade>
        <div className="cms-header mb-8">
          <h1 className="headline mb-4">Content Management</h1>
          <p className="body text-gryd-soft mb-6">
            Manage your work projects and playground experiments
          </p>
          
          <div className="cms-stats grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="stat-card bg-gryd-soft/5 p-4 rounded-lg">
              <div className="subhead">{allContent.length}</div>
              <div className="caption text-gryd-soft">Total Items</div>
            </div>
            <div className="stat-card bg-gryd-soft/5 p-4 rounded-lg">
              <div className="subhead">{allContent.filter(c => c.metadata.status === 'live').length}</div>
              <div className="caption text-gryd-soft">Live</div>
            </div>
            <div className="stat-card bg-gryd-soft/5 p-4 rounded-lg">
              <div className="subhead">{allContent.filter(c => c.metadata.featured).length}</div>
              <div className="caption text-gryd-soft">Featured</div>
            </div>
            <div className="stat-card bg-gryd-soft/5 p-4 rounded-lg">
              <div className="subhead">{allContent.filter(c => c.metadata.status === 'draft').length}</div>
              <div className="caption text-gryd-soft">Drafts</div>
            </div>
          </div>
        </div>
      </ScrollFade>

      <ScrollFade delay={200}>
        <div className="cms-filters mb-8">
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </ScrollFade>

      <div className="cms-content-grid grid gap-6">
        {filteredContent.map((item, index) => (
          <ScrollFade key={item.slug} delay={index * 100}>
            <Card className="content-item hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="body font-medium mb-2">{item.title}</CardTitle>
                    <p className="caption text-gryd-soft mb-3">{item.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="capitalize">
                        {item.metadata.type}
                      </Badge>
                      <Badge className={`text-white ${getStatusColor(item.metadata.status)}`}>
                        {item.metadata.status}
                      </Badge>
                      {item.metadata.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                  </div>
                  {item.metadata.assets.hero && (
                    <div className="w-20 h-20 ml-4">
                      <img 
                        src={item.metadata.assets.hero} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="content-meta space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gryd-soft">Category:</span>
                    <span className="font-medium">{item.metadata.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gryd-soft">Last Updated:</span>
                    <span className="font-medium">
                      {new Date(item.metadata.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  {item.metadata.tools.length > 0 && (
                    <div className="tools-list">
                      <span className="text-sm text-gryd-soft mb-2 block">Tools:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.metadata.tools.map((tool, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="content-actions flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                    {item.metadata.interactive?.hasDemo && (
                      <Button size="sm" variant="outline">
                        View Demo
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollFade>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="body text-gryd-soft">No content found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default CMSInterface;
