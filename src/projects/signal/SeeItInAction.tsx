import ExternalLink from '../../components/ExternalLink';
import { DEMO } from './signal';

/**
 * Stage 6, See Signal in Action: the narrated walkthrough, embedded.
 *
 * The player is YouTube's own (privacy-enhanced domain): its controls, captions
 * and keyboard support come with it. It never starts by itself: there is no
 * autoplay, loop or mute parameter, and the iframe's permissions leave out
 * autoplay. "Watch on YouTube" is there for when the embed cannot load.
 *
 * Like the Stage 5 architecture figure, the video spans the full content width
 * from 1024px; the intro keeps the text column beside the heading.
 */
export default function SeeItInAction() {
  const { video } = DEMO;
  return (
    <section className="case-section" aria-labelledby="demo-title">
      <div className="container case-section__grid demo-grid">
        <h2 id="demo-title" className="case-section__title">
          {DEMO.heading}
        </h2>
        <p className="demo__intro">{DEMO.intro}</p>

        <div className="demo__media">
          <div className="demo__frame">
            <iframe
              src={video.embedUrl}
              title={video.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="demo__meta">
            <p className="demo__labels">{DEMO.labels}</p>
            <ExternalLink href={video.watchUrl} className="demo__fallback">
              {DEMO.fallback}
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
