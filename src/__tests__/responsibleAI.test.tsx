import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'Responsible AI' });
const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

describe('Stage 8: Responsible AI', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows Proof It Works as its own section', () => {
    const proof = screen.getByRole('region', { name: 'Proof It Works' });
    expect(proof.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → lead → intro → five areas → flow → Risk → Control → governance note', () => {
    const order = [...section().querySelectorAll('h2, .rai__lead, .rai__intro, .rai-areas, .rai-figure, .rai__risks, .rai-note')].map((el) => el.className.split(' ')[0]);
    expect(order).toEqual(['case-section__title', 'rai__lead', 'rai__intro', 'rai-areas', 'rai-figure', 'rai__risks', 'rai-note']);
  });

  it('gives the lead and intro word for word', () => {
    expect(text(section().querySelector('.rai__lead'))).toBe('For Signal, responsible AI starts with knowing where automation should stop.');
    expect(text(section().querySelector('.rai__intro'))).toBe(
      'Signal is designed to support surveillance and investigation, not replace professional judgment. The current prototype keeps its core surveillance logic interpretable and reviewable, uses synthetic data for public demonstration, and deliberately avoids autonomous diagnosis or autonomous public-health action. Any future AI capability would need to operate within the same human-reviewed, auditable and privacy-conscious framework.',
    );
  });

  it('gives the five responsible-AI areas word for word, each under its own heading', () => {
    const list = within(section()).getByRole('list', { name: 'Responsible-AI areas' });
    const areas = [...list.querySelectorAll(':scope > li')].map((li) => [text(li.querySelector('h3')), text(li.querySelector('p'))]);
    expect(areas).toEqual([
      [
        'Deliberate limits on AI',
        'Signal does not depend on a black-box model to declare that an outbreak is occurring. The current prototype uses transparent surveillance logic and presents signals for human review. AI can support future pattern recognition, prioritization and analysis, but it should not independently make clinical or public-health decisions. The current Roella assistant is rule-based and responds from Signal’s own application data; it is not powered by a large language model.',
      ],
      [
        'Human oversight',
        'Surveillance signals are treated as prompts for investigation rather than final conclusions. A human user remains responsible for reviewing the supporting evidence, understanding the context, and deciding whether escalation or further investigation is appropriate.',
      ],
      [
        'Bias and fairness',
        'Outbreak surveillance can be affected by differences in testing access, healthcare utilization, geography, reporting practices and population coverage. Signal therefore should not assume that higher or lower observed activity represents the full underlying disease burden. Future model-based features would require subgroup evaluation, monitoring for unequal performance, and review of how data availability may shape results.',
      ],
      [
        'Privacy and security',
        'The public prototype uses synthetic data and contains no real patient information. In a real deployment, access control, encryption, secure authentication, audit logging, minimum-necessary data use, and organizational privacy and security requirements would be essential before processing protected health information.',
      ],
      [
        'Standards and auditability',
        'Signal’s intended architecture uses standards such as HL7 v2, FHIR and LOINC to support consistent and traceable data exchange. Surveillance signals should remain explainable, with enough supporting information for users to understand why a signal was generated and to review the data and logic behind it.',
      ],
    ]);
  });

  it('shows the human-review flow as a titled, ordered list: the signal is generated before any human step', () => {
    const figure = within(section()).getByRole('figure', { name: 'Human-reviewed surveillance by design' });
    const flow = within(figure).getByRole('list', { name: 'Human-reviewed surveillance by design' });
    expect(flow.tagName).toBe('OL');
    const steps = [...flow.querySelectorAll(':scope > li')];
    expect(steps.map((li) => text(li.querySelector('.rai-flow__label')))).toEqual([
      'Laboratory data',
      'Transparent surveillance logic',
      'Signal generated',
      'Human review',
      'Investigation / public-health decision',
    ]);
    // Human steps are marked in words, not only by colour, and come only after "Signal generated".
    const human = steps.map((li) => li.querySelector('.rai-flow__tag') !== null);
    expect(human).toEqual([false, false, false, true, true]);
    steps.filter((_, i) => human[i]).forEach((li) => expect(text(li.querySelector('.rai-flow__tag'))).toBe('Human step:'));
    expect(steps.findIndex((li) => text(li).includes('Human review'))).toBeLessThan(steps.findIndex((li) => text(li).includes('decision')));
    // The arrows and the person icon decorate only.
    figure.querySelectorAll('svg').forEach((svg) => expect(svg.getAttribute('aria-hidden')).toBe('true'));
    expect(text(figure)).not.toMatch(/\bAI\b|automatic|autonomous|model/i);
  });

  it('pairs each risk with its control, labelled in words', () => {
    expect(within(section()).getByRole('heading', { level: 3, name: 'Risk → Control' })).toBeTruthy();
    const pairs = [...section().querySelectorAll('.risks > div')].map((row) => [text(row.querySelector('dt')), text(row.querySelector('dd'))]);
    expect(pairs).toEqual([
      ['Automation risk', 'Control: Human review before escalation or action.'],
      ['Bias risk', 'Control: Subgroup evaluation, data-quality review and ongoing performance monitoring before future AI deployment.'],
      [
        'Privacy risk',
        'Control: Synthetic data in the public prototype; minimum-necessary data, access controls, encryption and audit logging in any real deployment.',
      ],
      ['Explainability risk', 'Control: Transparent signal logic and visible supporting evidence rather than unexplained automated conclusions.'],
    ]);
  });

  it('states the governance boundary as a headed note, word for word', () => {
    const note = within(section()).getByRole('note', { name: 'Before real-world AI deployment' });
    expect(within(note).getByRole('heading', { level: 3, name: 'Before real-world AI deployment' })).toBeTruthy();
    expect(text(note.querySelector('.rai-note__text'))).toBe(
      'Any AI capability used with real healthcare or public-health data would require formal validation, governance approval, security and privacy review, bias and performance evaluation, ongoing monitoring, and clearly defined human accountability before operational use.',
    );
    expect(note.querySelector('small')).toBeNull();
  });

  it('describes the public prototype as synthetic-data only, and claims no autonomy, certification or real PHI', () => {
    const all = text(section());
    expect(all).toContain('uses synthetic data for public demonstration');
    expect(all).toContain('The public prototype uses synthetic data and contains no real patient information.');
    // "autonomous" appears only where it is ruled out.
    expect(all.match(/autonomous/gi)).toHaveLength(2);
    expect(all).toContain('deliberately avoids autonomous diagnosis or autonomous public-health action');
    for (const claim of [
      /autonomously (diagnos|declar|detect)/i, /(declares|detects) (an )?outbreaks? automatically/i, /clinically validated/i, /validated (AI )?model/i,
      /HIPAA/i, /certif/i, /\bcomplian(t|ce)\b/i, /bias (has been|is) (eliminated|removed)/i, /eliminat/i, /processes (real )?(PHI|patient data)/i,
      /\d+(\.\d+)?\s?%/, /guarantee/i,
    ]) {
      expect(all).not.toMatch(claim);
    }
  });

  it('adds no links, images or badges', () => {
    const s = section();
    expect(within(s).queryAllByRole('link')).toHaveLength(0);
    expect(s.querySelectorAll('img, iframe, video, table, canvas')).toHaveLength(0);
  });
});
