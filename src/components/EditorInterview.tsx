import ScrollFade from './ScrollFade';

const EditorInterview = () => {
  const questions = [
    {
      q: "How did you end up in design?",
      a: "Started in a CS classroom, got distracted by typography. Never looked back. What began as 'making college posters look less terrible' turned into obsessing over systems and stories."
    },
    {
      q: "What's the story behind 'Adi'?",
      a: "It's what friends call me. Aditya felt too formal for someone who spends half their day obsessing over 2px margins and the other half explaining why spacing matters."
    },
    {
      q: "Tell us about the Quicko journey.",
      a: "Joined as an intern in Jan 2024, went full-time in 6 months. It's where I learned that good design isn't just pretty—it's financial complexity made simple. Every pixel has purpose."
    },
    {
      q: "What drives your design philosophy?",
      a: "I want my work to feel inevitable. Like it couldn't exist any other way. Good design should make complex things feel obvious, not clever."
    },
    {
      q: "What's your creative process like?",
      a: "I start with problems, not solutions. Lots of questions, sketches on paper, then digital. I believe in shipping fast and iterating faster."
    }
  ];

  return (
    <div className="interview-section">
      {/* Editor Introduction */}
      <ScrollFade delay={0}>
        <div className="editor-intro">
          <p className="intro-text">
            ever-curious designer with an engineer's mind and an artist's eye. i care about how things feel, but also how they fail, especially when money's involved. design, for me, isn't just visual polish; it's control, behavior, memory. i love mixing history, math, and code to figure out why people hesitate, click, or trust.
          </p>
          <p className="intro-text">
            don't like to chase clicks or obsess over A/B tests – my best design leaps come from gut-level intuition, plain logic, and watching real people move through messy, unpredictable lives. inspiration finds me in crowded buses, street corners, and the unlikeliest moments.
          </p>
          <p className="intro-text">
            not here to make things trendy. here to make them make sense, and last.
          </p>
        </div>
      </ScrollFade>

      <div className="interview-layout">
        {questions.map((item, index) => (
          <ScrollFade key={index} delay={(index + 1) * 150}>
            <div className="qa-block">
              <div className="question">
                <span className="q-marker">Q:</span>
                <span className="question-text">{item.q}</span>
              </div>
              <div className="answer">
                <span className="a-marker">A:</span>
                <span className="answer-text">{item.a}</span>
              </div>
            </div>
          </ScrollFade>
        ))}
      </div>

      <ScrollFade delay={800}>
        <div className="interview-signature">
          <div className="signature-line">
            — Aditya, somewhere between logic and layout
          </div>
        </div>
      </ScrollFade>
    </div>
  );
};

export default EditorInterview;
