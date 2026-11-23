import ExternalLink from '../../components/ExternalLink';
import { CREDITS, REFLECTION } from './signal';

/**
 * Stage 10B, What I Learned and Credits. Two sections that continue the
 * project close straight after About Me & This Project: no dividing rule and
 * a shorter top margin, so they read as part of it, each under its own
 * heading. The reflection keeps a comfortable reading width; the credits are
 * plain text rows, with no logos.
 */
export default function ReflectionCredits() {
  const { project, resources } = CREDITS;
  return (
    <>
      <section className="case-section case-section--close" aria-labelledby="reflection-title">
        <div className="container case-section__grid">
          <h2 id="reflection-title" className="case-section__title">
            {REFLECTION.heading}
          </h2>
          <div className="reflection">
            {REFLECTION.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="reflection__text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-section--close" aria-labelledby="credits-title">
        <div className="container case-section__grid">
          <h2 id="credits-title" className="case-section__title">
            {CREDITS.heading}
          </h2>
          <div className="credits">
            <h3 className="credits__subhead">{project.heading}</h3>
            <p className="credits__text">{project.text}</p>

            <h3 id="credits-resources-title" className="credits__subhead credits__subhead--spaced">
              {resources.heading}
            </h3>
            <dl className="credits-list" aria-labelledby="credits-resources-title">
              {resources.groups.map((group) => (
                <div key={group.name} className="credits-list__row">
                  <dt>{group.name}</dt>
                  <dd>
                    <ul role="list" className="credits-list__items">
                      {group.items.map((item, index) => [
                        index > 0 ? ' ' : null,
                        <li key={item}>
                          {item}
                          {item === resources.osm.item ? (
                            <>
                              {' '}
                              (
                              <ExternalLink href={resources.osm.href} className="credits__link">
                                {resources.osm.credit}
                              </ExternalLink>
                              )
                            </>
                          ) : null}
                        </li>,
                      ])}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="credits__note">{resources.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
