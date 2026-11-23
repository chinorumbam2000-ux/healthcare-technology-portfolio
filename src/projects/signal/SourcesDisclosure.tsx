import ExternalLink from '../../components/ExternalLink';
import { AI_DISCLOSURE, SOURCES } from './signal';

/**
 * Stage 10C, Sources and AI Use Disclosure: the page's back matter.
 *
 * Sources opens it with a rule; the disclosure follows without one. The
 * references are an unnumbered list in APA order, each with a hanging indent,
 * its title in italics and its URL as a link that opens in a new tab (the
 * portfolio's usual announced external link). Long URLs may break anywhere,
 * so nothing runs past the column on a phone.
 */
export default function SourcesDisclosure() {
  const { tools, distinction } = AI_DISCLOSURE;
  return (
    <>
      <section className="case-section" aria-labelledby="sources-title">
        <div className="container case-section__grid">
          <h2 id="sources-title" className="case-section__title">
            {SOURCES.heading}
          </h2>
          <div className="sources">
            <p className="sources__intro">{SOURCES.intro}</p>
            <ul role="list" className="references" aria-labelledby="sources-title">
              {SOURCES.references.map((ref) => (
                <li key={ref.url} className="reference">
                  {ref.author} {ref.date} <cite>{ref.title}</cite>
                  {ref.after}{' '}
                  <ExternalLink href={ref.url} className="reference__url">
                    {ref.url}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-section case-section--close" aria-labelledby="ai-disclosure-title">
        <div className="container case-section__grid">
          <h2 id="ai-disclosure-title" className="case-section__title">
            {AI_DISCLOSURE.heading}
          </h2>
          <div className="disclosure">
            <p className="disclosure__opening">{AI_DISCLOSURE.opening}</p>
            {tools.map((tool) => (
              <div key={tool.name} className="disclosure__tool">
                <h3 className="disclosure__subhead">{tool.name}</h3>
                <p className="disclosure__text">{tool.text}</p>
              </div>
            ))}
            <div className="disclosure__distinction">
              <h3 className="disclosure__subhead">{distinction.heading}</h3>
              <p className="disclosure__text">{distinction.text}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
