import { render, screen, within } from '@testing-library/react';
import App from '../App';

const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
const page = () => (document.body.textContent ?? '').replace(/\s+/g, ' ');

const NAV = [
  ['Pitch', 'The Pitch'],
  ['Problem', 'The Problem Worth Solving'],
  ['Why Now', 'Why Now'],
  ['Build', 'How I Built Signal'],
  ['Demo', 'See Signal in Action'],
  ['Proof', 'Proof It Works'],
  ['Responsible AI', 'Responsible AI'],
  ['Impact', 'Business Impact & What’s Next'],
  ['About', 'About Me & This Project'],
];

describe('Final polish: section navigation and precision wording', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('starts with a Skip to content link to the main region', () => {
    const first = screen.getAllByRole('link')[0];
    expect(text(first)).toBe('Skip to content');
    expect(first.getAttribute('href')).toBe('#main');
    expect(document.getElementById('main')?.tagName).toBe('MAIN');
  });

  it('has one section navigation with exactly the nine labels, in order', () => {
    const nav = screen.getByRole('navigation', { name: 'Sections' });
    expect(within(nav).getAllByRole('link').map(text)).toEqual(NAV.map(([label]) => label));
    // Between the header and the main content, outside both.
    expect(screen.getByRole('banner').nextElementSibling).toBe(nav);
    expect(nav.nextElementSibling?.tagName).toBe('MAIN');
  });

  it('points every link at the heading of the right section', () => {
    const links = within(screen.getByRole('navigation', { name: 'Sections' })).getAllByRole('link');
    links.forEach((a, i) => {
      const id = (a.getAttribute('href') ?? '').replace(/^#/, '');
      const target = document.getElementById(id);
      expect(target?.tagName).toBe('H2');
      expect(text(target)).toBe(NAV[i][1]);
      expect(target?.closest('section')?.getAttribute('aria-labelledby')).toBe(id);
    });
  });

  it('keeps the Try It Now links first within the main content', () => {
    const main = within(screen.getByRole('main')).getAllByRole('link');
    expect(main.slice(0, 2).map((a) => a.getAttribute('href'))).toEqual([
      'https://chinorumbam2000-ux.github.io/signal-by-probesyq/',
      'https://github.com/chinorumbam2000-ux/signal-by-probesyq',
    ]);
  });

  it('describes the sidecar precisely in the Pitch, still 150–300 words', () => {
    const pitch = screen.getByRole('region', { name: 'The Pitch' });
    const body = [...pitch.querySelectorAll('p')].map(text);
    expect(body[0].startsWith(
      'Signal by ProbeSyQ is a vendor-agnostic outbreak intelligence sidecar designed to integrate alongside existing clinical systems and help healthcare and public-health teams make better use of routine laboratory data for earlier disease surveillance.',
    )).toBe(true);
    expect(page()).not.toMatch(/plug-and-play/i);
    const words = body.reduce((n, p) => n + p.split(' ').filter(Boolean).length, 0);
    expect(words).toBeGreaterThanOrEqual(150);
    expect(words).toBeLessThanOrEqual(300);
  });

  it('says the prototype demonstrated, not validated, the concept', () => {
    const built = screen.getByRole('region', { name: 'How I Built Signal' });
    expect(text(built)).toContain('This allowed the core surveillance experience and product concept to be demonstrated before investing in production-scale integration.');
    expect(text(built)).not.toMatch(/to be validated/);
  });

  it('names the surveillance methods once, in How I Built Signal', () => {
    const sentence = 'Signal’s current surveillance logic uses interpretable methods including EWMA, CUSUM, and a composite signal score rather than relying on a black-box model.';
    expect(page().split(sentence)).toHaveLength(2);
    expect(text(screen.getByRole('region', { name: 'How I Built Signal' }).querySelector('.built__text'))).toContain(sentence);
    for (const term of [/EWMA/g, /CUSUM/g, /composite signal score/gi]) {
      expect(page().match(term)).toHaveLength(1);
    }
  });

  it('clarifies once, under the limits on AI, that Roella is rule-based', () => {
    const sentence = 'The current Roella assistant is rule-based and responds from Signal’s own application data; it is not powered by a large language model.';
    expect(page().split(sentence)).toHaveLength(2);
    expect(page().match(/Roella/g)).toHaveLength(1);
    const rai = screen.getByRole('region', { name: 'Responsible AI' });
    const limits = within(rai).getByRole('heading', { level: 3, name: 'Deliberate limits on AI' }).parentElement;
    expect(text(limits)).toContain(sentence);
  });
});
