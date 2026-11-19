import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'The Problem Worth Solving' });

describe('Stage 3: The Problem Worth Solving', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows The Pitch as its own section', () => {
    const pitch = screen.getByRole('region', { name: 'The Pitch' });
    expect(pitch.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → lead → intro → evidence → chart → stakeholders → closing → sources', () => {
    const order = [...section().querySelectorAll('h2, .problem > *')].map((el) => el.className.split(' ')[0]);
    expect(order).toEqual([
      'case-section__title', 'problem__lead', 'problem__intro', 'evidence', 'bar-chart', 'stakeholders', 'problem__closing', 'problem__source',
    ]);
  });

  it('gives the lead statement and the intro paragraph word for word', () => {
    const s = section();
    expect(s.querySelector('.problem__lead')?.textContent).toBe(
      'Laboratory data is abundant. Turning it into timely, connected outbreak intelligence is still difficult.',
    );
    expect(s.querySelector('.problem__intro')?.textContent).toBe(
      'Clinical laboratories generate large volumes of information that can support disease surveillance, but that data is often distributed across different laboratories, healthcare organizations, information systems, and public-health agencies. Even where electronic reporting is established, technical complexity, onboarding, interoperability, and data-extraction challenges can slow the movement from laboratory result to usable surveillance intelligence.',
    );
  });

  it('shows the three evidence callouts, each a number with its sentence', () => {
    const evidence = within(section()).getByRole('list', { name: 'Key evidence' });
    expect(within(evidence).getAllByRole('listitem').map((li) => [
      li.querySelector('.evidence__value')?.textContent,
      li.querySelector('.evidence__text')?.textContent,
    ])).toEqual([
      ['81%', 'of U.S. hospitals reported at least one electronic public-health reporting challenge in 2024.'],
      ['55%', 'reported technical complexity with interfaces or data submission.'],
      ['48%', 'reported at least one challenge with electronic laboratory reporting.'],
    ]);
  });

  it('charts exactly the five requested values, each labelled, with bars sized to match', () => {
    const chart = within(section()).getByRole('figure', { name: 'Electronic Public-Health Reporting Challenges — U.S. Hospitals, 2024' });
    const rows = within(chart).getAllByRole('listitem');
    expect(rows.map((li) => [li.querySelector('.bar-chart__label')?.textContent, li.querySelector('.bar-chart__value')?.textContent])).toEqual([
      ['At least one reporting challenge', '81%'],
      ['Technical complexity of interfaces/submission', '55%'],
      ['Cost challenges', '33%'],
      ['Cumbersome onboarding', '33%'],
      ['Difficulty extracting information from EHRs', '25%'],
    ]);
    // Each bar is decorative and sized from the same number its label prints.
    for (const li of rows) {
      const bar = li.querySelector('.bar-chart__bar') as HTMLElement;
      expect(bar.getAttribute('aria-hidden')).toBe('true');
      expect(`${bar.style.getPropertyValue('--value')}%`).toBe(li.querySelector('.bar-chart__value')?.textContent);
    }
  });

  it('reads as text without colour: every chart row is its label then its value', () => {
    const chart = within(section()).getByRole('figure');
    expect(within(chart).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'At least one reporting challenge81%',
      'Technical complexity of interfaces/submission55%',
      'Cost challenges33%',
      'Cumbersome onboarding33%',
      'Difficulty extracting information from EHRs25%',
    ]);
  });

  it('lists the four stakeholders in order, with decorative arrows', () => {
    const flow = within(section()).getByRole('list', { name: 'Stakeholders' });
    const items = within(flow).getAllByRole('listitem');
    expect(items.map((li) => li.textContent?.replace('→', '').trim())).toEqual([
      'Clinical laboratories', 'Healthcare IT & informatics teams', 'Epidemiologists', 'Public-health agencies',
    ]);
    expect(flow.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });

  it('closes with the motivation statement and the source line, word for word', () => {
    const s = section();
    expect(s.querySelector('.problem__closing')?.textContent).toBe(
      'Signal explores how a vendor-agnostic sidecar can help turn distributed laboratory data into more timely, actionable outbreak intelligence without replacing existing clinical systems.',
    );
    expect(s.querySelector('.problem__source')?.textContent).toBe(
      'Sources: ASTP/ONC, Laboratory Interoperability Through Health Information Exchange Organizations (2024); ASTP/ONC, Electronic Public Health Reporting Among Non-Federal Acute Care Hospitals, 2024.',
    );
  });

  it('shows no statistic beyond the supplied ones, and no links, images or headings below the h2', () => {
    const s = section();
    const percentages = (s.textContent ?? '').match(/\d+%/g);
    expect(percentages).toEqual(['81%', '55%', '48%', '81%', '55%', '33%', '33%', '25%']);
    expect(s.querySelectorAll('a, img, svg, h3, h4')).toHaveLength(0);
  });

  it('makes none of the excluded claims', () => {
    const text = section().textContent ?? '';
    for (const claim of [/clinically validated/i, /improved reporting/i, /reduc(ed|es) costs?/i, /detected (a real|real-world)/i, /uncommon/i, /no laboratory data/i]) {
      expect(text).not.toMatch(claim);
    }
  });
});
