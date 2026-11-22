import { RESPONSIBLE_AI } from './signal';

/** A plain arrow: points right in the row, and is turned to point down when the flow stacks. */
function FlowArrow() {
  return (
    <svg className="rai-flow__arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A person outline, marking the steps a person carries out. Decorative: the "Human step" tag says it in words. */
function PersonIcon() {
  return (
    <svg className="rai-flow__person" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <path d="M8 2.25a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 14c0-2.6 2.2-4.5 5-4.5s5 1.9 5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Stage 8, Responsible AI: where automation stops in Signal, the five areas
 * that shape it, a flow showing that people review every signal before any
 * investigation or decision, the risks and their controls, and what real-world
 * AI deployment would first require.
 *
 * The flow is an ordered list, so its order is announced; the two human steps
 * carry a visible "Human step" tag and a person icon as well as their fill, so
 * nothing depends on colour. From 1024px the flow spans the full content
 * width; everything else keeps the text column.
 */
export default function ResponsibleAI() {
  const { areas, flow, risks, boundary } = RESPONSIBLE_AI;
  return (
    <section className="case-section" aria-labelledby="rai-title">
      <div className="container case-section__grid rai-grid">
        <h2 id="rai-title" className="case-section__title">
          {RESPONSIBLE_AI.heading}
        </h2>

        <div className="rai__opening">
          <p className="rai__lead">{RESPONSIBLE_AI.lead}</p>
          <p className="rai__intro">{RESPONSIBLE_AI.intro}</p>
        </div>

        <ul role="list" className="rai-areas" aria-label="Responsible-AI areas">
          {areas.map((area) => (
            <li key={area.title} className="rai-area">
              <h3 className="rai-area__title">{area.title}</h3>
              <p className="rai-area__text">{area.text}</p>
            </li>
          ))}
        </ul>

        <figure className="rai-figure" aria-labelledby="rai-flow-title">
          <figcaption id="rai-flow-title" className="rai-figure__title">
            {flow.title}
          </figcaption>
          <ol className="rai-flow" aria-labelledby="rai-flow-title">
            {flow.steps.map((step, index) => (
              <li key={step.label} className="rai-flow__step">
                {index > 0 ? <FlowArrow /> : null}
                <span className={`rai-flow__node${step.human ? ' rai-flow__node--human' : ''}`}>
                  {step.human ? (
                    <span className="rai-flow__tag">
                      <PersonIcon />
                      Human step
                      <span className="sr-only">:</span>
                    </span>
                  ) : null}
                  <span className="rai-flow__label">{step.label}</span>
                </span>
              </li>
            ))}
          </ol>
        </figure>

        <div className="rai__more">
          <div className="rai__risks">
            <h3 id="rai-risks-title" className="rai__subhead">
              {risks.heading}
            </h3>
            <dl className="risks" aria-labelledby="rai-risks-title">
              {risks.pairs.map((pair) => (
                <div key={pair.risk} className="risks__pair">
                  <dt>{pair.risk}</dt>
                  <dd>
                    <span className="risks__label">Control:</span> {pair.control}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rai-note" role="note" aria-labelledby="rai-note-title">
            <h3 id="rai-note-title" className="rai-note__title">
              <svg className="rai-note__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path
                  d="M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5ZM12 11v5.5M12 7.75v.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {boundary.heading}
            </h3>
            <p className="rai-note__text">{boundary.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
