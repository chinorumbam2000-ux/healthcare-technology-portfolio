import { PROOF } from './signal';

type SummaryIcon = (typeof PROOF.summary.items)[number]['icon'];

/**
 * Line icons for the validation summary. Decorative: each tile's words carry
 * its meaning, so the summary reads the same without them or without colour.
 */
function Icon({ name }: { name: SummaryIcon }) {
  const paths: Record<SummaryIcon, string> = {
    // A checked box: tests passing.
    tests: 'M4 3.5h16a.5.5 0 0 1 .5.5v16a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5ZM8 12.2l2.7 2.7L16.2 9.4',
    // A phone beside a monitor: screen widths.
    responsive: 'M9 4.5h11.5v10H9zM14.75 14.5v4M11.5 18.5h6.5M3.5 9.5h5v10h-5zM5.5 17.5h1',
    // A person in a circle: accessibility.
    accessibility: 'M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5ZM12 7.4v.1M7.75 10l4.25 1 4.25-1M12 11v3.25M12 14.25l-2.5 3.5M12 14.25l2.5 3.5',
    // An arrow rising from a tray: deploying a release.
    deployment: 'M12 15V4.5M7.75 8.75 12 4.5l4.25 4.25M4.5 13.5v5.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-5.5',
  };
  return (
    <svg className="vsum__icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Shows text between backticks as code (the `/signin` route). */
function WithCode({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, index) => (index % 2 === 1 ? <code key={part}>{part}</code> : part))}
    </>
  );
}

/**
 * Stage 7, Proof It Works: the evidence that Signal works as software, and
 * where that evidence stops. Every figure here is a software-test result; the
 * section says so in its lead and closes with what it does not prove.
 *
 * From 1024px the validation summary spans the full content width (the
 * section's main visual); everything else keeps the text column.
 */
export default function ProofItWorks() {
  const { summary, changes, limits, approach } = PROOF;
  return (
    <section className="case-section" aria-labelledby="proof-title">
      <div className="container case-section__grid proof-grid">
        <h2 id="proof-title" className="case-section__title">
          {PROOF.heading}
        </h2>

        <div className="proof__opening">
          <p className="proof__lead">{PROOF.lead}</p>
          <p className="proof__intro">{PROOF.intro}</p>
        </div>

        <ul role="list" className="proof-areas" aria-label="Evidence summary">
          {PROOF.areas.map((area) => (
            <li key={area.title} className="proof-area">
              <h3 className="proof-area__title">{area.title}</h3>
              <p className="proof-area__metric">{area.metric}</p>
              <p className="proof-area__text">{area.text}</p>
            </li>
          ))}
        </ul>

        <figure className="vsum" aria-labelledby="vsum-title">
          <figcaption id="vsum-title" className="vsum__title">
            {summary.title}
          </figcaption>
          <ul role="list" className="vsum__items">
            {summary.items.map((item) => (
              <li key={item.value} className="vsum__item">
                <Icon name={item.icon} />
                <p className={`vsum__value${item.figure ? ' vsum__value--figure' : ''}`}>{item.value}</p>
                <p className="vsum__label">{item.label}</p>
              </li>
            ))}
          </ul>
        </figure>

        <div className="proof__more">
          <div className="proof__changes">
            <h3 className="proof__subhead">{changes.heading}</h3>
            <ul role="list" className="changes">
              {changes.items.map((item) => (
                <li key={item.title} className="change">
                  <h4 className="change__title">{item.title}</h4>
                  <p className="change__text">
                    <WithCode text={item.text} />
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="proof-limit" role="note" aria-labelledby="proof-limit-title">
            <h3 id="proof-limit-title" className="proof-limit__title">
              <svg className="proof-limit__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path
                  d="M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5ZM12 11v5.5M12 7.75v.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {limits.heading}
            </h3>
            <p className="proof-limit__text">{limits.text}</p>
          </div>

          <p className="proof__approach">
            <strong>{approach.label}</strong> {approach.text}
          </p>
        </div>
      </div>
    </section>
  );
}
