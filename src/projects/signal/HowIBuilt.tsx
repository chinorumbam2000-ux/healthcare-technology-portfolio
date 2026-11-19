import { BUILT } from './signal';

/** A plain arrow: points right in the row, and is turned to point down when the flow stacks. */
function ArchArrow() {
  return (
    <svg className="arch-flow__arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Stage 5, How I Built Signal: the intended architecture, why it is a
 * sidecar, the technology stack, and the key design decisions.
 *
 * The architecture figure spans the full content width from 1024px (it is the
 * section's main visual); everything else keeps the text column.
 */
export default function HowIBuilt() {
  const { stack, decisions } = BUILT;
  return (
    <section className="case-section" aria-labelledby="built-title">
      <div className="container case-section__grid built-grid">
        <h2 id="built-title" className="case-section__title">
          {BUILT.heading}
        </h2>
        <p className="built__lead">{BUILT.lead}</p>

        <figure className="arch">
          <ol className="arch-flow" aria-label="Signal architecture, in order">
            {BUILT.flow.map((step, index) => (
              <li key={step} className="arch-flow__step">
                {index > 0 ? <ArchArrow /> : null}
                <span className={`arch-flow__node${index === BUILT.signalStep ? ' arch-flow__node--signal' : ''}`}>{step}</span>
              </li>
            ))}
          </ol>
          <figcaption className="arch__caption">{BUILT.caption}</figcaption>
        </figure>

        <div className="built">
          <p className="built__text">{BUILT.explanation}</p>

          <div className="built__stack">
            <h3 id="stack-title" className="built__subhead">
              {stack.heading}
            </h3>
            <dl className="stack" aria-labelledby="stack-title">
              {stack.entries.map((entry) => (
                <div key={entry.area} className="stack__entry">
                  <dt>{entry.area}</dt>
                  <dd>
                    <span className="stack__tech">{entry.tech}</span>
                    <span className="stack__text">{entry.text}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="built__decisions">
            <h3 className="built__subhead">{decisions.heading}</h3>
            <ul role="list" className="decisions">
              {decisions.items.map((item) => (
                <li key={item.title} className="decision">
                  <h4 className="decision__title">{item.title}</h4>
                  <p className="decision__line">
                    <span className="decision__label">Decision:</span> {item.decision}
                  </p>
                  <p className="decision__line">
                    <span className="decision__label">Why:</span> {item.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
