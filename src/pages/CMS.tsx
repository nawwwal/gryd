
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CMSNavigation from '../components/cms/CMSNavigation';
import { loadWorkProjects, loadPlaygroundExperiments } from '../utils/contentLoader';
import { WorkProject, PlaygroundExperiment } from '../types/content';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FileText, Code, Plus, Edit, BarChart, TrendingUp, Clock, Star } from 'lucide-react';
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
      ongoing: items.filter(item => item.metadata.status === 'ongoing').length,
    };
  };

  const workStats = getStatusStats(workProjects);
  const playgroundStats = getStatusStats(playgroundExperiments);

  const recentContent = [...workProjects, ...playgroundExperiments]
    .sort((a, b) => new Date(b.metadata.lastUpdated).getTime() - new Date(a.metadata.lastUpdated).getTime())
    .slice(0, 5);

  const totalContent = workProjects.length + playgroundExperiments.length;
  const totalLive = workStats.live + playgroundStats.live;
  const totalFeatured = workStats.featured + playgroundStats.featured;

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
            <h1 className="headline text-gryd-text">Content Management Dashboard</h1>
            <p className="body text-gryd-soft">Overview of your portfolio and experiments</p>
          </div>
        </ScrollFade>

        <ScrollFade delay={50}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-gryd-soft/20 bg-gryd-soft/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gryd-text/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gryd-text" />
                  </div>
                  <div>
                    <div className="subhead text-gryd-text">{totalContent}</div>
                    <div className="caption text-gryd-soft">Total Content</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gryd-soft/20 bg-gryd-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gryd-accent/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-gryd-accent" />
                  </div>
                  <div>
                    <div className="subhead text-gryd-accent">{totalLive}</div>
                    <div className="caption text-gryd-soft">Live Items</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gryd-soft/20 bg-gryd-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gryd-accent/20 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-gryd-accent" />
                  </div>
                  <div>
                    <div className="subhead text-gryd-accent">{totalFeatured}</div>
                    <div className="caption text-gryd-soft">Featured</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gryd-soft/20 bg-gryd-soft/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gryd-soft/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gryd-soft" />
                  </div>
                  <div>
                    <div className="subhead text-gryd-soft">{workStats.ongoing + playgroundStats.ongoing}</div>
                    <div className="caption text-gryd-soft">In Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollFade delay={100}>
            <Card className="border-gryd-soft/20 bg-gryd-soft/5">
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
                  <div className="text-center p-3 bg-gryd-text/5 rounded-lg">
                    <div className="subhead text-gryd-text">{workStats.total}</div>
                    <div className="caption text-gryd-soft">Total Projects</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-accent/10 rounded-lg">
                    <div className="subhead text-gryd-accent">{workStats.live}</div>
                    <div className="caption text-gryd-soft">Live</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gryd-accent/10 rounded-lg">
                    <div className="subhead text-gryd-accent">{workStats.featured}</div>
                    <div className="caption text-gryd-soft">Featured</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-soft/10 rounded-lg">
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
            <Card className="border-gryd-soft/20 bg-gryd-soft/5">
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
                  <div className="text-center p-3 bg-gryd-text/5 rounded-lg">
                    <div className="subhead text-gryd-text">{playgroundStats.total}</div>
                    <div className="caption text-gryd-soft">Total Experiments</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-accent/10 rounded-lg">
                    <div className="subhead text-gryd-accent">{playgroundStats.live}</div>
                    <div className="caption text-gryd-soft">Live</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gryd-accent/10 rounded-lg">
                    <div className="subhead text-gryd-accent">{playgroundStats.featured}</div>
                    <div className="caption text-gryd-soft">Featured</div>
                  </div>
                  <div className="text-center p-3 bg-gryd-soft/10 rounded-lg">
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
