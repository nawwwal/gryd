
import ScrollFade from '../components/ScrollFade';

const About = () => {
  return (
    <div className="space-y-16 pt-8">
      <ScrollFade>
        <h1 className="text-5xl font-bold lowercase">about</h1>
      </ScrollFade>

      <ScrollFade>
        <div className="max-w-3xl space-y-8 text-lg leading-relaxed">
          <p>
            i started breaking websites in 2015 because i couldn't afford to hire someone to build mine.
            turned out i was pretty good at making things that shouldn't work, work.
          </p>
          
          <p>
            spent the next few years building products for startups that were either going to make it big
            or die trying. most died. but the ones that lived taught me everything about building under pressure.
          </p>
          
          <p>
            these days i help companies figure out why their users hate them.
            usually it's because they built what they wanted, not what people needed.
            i fix that.
          </p>
          
          <p>
            i work fast, think differently, and don't charge for meetings that should have been emails.
            if you're building something that keeps you up at night, we should probably talk.
          </p>
          
          <p className="text-gryd-soft">
            currently based in the timezone where good coffee happens.
            available for projects that matter.
          </p>
        </div>
      </ScrollFade>

      <ScrollFade>
        <div className="inline-block">
          <div className="px-4 py-2 border border-gryd-accent/30 text-gryd-accent text-sm lowercase">
            last updated: december 2024
          </div>
        </div>
      </ScrollFade>
    </div>
  );
};

export default About;
