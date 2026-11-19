import { PITCH } from './signal';

/** Stage 2, The Pitch: the project in three paragraphs. */
export default function Pitch() {
  return (
    <section className="case-section" aria-labelledby="pitch-title">
      <div className="container case-section__grid">
        <h2 id="pitch-title" className="case-section__title">
          {PITCH.heading}
        </h2>
        <div className="case-section__body">
          {PITCH.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
