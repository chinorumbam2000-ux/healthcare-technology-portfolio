import { WHY_NOW } from './signal';

/** A plain arrow: points right in a row, and is turned to point down when the flow stacks. */
function FlowArrow() {
  return (
    <svg className="fit-flow__arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Stage 4, Why Now: why this moment, the evidence, today's surveillance
 * landscape, where Signal is meant to sit within it, and the AI-governance
 * expectation that shapes the design.
 */
export default function WhyNow() {
  const { landscape, fit, ai } = WHY_NOW;
  return (
    <section className="case-section" aria-labelledby="why-now-title">
      <div className="container case-section__grid">
        <h2 id="why-now-title" className="case-section__title">
          {WHY_NOW.heading}
        </h2>
        <div className="why-now">
          <p className="why-now__lead">{WHY_NOW.lead}</p>
          <p className="why-now__intro">{WHY_NOW.intro}</p>

          <ul role="list" className="evidence evidence--stacked" aria-label="Key evidence">
            {WHY_NOW.evidence.map((item) => (
              <li key={item.value} className="evidence__item">
                <p className="evidence__value">
                  {item.value}
                  {item.unit ? <span className="evidence__unit"> {item.unit}</span> : null}
                </p>
                <p className="evidence__text">{item.text}</p>
                <p className="evidence__source">Source: {item.source}</p>
              </li>
            ))}
          </ul>

          <div className="why-now__landscape">
            <h3 id="landscape-title" className="why-now__subhead">
              {landscape.heading}
            </h3>
            <dl className="landscape" aria-labelledby="landscape-title">
              {landscape.entries.map((entry) => (
                <div key={entry.name} className="landscape__entry">
                  <dt>{entry.name}</dt>
                  <dd>{entry.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="why-now__fit">
            <h3 id="fit-title" className="why-now__subhead">
              {fit.heading}
            </h3>
            <ol className="fit-flow" aria-labelledby="fit-title">
              {fit.flow.map((step, index) => (
                <li key={step} className="fit-flow__step">
                  {index > 0 ? <FlowArrow /> : null}
                  <span className={`fit-flow__node${index === fit.signalStep ? ' fit-flow__node--signal' : ''}`}>{step}</span>
                </li>
              ))}
            </ol>
            <p className="why-now__claim">{fit.claim}</p>
            <p className="why-now__text">{fit.text}</p>
          </div>

          <div className="why-now__ai">
            <h3 className="why-now__subhead">{ai.heading}</h3>
            <p className="why-now__text">{ai.text}</p>
          </div>

          <p className="why-now__source">{WHY_NOW.source}</p>
        </div>
      </div>
    </section>
  );
}
