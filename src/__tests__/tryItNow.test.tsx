import { render, screen, within } from '@testing-library/react';
import App from '../App';

const LIVE = 'https://chinorumbam2000-ux.github.io/signal-by-probesyq/';
const SOURCE = 'https://github.com/chinorumbam2000-ux/signal-by-probesyq';

describe('Stage 1: Try It Now', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('leads with the project title, the program label and the supporting line, exactly', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title.textContent).toBe('Signal by ProbeSyQ — Outbreak Intelligence');
    expect(screen.getByText('MS Healthcare Technology Capstone')).toBeTruthy();
    expect(screen.getByText('Explore the working public prototype using synthetic data.')).toBeTruthy();
  });

  it('opens the live application in a new tab, and says so', () => {
    const live = screen.getByRole('link', { name: 'Try the Live Application (opens in a new tab)' });
    expect(live.getAttribute('href')).toBe(LIVE);
    expect(live.getAttribute('target')).toBe('_blank');
    expect(live.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('links the verified public source repository, in a new tab', () => {
    const source = screen.getByRole('link', { name: 'View Source Code (opens in a new tab)' });
    expect(source.getAttribute('href')).toBe(SOURCE);
    expect(source.getAttribute('target')).toBe('_blank');
    expect(source.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('puts the live application first and styles it as the primary action', () => {
    const links = screen.getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([LIVE, SOURCE]);
    expect(links[0].className).toContain('button--primary');
    expect(links[1].className).toContain('button--secondary');
  });

  it('gives demo access as Signal accepts it: any name, the preset role, any password', () => {
    const access = screen.getByRole('region', { name: 'Demo access' });
    const pairs = [...access.querySelectorAll('dl > div')].map((row) => [
      row.querySelector('dt')?.textContent,
      row.querySelector('dd')?.textContent,
    ]);
    expect(pairs).toEqual([
      ['Name', 'Any name'],
      ['Role', 'Public Health Analyst'],
      ['Password', 'Any password'],
    ]);
    expect(within(access).getByText('No account needed: the role is preset, and the password is never stored.')).toBeTruthy();
  });

  it('shows the real application, with a description of what is on screen', () => {
    const shot = screen.getByRole('img');
    expect(shot.getAttribute('alt')).toMatch(/^The Signal Dashboard on Scenario Replay Day 5/);
    expect(shot.getAttribute('width')).toBe('2880');
    expect(shot.getAttribute('height')).toBe('1800');
    expect(screen.getByText('The Signal Dashboard in the live prototype, on Scenario Replay Day 5.')).toBeTruthy();
  });

  it('contains Stages 1–4 only: their headings, and no later section', () => {
    expect(screen.getAllByRole('heading').map((h) => `${h.tagName}:${h.textContent}`)).toEqual([
      'H1:Signal by ProbeSyQ — Outbreak Intelligence',
      'H2:Demo access',
      'H2:The Pitch',
      'H2:The Problem Worth Solving',
      'H2:Why Now',
      'H3:A growing surveillance ecosystem',
      'H3:Where Signal fits',
      'H3:AI is changing the work—but governance matters',
    ]);
    // Later sections' names, as they would appear as headings (case-sensitive:
    // Stage 4's intro mentions "responsible AI" in running text).
    const text = document.body.textContent ?? '';
    for (const later of [
      'How Signal Was Built', 'Architecture', 'Tech Stack', 'Demo Video', 'Proof It Works',
      'Responsible AI', 'Business Impact', 'Roadmap', 'About Me', 'Reflection', 'AI Use Disclosure',
    ]) {
      expect(text).not.toContain(later);
    }
    // "Sources:" opens Stage 3's and Stage 4's attribution lines; a Sources section would be a heading.
    expect(screen.queryByRole('heading', { name: /^Sources/ })).toBeNull();
    expect(screen.getAllByRole('region').map((r) => r.getAttribute('aria-labelledby'))).toEqual([
      'signal-title', 'demo-access-title', 'pitch-title', 'problem-title', 'why-now-title',
    ]);
  });

  it('has no unfilled placeholders', () => {
    expect(document.body.textContent).not.toMatch(/\[[^\]]*\]|TODO|placeholder/i);
  });

  it('frames the page with the portfolio shell: header identity, one main region, and the ownership footer', () => {
    expect(within(screen.getByRole('banner')).getByText('Munyaradzi Chinorumba')).toBeTruthy();
    expect(screen.getAllByRole('main')).toHaveLength(1);
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText('© 2026 Munyaradzi Chinorumba. All rights reserved.')).toBeTruthy();
    expect(within(footer).getByText('ProbeSyQ™ and Signal by ProbeSyQ™ are trademarks claimed by their owner.')).toBeTruthy();
    expect(document.body.textContent).not.toContain('®');
  });
});
