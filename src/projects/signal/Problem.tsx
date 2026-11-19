import type { CSSProperties } from 'react';
import { PROBLEM } from './signal';

/**
 * Stage 3, The Problem Worth Solving: the lead statement, the evidence, a
 * single-series bar chart, who is involved, and why Signal exists.
 *
 * The chart is a plain HTML list, so it reads as text without styles or
 * colour: each row is its label followed by its value ("Cost challenges 33%").
 * The bars are decorative (aria-hidden); the printed value carries the number.
 * Every value is labelled at its bar's tip, so there is no axis and no tooltip.
 */
export default function Problem() {
  const { chart, stakeholders } = PROBLEM;
  return (
    <section className="case-section" aria-labelledby="problem-title">
      <div className="container case-section__grid">
        <h2 id="problem-title" className="case-section__title">
          {PROBLEM.heading}
        </h2>
        <div className="problem">
          <p className="problem__lead">{PROBLEM.lead}</p>
          <p className="problem__intro">{PROBLEM.intro}</p>

          <ul role="list" className="evidence" aria-label="Key evidence">
            {PROBLEM.evidence.map((item) => (
              <li key={item.value} className="evidence__item">
                <p className="evidence__value">{item.value}</p>
                <p className="evidence__text">{item.text}</p>
              </li>
            ))}
          </ul>

          <figure className="bar-chart" aria-labelledby="problem-chart-title">
            <figcaption className="bar-chart__caption">
              <span id="problem-chart-title" className="bar-chart__title">
                {chart.title}
              </span>
              <span className="bar-chart__subtitle">{chart.subtitle}</span>
            </figcaption>
            <ul role="list" className="bar-chart__rows">
              {chart.rows.map((row) => (
                <li key={row.label} className="bar-chart__row">
                  <span className="bar-chart__label">{row.label}</span>
                  <span className="bar-chart__plot">
                    <span className="bar-chart__bar" aria-hidden="true" style={{ '--value': row.value } as CSSProperties} />
                    <span className="bar-chart__value">{row.value}%</span>
                  </span>
                </li>
              ))}
            </ul>
          </figure>

          <div className="stakeholders">
            <p id="stakeholders-label" className="stakeholders__label">
              {stakeholders.label}
            </p>
            <ol className="stakeholders__flow" aria-labelledby="stakeholders-label">
              {stakeholders.flow.map((name, index) => (
                <li key={name}>
                  {/* The arrow leads into its stakeholder, so a wrapped row starts with it. */}
                  {index > 0 ? (
                    <span className="stakeholders__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  {name}
                </li>
              ))}
            </ol>
          </div>

          <p className="problem__closing">{PROBLEM.closing}</p>
          <p className="problem__source">{PROBLEM.source}</p>
        </div>
      </div>
    </section>
  );
}
