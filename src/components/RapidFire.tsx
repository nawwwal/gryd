
import ScrollFade from './ScrollFade';

const RapidFire = () => {
  const rapidFire = [
    { q: "Coffee or Tea?", a: "Chai, always chai" },
    { q: "Figma or Sketch?", a: "Figma. Is this even a question anymore?" },
    { q: "Favorite Font?", a: "Inter for everything, Tiempos for dreams" },
    { q: "Design Inspiration?", a: "Japanese packaging, old National Geographic" },
    { q: "Guilty Pleasure?", a: "Spending 3 hours perfecting a hover state" },
    { q: "Best Design Advice?", a: "Ship it. Perfect is the enemy of good." },
    { q: "Work Soundtrack?", a: "Lo-fi hip hop or complete silence" },
    { q: "Dream Project?", a: "Design system for a space mission" }
  ];

  return (
    <div className="rapid-fire-grid">
      {rapidFire.map((item, index) => (
        <ScrollFade key={index} delay={index * 80}>
          <div className="rapid-fire-card">
            <div className="rapid-question">{item.q}</div>
            <div className="rapid-answer">{item.a}</div>
          </div>
        </ScrollFade>
      ))}
    </div>
  );
};

export default RapidFire;
