
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CMSNavigation from '../components/cms/CMSNavigation';
import { loadWorkProjects, loadPlaygroundExperiments } from '../utils/contentLoader';
import { WorkProject, PlaygroundExperiment } from '../types/content';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FileText, Code, Plus, Edit, BarChart } from 'lucide-react';
import ScrollFade from '../components/ScrollFade';

const CMS = () => {
  const [workProjects, setWorkProjects] = useState<WorkProject[]>([]);
  const [playgroundExperiments, setPlaygroundExperiments] = useState<PlaygroundExperiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [work, playground] = await Promise.all([
          loadWorkProjects(),
          loadPlaygroundExperiments()
        ]);
        setWorkProjects(work);
        setPlaygroundExperiments(playground);
      } catch (error) {
        console.error('Failed to load CMS data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusStats = (items: any[]) => {
    return {
      total: items.length,
      live: items.filter(item => item.metadata.status === 'live').length,
      draft: items.filter(item => item.metadata.status === 'draft').length,
      featured: items.filter(item => item.metadata.featured).length,
    };
  };

  const workStats = getStatusStats(workProjects);
  const playgroundStats = getStatusStats(playgroundExperiments);

  const recentContent = [...workProjects, ...playgroundExperiments]
    .sort((a, b) => new Date(b.metadata.lastUpdated).getTime() - new Date(a.metadata.lastUpdated).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <CMSNavigation />
        <div className="editorial-container py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gryd-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="body text-gryd-soft">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CMSNavigation />
      <div className="editorial-container py-8 space-y-8">
        <ScrollFade>
          <div className="space-y-2">
            <h1 className="headline text-gryd-text">Content Management System</h1>
            <p className="body text-gryd-soft">Manage your portfolio and experiments</p>
          </div>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollFade delay={100}>
            <Card className="border-gryd-soft/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="subhead text-gryd-text flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Work Portfolio
                  </CardTitle>
                  <Link to="/cms/work">
                    <Button size="sm" className="bg-gryd-accent hover:bg-gryd-accent/90 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="subhead text-gryd-text">{workStats.total}</div>
                    <div className="caption text-gryd-soft">Total Projects</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-accent/10 rounded-lg">
                    <div className="subhead text-gryd-accent">{workStats.live}</div>
                    <div className="caption text-gryd-soft">Live</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="subhead text-gryd-text">{workStats.featured}</div>
                    <div className="caption text-gryd-soft">Featured</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="subhead text-gryd-soft">{workStats.draft}</div>
                    <div className="caption text-gryd-soft">Drafts</div>
                  </div>
                </div>
                <Link to="/cms/work" className="block mt-4">
                  <Button variant="outline" className="w-full border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollFade>

          <ScrollFade delay={200}>
            <Card className="border-gryd-soft/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="subhead text-gryd-text flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Playground
                  </CardTitle>
                  <Link to="/cms/playground">
                    <Button size="sm" className="bg-gryd-accent hover:bg-gryd-accent/90 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="subhead text-gryd-text">{playgroundStats.total}</div>
                    <div className="caption text-gryd-soft">Total Experiments</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-accent/10 rounded-lg">
                    <div className="subhead text-gryd-accent">{playgroundStats.live}</div>
                    <div className="caption text-gryd-soft">Live</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="subhead text-gryd-text">{playgroundStats.featured}</div>
                    <div className="caption text-gryd-soft">Featured</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="subhead text-gryd-soft">{playgroundStats.draft}</div>
                    <div className="caption text-gryd-soft">Drafts</div>
                  </div>
                </div>
                <Link to="/cms/playground" className="block mt-4">
                  <Button variant="outline" className="w-full border-gryd-soft/20 text-gryd-text hover:bg-gryd-soft/5">
                    <Plus className="w-4 h-4 mr-2" />
                    New Experiment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollFade>
        </div>

        <ScrollFade delay={300}>
          <Card className="border-gryd-soft/20">
            <CardHeader>
              <CardTitle className="subhead text-gryd-text flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.map((item, index) => (
                  <div key={item.slug} className="flex items-center justify-between p-3 bg-gryd-soft/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gryd-accent/10 rounded-lg flex items-center justify-center">
                        {'timeline' in item ? <FileText className="w-4 h-4 text-gryd-accent" /> : <Code className="w-4 h-4 text-gryd-accent" />}
                      </div>
                      <div>
                        <h4 className="body font-medium text-gryd-text">{item.title}</h4>
                        <p className="caption text-gryd-soft">{item.metadata.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${
                        item.metadata.status === 'live' ? 'text-gryd-accent bg-gryd-accent/10' :
                        item.metadata.status === 'draft' ? 'text-gryd-soft bg-gryd-soft/10' :
                        item.metadata.status === 'ongoing' ? 'text-gryd-accent bg-gryd-accent/10' :
                        'text-gryd-soft bg-gryd-soft/5'
                      }`}>
                        {item.metadata.status}
                      </Badge>
                      <span className="caption text-gryd-soft">
                        {new Date(item.metadata.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollFade>
      </div>
    </div>
  );
};

export default CMS;
