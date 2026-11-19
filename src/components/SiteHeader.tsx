import { OWNER_NAME, SITE_LABEL } from '../site';

/** The portfolio's identity bar. Section navigation joins it as stages are added. */
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <p className="site-header__identity">
          <span className="site-header__name">{OWNER_NAME}</span>
          <span className="site-header__label">{SITE_LABEL}</span>
        </p>
      </div>
    </header>
  );
}
