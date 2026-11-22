import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'Proof It Works' });
const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

const LEAD =
  'Signal was tested as working software across functionality, routing, accessibility, responsive behavior, and production deployment—not as a clinically validated surveillance system.';
const LIMITS =
  'Passing software tests does not mean Signal is clinically validated or proven to detect real-world outbreaks. The current public prototype uses synthetic data. Real deployment would require validation with appropriate healthcare and public-health partners, governance, security review, real-world data evaluation, and ongoing performance monitoring.';

describe('Stage 7: Proof It Works', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows See Signal in Action as its own section', () => {
    const demo = screen.getByRole('region', { name: 'See Signal in Action' });
    expect(demo.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → lead → intro → proof areas → summary → changes → limits → approach', () => {
    const order = [...section().querySelectorAll('h2, .proof__lead, .proof__intro, .proof-areas, .vsum, .proof__changes, .proof-limit, .proof__approach')].map(
      (el) => el.className.split(' ')[0],
    );
    expect(order).toEqual(['case-section__title', 'proof__lead', 'proof__intro', 'proof-areas', 'vsum', 'proof__changes', 'proof-limit', 'proof__approach']);
  });

  it('states the software-not-clinical distinction in the lead, word for word, then the intro', () => {
    expect(text(section().querySelector('.proof__lead'))).toBe(LEAD);
    expect(text(section().querySelector('.proof__intro'))).toBe(
      'Testing focused on whether the prototype behaves reliably as software: whether users can access the application, navigate surveillance workflows, review signals, use protected routes, interact with SMART-related routes, view the interface across screen sizes, and use the application with accessible keyboard and reduced-motion behavior. The prototype was also repeatedly checked after production deployments to confirm that new changes did not break existing functionality.',
    );
  });

  it('gives four proof areas, each a titled heading, its result and what it covers', () => {
    const areas = within(section()).getByRole('list', { name: 'Evidence summary' });
    const rows = [...areas.querySelectorAll(':scope > li')].map((li) => [
      text(li.querySelector('h3')),
      text(li.querySelector('.proof-area__metric')),
      text(li.querySelector('.proof-area__text')),
    ]);
    expect(rows).toEqual([
      [
        'Automated frontend testing',
        '933 / 933 tests passing',
        'Signal’s frontend test suite verifies application behavior, routing, surveillance views, authentication flows, component behavior, and regression-sensitive functionality.',
      ],
      [
        'Production browser validation',
        'Production smoke checks passed across deployed releases',
        'Browser-based checks were run against the live GitHub Pages deployment to verify navigation, sign-in, protected-route returns, SMART routes, surveillance views, and release-critical behavior.',
      ],
      [
        'Responsive & accessibility validation',
        '375 px → 1440 px',
        'Signal was checked across mobile, tablet, laptop, and desktop widths, with no horizontal scrolling in the tested layouts. Accessibility scans, keyboard navigation, focus behavior, and reduced-motion behavior were also tested.',
      ],
      [
        'Build integrity',
        'Typecheck + production build',
        'TypeScript type checking and production builds were run before release, helping catch implementation errors before deployment.',
      ],
    ]);
  });

  it('summarises the evidence in a four-part figure whose words carry every meaning', () => {
    const figure = within(section()).getByRole('figure', { name: 'Software validation summary' });
    const tiles = [...figure.querySelectorAll('li')].map((li) => [text(li.querySelector('.vsum__value')), text(li.querySelector('.vsum__label'))]);
    expect(tiles).toEqual([
      ['933 / 933', 'Frontend tests passing'],
      ['375–1440 px', 'Responsive layouts checked'],
      ['WCAG accessibility checks', 'Keyboard, focus, reduced motion and automated scans'],
      ['Production deployment checks', 'Routing, authentication, SMART routes and release smoke testing'],
    ]);
    // The icons only decorate: hidden from assistive technology, never the only cue.
    const icons = figure.querySelectorAll('svg');
    expect(icons).toHaveLength(4);
    icons.forEach((svg) => expect(svg.getAttribute('aria-hidden')).toBe('true'));
    expect(figure.querySelectorAll('img, canvas, [role="img"]')).toHaveLength(0);
    expect(text(figure)).not.toMatch(/clinic|accura|sensitiv|specific|detection|outcome|%/i);
  });

  it('shows 933 / 933 only as frontend software-test results', () => {
    const s = section();
    const hits = [...s.querySelectorAll('p')].filter((p) => p.children.length === 0 && /933/.test(p.textContent ?? ''));
    expect(hits.map((p) => p.className)).toEqual(['proof-area__metric', 'vsum__value vsum__value--figure']);
    expect(hits[0].closest('li')?.querySelector('h3')?.textContent).toBe('Automated frontend testing');
    expect(hits[1].nextElementSibling?.textContent).toBe('Frontend tests passing');
    expect(text(s).match(/933/g)).toHaveLength(4);
  });

  it('lists what testing changed, each a short title and one sentence', () => {
    const heading = within(section()).getByRole('heading', { level: 3, name: 'Testing changed the product' });
    const items = [...(heading.parentElement?.querySelectorAll('li') ?? [])].map((li) => [text(li.querySelector('h4')), text(li.querySelector('p'))]);
    expect(items).toEqual([
      ['Routing and sign-in', 'Protected routes were tested so signed-out users are redirected to /signin and returned to their intended destination after authentication.'],
      [
        'Landing-page simplification',
        'Duplicate hero calls to action were removed after reviewing the first-screen experience, leaving navigation and Sign in in the header.',
      ],
      [
        'Surveillance wording',
        'The Multi-profile monitoring description was broadened so the public landing page reflects multiple disease and syndrome profiles instead of implying a respiratory-only scope.',
      ],
      [
        'Responsive behavior',
        'Layouts were repeatedly checked at 375, 768, 1024, 1280 and 1440 px to catch spacing, overflow and visual-balance issues before deployment.',
      ],
      [
        'Accessibility',
        'Keyboard focus, heading structure, reduced-motion behavior, accessible labels and automated accessibility scans were incorporated into release checks.',
      ],
    ]);
    expect(within(section()).getByText('/signin').tagName).toBe('CODE');
  });

  it('states what this does not prove as a headed note, word for word', () => {
    const note = within(section()).getByRole('note', { name: 'What this does not prove' });
    expect(within(note).getByRole('heading', { level: 3, name: 'What this does not prove' })).toBeTruthy();
    expect(text(note.querySelector('.proof-limit__text'))).toBe(LIMITS);
    expect(note.querySelector('small')).toBeNull();
  });

  it('closes with the testing-approach line', () => {
    expect(text(section().querySelector('.proof__approach'))).toBe(
      'Testing approach: automated unit and component tests, TypeScript type checking, production builds, browser-based smoke checks, responsive testing, accessibility scans, keyboard testing, and production verification.',
    );
    expect(section().querySelector('.proof__approach strong')?.textContent).toBe('Testing approach:');
  });

  it('claims software reliability only: "clinical" appears only where it is denied, and no excluded claim appears', () => {
    const all = text(section());
    expect(all.match(/clinical/gi)).toHaveLength(2);
    expect(all).toContain('—not as a clinically validated surveillance system.');
    expect(all).toContain('does not mean Signal is clinically validated');
    for (const claim of [
      /\d+(\.\d+)?\s?%/, /accura/i, /sensitivity|specificity/i, /real-world validation/i, /validated (with|in|against) real/i,
      /hospital deployment|deployed (in|at|to) (a )?hospital/i, /patient outcome/i, /cost sav/i, /certif/i, /clinical safety/i, /detection accuracy/i,
    ]) {
      expect(all).not.toMatch(claim);
    }
  });

  it('adds no links, screenshots, raw logs or code listings', () => {
    const s = section();
    expect(within(s).queryAllByRole('link')).toHaveLength(0);
    expect(s.querySelectorAll('img, pre, table, iframe, video')).toHaveLength(0);
    expect([...s.querySelectorAll('code')].map((c) => c.textContent)).toEqual(['/signin']);
  });
});
