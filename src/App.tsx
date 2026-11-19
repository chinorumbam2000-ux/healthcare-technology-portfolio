import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import SignalCaseStudy from './projects/signal/SignalCaseStudy';

/**
 * The portfolio shell: one header, one main region, one footer. Each project
 * is a case study under src/projects/; for now the Signal capstone is the page.
 */
export default function App() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <SignalCaseStudy />
      </main>
      <SiteFooter />
    </>
  );
}
