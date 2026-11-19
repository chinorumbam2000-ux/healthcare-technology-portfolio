import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'Why Now' });

describe('Stage 4: Why Now', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows The Problem Worth Solving as its own section', () => {
    const problem = screen.getByRole('region', { name: 'The Problem Worth Solving' });
    expect(problem.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → lead → intro → evidence → landscape → where Signal fits → AI governance → sources', () => {
    const order = [...section().querySelectorAll('h2, .why-now > *')].map((el) => el.className.split(' ')[0]);
    expect(order).toEqual([
      'case-section__title', 'why-now__lead', 'why-now__intro', 'evidence', 'why-now__landscape', 'why-now__fit', 'why-now__ai', 'why-now__source',
    ]);
    expect(within(section()).getAllByRole('heading').map((h) => `${h.tagName}:${h.textContent}`)).toEqual([
      'H2:Why Now',
      'H3:A growing surveillance ecosystem',
      'H3:Where Signal fits',
      'H3:AI is changing the work—but governance matters',
    ]);
  });

  it('gives the lead and intro word for word', () => {
    const s = section();
    expect(s.querySelector('.why-now__lead')?.textContent).toBe(
      'Public-health data modernization, healthcare AI adoption, and demand for health-information expertise are accelerating at the same time.',
    );
    expect(s.querySelector('.why-now__intro')?.textContent).toBe(
      'Signal was developed at a time when healthcare and public-health organizations are investing heavily in faster data exchange, interoperable systems, advanced analytics, and responsible AI. Existing surveillance infrastructure is becoming more connected, while healthcare organizations increasingly need professionals who can work across clinical systems, data, interoperability, analytics, and emerging AI technologies.',
    );
  });

  it('shows exactly three callouts — 71%, 16%, 12 facilities — each with its sentence and source', () => {
    const evidence = within(section()).getByRole('list', { name: 'Key evidence' });
    expect(within(evidence).getAllByRole('listitem').map((li) => [
      li.querySelector('.evidence__value')?.textContent,
      li.querySelector('.evidence__text')?.textContent,
      li.querySelector('.evidence__source')?.textContent,
    ])).toEqual([
      [
        '71%',
        'of U.S. non-federal acute care hospitals reported using predictive AI integrated with their EHR in 2024, up from 66% in 2023.',
        'Source: ASTP/ONC, Hospital Trends in the Use, Evaluation, and Governance of Predictive AI, 2023–2024.',
      ],
      [
        '16%',
        'projected employment growth for health information technologists and medical registrars from 2025 to 2035, compared with 3% for all occupations.',
        'Source: U.S. Bureau of Labor Statistics, Occupational Outlook Handbook.',
      ],
      [
        '12 facilities',
        'were already submitting critical hospital data to CDC through automated FHIR-based exchange, exceeding CDC’s 2025 target of 10 facilities.',
        'Source: CDC Public Health Data Strategy.',
      ],
    ]);
  });

  it('describes the surveillance landscape as three named entries, word for word', () => {
    const landscape = section().querySelector('dl.landscape') as HTMLElement;
    expect(landscape.getAttribute('aria-labelledby')).toBe('landscape-title');
    expect([...landscape.querySelectorAll('.landscape__entry')].map((e) => [e.querySelector('dt')?.textContent, e.querySelector('dd')?.textContent])).toEqual([
      ['NSSP / BioSense', 'Near-real-time syndromic surveillance infrastructure that receives data from thousands of healthcare facilities and supports early detection and monitoring.'],
      ['NBS', 'CDC-developed disease-surveillance infrastructure that supports reportable-disease workflows, case investigation, electronic laboratory reporting, and standards-based exchange.'],
      ['CDC Public Health Data Strategy / 1CDP', 'Ongoing modernization focused on integrated data, faster exchange, reusable analytics, FHIR adoption, and reducing siloed public-health data systems.'],
    ]);
  });

  it('shows where Signal fits as an ordered, labelled flow that reads without colour', () => {
    const flow = within(section()).getByRole('list', { name: 'Where Signal fits' });
    expect(flow.tagName).toBe('OL');
    const steps = within(flow).getAllByRole('listitem');
    expect(steps.map((li) => li.textContent)).toEqual(['Healthcare & laboratory systems', 'Signal sidecar', 'Public-health surveillance ecosystem']);
    // Arrows are decorative; the order is carried by the ordered list and the step labels.
    expect(flow.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
    expect(steps[1].querySelector('.fit-flow__node--signal')?.textContent).toBe('Signal sidecar');
  });

  it('states "Complement, not replacement." and the fit paragraph word for word', () => {
    const fit = section().querySelector('.why-now__fit') as HTMLElement;
    expect(fit.querySelector('.why-now__claim')?.textContent).toBe('Complement, not replacement.');
    expect(fit.querySelector('.why-now__text')?.textContent).toBe(
      'Signal does not aim to replace national, state, or jurisdictional surveillance platforms. It explores a complementary, vendor-agnostic sidecar approach that can sit closer to the laboratory and healthcare-system level, transform routine laboratory data into surveillance signals, and support standards-based exchange with broader public-health infrastructure.',
    );
  });

  it('gives the AI-governance paragraph and the source line word for word', () => {
    const s = section();
    expect(s.querySelector('.why-now__ai .why-now__text')?.textContent).toBe(
      'In 2024, predictive AI was already integrated into the EHR environment at 71% of U.S. non-federal acute care hospitals. Adoption is increasing, but so is the expectation that healthcare organizations evaluate AI for accuracy, bias, and performance after implementation. For Signal, this reinforces a design principle used throughout the project: AI should support surveillance and analysis without replacing human review, validation, or accountable decision-making.',
    );
    expect(s.querySelector('.why-now__source')?.textContent).toBe(
      'Sources: ASTP/ONC, Hospital Trends in the Use, Evaluation, and Governance of Predictive AI, 2023–2024; U.S. Bureau of Labor Statistics, Occupational Outlook Handbook; CDC Public Health Data Strategy; CDC National Syndromic Surveillance Program; CDC National Electronic Disease Surveillance System Base System.',
    );
  });

  it('shows only the supplied statistics, and no links, images or chart', () => {
    const s = section();
    expect((s.textContent ?? '').match(/\d+%/g)).toEqual(['71%', '66%', '16%', '3%', '71%']);
    expect(s.querySelectorAll('a, img, figure, .bar-chart')).toHaveLength(0);
  });

  it('makes none of the excluded claims', () => {
    const text = section().textContent ?? '';
    for (const claim of [
      /compet/i, /\breplaces\b/i, /ineffective|failure|failing|outdated/i, /clinically validated/i,
      /(exchanges|sends|connects) (data )?(with|to) CDC/i, /real patient data/i, /cost savings|saves? costs?/i, /detected outbreaks? earlier/i,
    ]) {
      expect(text).not.toMatch(claim);
    }
  });
});
