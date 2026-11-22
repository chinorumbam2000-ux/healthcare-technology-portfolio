import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'See Signal in Action' });
const player = () => within(section()).getByTitle('Signal by ProbeSyQ prototype walkthrough') as HTMLIFrameElement;

describe('Stage 6: See Signal in Action', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows How I Built Signal as its own section', () => {
    const built = screen.getByRole('region', { name: 'How I Built Signal' });
    expect(built.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → intro → video → supporting line → Watch on YouTube', () => {
    const order = [...section().querySelectorAll('h2, .demo__intro, iframe, .demo__labels, a')].map((el) => el.tagName === 'IFRAME' ? 'iframe' : el.className.split(' ')[0]);
    expect(order).toEqual(['case-section__title', 'demo__intro', 'iframe', 'demo__labels', 'demo__fallback']);
  });

  it('gives the intro and supporting line word for word', () => {
    expect(section().querySelector('.demo__intro')?.textContent).toBe(
      'Watch a walkthrough of the working Signal prototype, from surveillance monitoring and signal investigation to analytics, geographic intelligence, and the intended interoperability architecture.',
    );
    expect(section().querySelector('.demo__labels')?.textContent).toBe('Working prototype · Synthetic data · Narrated & captioned demo');
  });

  it('embeds the final video from the privacy-enhanced domain, with an accessible title', () => {
    const iframe = player();
    const src = new URL(iframe.getAttribute('src') ?? '');
    expect(src.origin).toBe('https://www.youtube-nocookie.com');
    expect(src.pathname).toBe('/embed/HfU7U67jeiQ');
    expect(iframe.getAttribute('title')).toBe('Signal by ProbeSyQ prototype walkthrough');
  });

  it('never starts by itself: no autoplay, loop or mute, and no autoplay permission', () => {
    const iframe = player();
    const params = new URL(iframe.getAttribute('src') ?? '').searchParams;
    for (const key of ['autoplay', 'loop', 'mute', 'playlist', 'controls']) expect(params.has(key)).toBe(false);
    expect(iframe.getAttribute('allow') ?? '').not.toMatch(/autoplay/);
    expect(iframe.hasAttribute('allowfullscreen')).toBe(true);
    // Captions stay under the viewer's control in YouTube's player: nothing here turns them off.
    expect(params.has('cc_load_policy')).toBe(false);
    expect(iframe.getAttribute('tabindex')).toBeNull();
  });

  it('keeps the player in a 16:9 frame', () => {
    expect(player().parentElement?.className).toBe('demo__frame');
  });

  it('offers Watch on YouTube for the same video, in a new tab, announced', () => {
    const link = within(section()).getByRole('link', { name: 'Watch on YouTube (opens in a new tab)' });
    expect(link.getAttribute('href')).toBe('https://youtu.be/HfU7U67jeiQ');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(within(section()).getAllByRole('link')).toHaveLength(1);
  });

  it('adds no screenshots, diagrams, statistics or excluded claims', () => {
    const s = section();
    expect(s.querySelectorAll('img, svg:not(.external-icon), figure, ol, ul, table')).toHaveLength(0);
    const text = s.textContent ?? '';
    expect(text).not.toMatch(/\d+%/);
    for (const claim of [/clinical(ly)? validat/i, /real (healthcare )?deployment/i, /live patient/i, /patient data/i, /autonomous/i, /production (hospital )?integration/i]) {
      expect(text).not.toMatch(claim);
    }
  });
});
