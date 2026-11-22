import { BUSINESS } from './signal';

/**
 * Stage 9, Business Impact & What's Next: Signal's potential value, what an
 * implementation would cost (drivers only; no cost has been established), a
 * proposed phased adoption path, the prototype's current limitations, the
 * next-version roadmap, and the closing statement.
 *
 * The adoption path is the section's main visual and spans the full content
 * width from 1024px. Its four phases are an ordered list joined by a line:
 * every phase is drawn the same way (outlined, numbered, no check marks), so
 * none reads as done, and each says "Phase n" in words, so nothing depends
 * on colour.
 */
export default function BusinessImpact() {
  const { value, cost, path, limitations, roadmap } = BUSINESS;
  return (
    <section className="case-section" aria-labelledby="biz-title">
      <div className="container case-section__grid biz-grid">
        <h2 id="biz-title" className="case-section__title">
          {BUSINESS.heading}
        </h2>
        <p className="biz__lead">{BUSINESS.lead}</p>

        <div className="biz__first">
          <div className="biz__block">
            <h3 className="biz__subhead">{value.heading}</h3>
            <ul role="list" className="biz-values">
              {value.items.map((item) => (
                <li key={item.title} className="biz-value">
                  <h4 className="biz-value__title">{item.title}</h4>
                  <p className="biz-value__text">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="biz__block">
            <h3 id="biz-cost-title" className="biz__subhead">
              {cost.heading}
            </h3>
            <p className="biz__intro">{cost.intro}</p>
            <dl className="biz-rows" aria-labelledby="biz-cost-title">
              {cost.areas.map((entry) => (
                <div key={entry.area} className="biz-rows__row">
                  <dt>{entry.area}</dt>
                  <dd>{entry.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="biz-path">
          <h3 id="biz-path-title" className="biz__subhead">
            {path.heading}
          </h3>
          <ol role="list" className="phases" aria-labelledby="biz-path-title">
            {path.phases.map((phase, index) => (
              <li key={phase.name} className="phase">
                <span className="phase__marker" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="phase__body">
                  <h4 className="phase__title">
                    <span className="phase__step">
                      Phase {index + 1}
                      <span className="sr-only">:</span>
                    </span>{' '}
                    {phase.name}
                  </h4>
                  <p className="phase__text">{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="biz__more">
          <div className="biz__block biz__block--first">
            <h3 id="biz-limits-title" className="biz__subhead">
              {limitations.heading}
            </h3>
            <dl className="biz-rows" aria-labelledby="biz-limits-title">
              {limitations.items.map((item) => (
                <div key={item.title} className="biz-rows__row">
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="biz__block">
            <h3 id="biz-roadmap-title" className="biz__subhead">
              {roadmap.heading}
            </h3>
            <ol role="list" className="roadmap" aria-labelledby="biz-roadmap-title">
              {roadmap.items.map((item, index) => (
                <li key={item.title} className="roadmap__item">
                  <h4 className="roadmap__title">
                    <span className="roadmap__num">
                      {index + 1}
                      <span className="sr-only">.</span>
                    </span>{' '}
                    {item.title}
                  </h4>
                  <p className="roadmap__text">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="biz__closing">{BUSINESS.closing}</p>
        </div>
      </div>
    </section>
  );
}
