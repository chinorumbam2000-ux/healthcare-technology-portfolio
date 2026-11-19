import ExternalLink from '../../components/ExternalLink';
import dashboardShot from './signal-dashboard.webp';
import { DASHBOARD_SHOT, DEMO_ACCESS, LIVE_APP_URL, SIGNAL, SOURCE_CODE_URL } from './signal';

/**
 * Stage 1, "Try It Now": the case study's hero. Its job is to show, within
 * seconds, that there is a working application, how to open it, how to sign
 * in, and where its source code is.
 */
export default function TryItNow() {
  return (
    <section className="try-it" aria-labelledby="signal-title">
      <div className="container">
        <p className="eyebrow">{SIGNAL.programLabel}</p>
        <h1 id="signal-title" className="try-it__title">
          {SIGNAL.title}
        </h1>
        <p className="try-it__lede">{SIGNAL.supportingLine}</p>

        <div className="try-it__actions">
          <ExternalLink href={LIVE_APP_URL} className="button button--primary">
            {SIGNAL.primaryCta}
          </ExternalLink>
          <ExternalLink href={SOURCE_CODE_URL} className="button button--secondary">
            {SIGNAL.secondaryCta}
          </ExternalLink>
        </div>

        <section className="demo-access" aria-labelledby="demo-access-title">
          <h2 id="demo-access-title" className="demo-access__title">
            Demo access
          </h2>
          <dl className="demo-access__fields">
            {DEMO_ACCESS.fields.map((field) => (
              <div key={field.label} className="demo-access__field">
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
          <p className="demo-access__note">{DEMO_ACCESS.note}</p>
        </section>

        <figure className="try-it__shot">
          <div className="try-it__frame">
            <img
              src={dashboardShot}
              width={DASHBOARD_SHOT.width}
              height={DASHBOARD_SHOT.height}
              alt={DASHBOARD_SHOT.alt}
              decoding="async"
            />
          </div>
          <figcaption>{DASHBOARD_SHOT.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
