import { COPYRIGHT, TRADEMARK } from '../site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{COPYRIGHT}</p>
        <p>{TRADEMARK}</p>
      </div>
    </footer>
  );
}
