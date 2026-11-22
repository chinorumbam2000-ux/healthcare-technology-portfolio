import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'Business Impact & What’s Next' });
const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
const rows = (el: Element) => [...el.querySelectorAll(':scope > div')].map((row) => [text(row.querySelector('dt')), text(row.querySelector('dd'))]);

describe('Stage 9: Business Impact & What’s Next', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows Responsible AI as its own section', () => {
    const rai = screen.getByRole('region', { name: 'Responsible AI' });
    expect(rai.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → lead → value → cost → adoption path → limitations → roadmap → closing', () => {
    const subheads = [...section().querySelectorAll('h2, .biz__lead, h3, .biz__closing')].map((el) => (el.tagName === 'H3' || el.tagName === 'H2' ? text(el) : el.className));
    expect(subheads).toEqual([
      'Business Impact & What’s Next',
      'biz__lead',
      'Potential organizational value',
      'What implementation would cost',
      'A phased adoption path',
      'Current limitations',
      'Next version roadmap',
      'biz__closing',
    ]);
  });

  it('gives the lead word for word', () => {
    expect(text(section().querySelector('.biz__lead'))).toBe(
      'Signal’s potential value comes from helping organizations make better use of laboratory data they already generate, without requiring them to replace the clinical systems they already depend on.',
    );
  });

  it('gives the four potential-value areas word for word', () => {
    const items = [...section().querySelectorAll('.biz-value')].map((li) => [text(li.querySelector('h4')), text(li.querySelector('p'))]);
    expect(items).toEqual([
      [
        'Earlier surveillance visibility',
        'Signal is designed to bring laboratory activity, surveillance profiles, analytics and active signals into one focused environment, helping surveillance teams identify patterns that may warrant attention earlier in the review process.',
      ],
      [
        'Better use of existing laboratory data',
        'Routine laboratory data already generated during patient care can also contribute to population-level surveillance. Signal explores how that information can be organized into a dedicated outbreak-intelligence workflow rather than remaining useful only at the individual-result level.',
      ],
      [
        'Lower-disruption integration model',
        'Because Signal is designed as a sidecar, organizations would not need to replace their existing LIS or EHR simply to add the surveillance layer. Standards-based integration is intended to reduce dependence on a single clinical-system vendor.',
      ],
      [
        'More structured investigation',
        'Signals, supporting indicators, geography, analytics and investigation status are brought into one workflow so that users can move from detection to review without relying entirely on disconnected reports or manual interpretation.',
      ],
    ]);
  });

  it('names the cost drivers without any cost figure', () => {
    const heading = within(section()).getByRole('heading', { level: 3, name: 'What implementation would cost' });
    expect(text(heading.nextElementSibling)).toBe(
      'Signal is currently a prototype, so a real implementation cost has not been established. The major cost drivers would come from integration, infrastructure, validation, security, governance and ongoing support rather than from the public prototype itself.',
    );
    const list = section().querySelector('dl[aria-labelledby="biz-cost-title"]') as HTMLElement;
    expect(rows(list)).toEqual([
      ['Integration', 'Interface development, data mapping, terminology mapping, FHIR or HL7 v2 configuration, and testing with each participating clinical system.'],
      ['Infrastructure', 'Secure hosting, database services, monitoring, backups, networking and production availability requirements.'],
      ['Security & compliance', 'Identity and access management, encryption, audit logging, privacy review, security assessment and organization-specific compliance work.'],
      ['Validation', 'Clinical and public-health validation, data-quality evaluation, workflow testing and performance monitoring before operational use.'],
      ['Operations', 'Training, user support, interface maintenance, surveillance-profile maintenance and ongoing system monitoring.'],
    ]);
    expect(text(section())).not.toMatch(/[$€£]|\bUSD\b|\d+\s?(k|K|million|billion)\b|\bROI\b|return on investment/);
  });

  it('shows the adoption path as four ordered, numbered phases, none drawn as done', () => {
    const path = within(section()).getByRole('list', { name: 'A phased adoption path' });
    expect(path.tagName).toBe('OL');
    const phases = [...path.querySelectorAll(':scope > li')];
    expect(phases.map((li) => [text(li.querySelector('h4')), text(li.querySelector('.phase__text'))])).toEqual([
      ['Phase 1: Connect', 'Establish a standards-based interface with one laboratory or healthcare environment using a limited data scope.'],
      [
        'Phase 2: Validate',
        'Compare Signal’s outputs with existing surveillance workflows using historical, synthetic or approved real-world data under appropriate governance.',
      ],
      ['Phase 3: Pilot', 'Run Signal in a limited operational setting with human review, defined users, clear escalation rules and measurable success criteria.'],
      [
        'Phase 4: Scale',
        'Expand to additional facilities, disease and syndrome profiles, interfaces and public-health integrations after validation and governance approval.',
      ],
    ]);
    // Every phase is drawn alike: the same marker, no check marks or status words.
    expect(phases.map((li) => li.querySelector('.phase__marker')?.className)).toEqual(Array(4).fill('phase__marker'));
    phases.forEach((li, i) => {
      expect(li.className).toBe('phase');
      expect(li.querySelector('.phase__marker')?.getAttribute('aria-hidden')).toBe('true');
      expect(text(li.querySelector('.phase__marker'))).toBe(String(i + 1));
    });
    expect(path.querySelectorAll('svg, img')).toHaveLength(0);
    expect(text(path)).not.toMatch(/✓|✔|complete|completed|done|achieved|underway|in progress|current phase|launched/i);
  });

  it('lists all five current limitations word for word', () => {
    const list = section().querySelector('dl[aria-labelledby="biz-limits-title"]') as HTMLElement;
    expect(rows(list)).toEqual([
      ['Synthetic data', 'The public prototype does not use real patient or production laboratory data.'],
      ['No live production integration', 'The public application is not connected to a real LIS, EHR, hospital, laboratory or public-health agency.'],
      ['No clinical validation', 'Signal has not been validated for real-world outbreak detection or operational public-health decision-making.'],
      [
        'Prototype-scale surveillance',
        'The current application demonstrates selected disease and syndrome profiles and a controlled surveillance scenario rather than production-scale regional or national surveillance.',
      ],
      ['Development-stage backend', 'The backend, database and interoperability architecture are still being developed toward a production-capable implementation.'],
    ]);
  });

  it('lists the six roadmap priorities in order, word for word', () => {
    const list = within(section()).getByRole('list', { name: 'Next version roadmap' });
    expect(list.tagName).toBe('OL');
    expect([...list.querySelectorAll(':scope > li')].map((li) => [text(li.querySelector('h4')), text(li.querySelector('p'))])).toEqual([
      ['1. Real standards-based ingestion', 'Extend the existing interoperability work into controlled ingestion from approved FHIR and HL7 v2 test environments.'],
      ['2. Broader surveillance profiles', 'Expand configurable disease and syndrome monitoring while maintaining transparent surveillance logic and human review.'],
      ['3. Stronger geographic intelligence', 'Develop deeper geographic and facility-level analysis for comparing emerging patterns across locations.'],
      [
        '4. Validation framework',
        'Establish formal evaluation methods for data quality, surveillance performance, bias, usability and workflow impact before real-world use.',
      ],
      [
        '5. Security and governance',
        'Strengthen authentication, authorization, audit logging, deployment security, privacy controls and governance requirements for production environments.',
      ],
      [
        '6. Pilot readiness',
        'Prepare Signal for a limited, partner-approved pilot only after technical validation, privacy and security review, and defined operational success criteria.',
      ],
    ]);
  });

  it('ends with the closing statement, word for word', () => {
    const closing = section().querySelector('.biz__closing');
    expect(text(closing)).toBe(
      'The next milestone is not to make Signal more autonomous. It is to make the system more connected, validated, secure and useful to the people responsible for surveillance decisions.',
    );
    const all = [...section().querySelectorAll('p, h2, h3, h4, dt, dd')];
    expect(all[all.length - 1]).toBe(closing);
  });

  it('claims no achieved impact, adoption, validation, approval or real PHI', () => {
    const all = text(section());
    for (const claim of [
      /\d+(\.\d+)?\s?%/, /cost savings|saved|saves/i, /reduc(ed|es) (outbreak[- ])?detection time/i, /improv(ed|es) patient outcomes/i,
      /deployed (in|at|to)/i, /hospitals? (have|has) adopted|adopted by/i, /completed (a |the )?pilot|pilot (was|has been) (run|completed)/i,
      /clinically validated|has been validated/i, /regulatory approval|FDA|cleared|certified/i, /processes (real )?(PHI|patient data)/i,
    ]) {
      expect(all).not.toMatch(claim);
    }
  });

  it('adds no links, images or later sections', () => {
    const s = section();
    expect(within(s).queryAllByRole('link')).toHaveLength(0);
    expect(s.querySelectorAll('img, iframe, video, table, canvas')).toHaveLength(0);
    expect(text(s)).not.toMatch(/About Me|Reflection|AI Use Disclosure|Sources/);
  });
});
