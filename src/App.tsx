import SectionNav from './components/SectionNav';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import SignalCaseStudy from './projects/signal/SignalCaseStudy';
import { SECTION_NAV } from './projects/signal/signal';

/**
 * The portfolio shell: a skip link, one header, the section navigation, one
 * main region, one footer. Each project is a case study under src/projects/;
 * for now the Signal capstone is the page.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <SectionNav items={SECTION_NAV} />
      <main id="main">
        <SignalCaseStudy />
      </main>
      <SiteFooter />
    </>
  );
}
