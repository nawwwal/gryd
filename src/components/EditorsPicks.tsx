
import ScrollFade from './ScrollFade';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const EditorsPicks = () => {
  const picks = [
    {
      icon: "📚",
      category: "Reading",
      title: "A Pattern Language",
      subtitle: "Christopher Alexander",
      note: "Architecture meets philosophy. Every designer should read this.",
      tooltip: "Currently reading this architectural masterpiece"
    },
    {
      icon: "🎬",
      category: "Watching",
      title: "Helvetica",
      subtitle: "Again",
      note: "Gary Hustwit's masterpiece. The 5th rewatch hits different.",
      tooltip: "Documentary about the world's most famous typeface"
    },
    {
      icon: "🧠",
      category: "Learning",
      title: "Neural Networks",
      subtitle: "From scratch",
      note: "Because understanding the math makes better design decisions.",
      tooltip: "Deep diving into AI fundamentals"
    },
    {
      icon: "🎵",
      category: "Listening",
      title: "Nils Frahm",
      subtitle: "All Melody",
      note: "Perfect background for late-night design sessions.",
      tooltip: "Ambient piano perfection for focus"
    },
    {
      icon: "🧘‍♂️",
      category: "Rituals",
      title: "Chai at 3:30",
      subtitle: "Again at 6. Again at midnight.",
      note: "The fuel of creativity. And overthinking.",
      tooltip: "Essential creative fuel throughout the day"
    },
    {
      icon: "🔍",
      category: "Exploring",
      title: "ASCII Art Generators",
      subtitle: "In CSS",
      note: "Useless but beautiful. The best kind of side project.",
      tooltip: "Building art with code constraints"
    },
    {
      icon: "💭",
      category: "Thinking About",
      title: "Memory Systems",
      subtitle: "How to remember life better",
      note: "Building tools to capture fleeting thoughts and moments.",
      tooltip: "Personal knowledge management experiments"
    },
    {
      icon: "🎯",
      category: "Looking For",
      title: "Design-led Teams",
      subtitle: "Solving messy problems",
      note: "Where strategy meets craft meets impact.",
      tooltip: "Open to opportunities in design-forward organizations"
    }
  ];

  return (
    <TooltipProvider>
      <div className="picks-grid">
        {picks.map((pick, index) => (
          <ScrollFade key={index} delay={index * 100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="pick-card">
                  <div className="pick-icon">{pick.icon}</div>
                  <div className="pick-content">
                    <div className="pick-category">{pick.category}</div>
                    <div className="pick-title">{pick.title}</div>
                    <div className="pick-subtitle">{pick.subtitle}</div>
                    <div className="pick-note">
                      {pick.note}
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="pick-tooltip"
                sideOffset={8}
              >
                <p>{pick.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </ScrollFade>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default EditorsPicks;
