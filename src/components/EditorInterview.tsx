
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
      <div className="interview-layout">
        {questions.map((item, index) => (
          <ScrollFade key={index} delay={index * 150}>
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
