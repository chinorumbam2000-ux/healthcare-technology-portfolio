import { render, screen, within } from '@testing-library/react';
import App from '../App';

const sources = () => screen.getByRole('region', { name: 'Sources' });
const disclosure = () => screen.getByRole('region', { name: 'AI Use Disclosure' });
const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
/** A reference as it reads, without the link's screen-reader suffix. */
const refText = (li: Element) => text(li).replace(' (opens in a new tab)', '');

const REFERENCES = [
  'Centers for Disease Control and Prevention. (2025, December 30). About National Electronic Disease Surveillance System Base System (NBS). https://www.cdc.gov/nbs/php/about/',
  'Centers for Disease Control and Prevention. (2026a, September 1). About NSSP. https://www.cdc.gov/nssp/php/about/',
  'Centers for Disease Control and Prevention. (2026b, October 21). About the Public Health Data Strategy. https://www.cdc.gov/public-health-data-strategy/php/about/index.html',
  'Centers for Disease Control and Prevention. (2026c, January 13). BioSense Platform. https://www.cdc.gov/nssp/php/about/about-nssp-and-the-biosense-platform.html',
  'Centers for Disease Control and Prevention. (2026d, May 27). Data modernization at CDC. https://www.cdc.gov/data-modernization/php/about/index.html',
  'Chang, W., Owusu-Mensah, P., Everson, J., & Richwine, C. (2025, September). Hospital trends in the use, evaluation, and governance of predictive AI, 2023–2024 (Data Brief No. 80). Office of the Assistant Secretary for Technology Policy. https://healthit.gov/data/data-briefs/hospital-trends-use-evaluation-and-governance-predictive-ai-2023-2024/',
  'Health Level Seven International. (n.d.). SMART App Launch: Launch and authorization (Version 2.2.0). https://www.hl7.org/fhir/smart-app-launch/app-launch.html',
  'Health Level Seven International. (2019). FHIR overview (Version 4.0.1). https://www.hl7.org/fhir/R4/overview.html',
  'Owusu-Mensah, P., & Richwine, C. (2025, July). Electronic public health reporting among non-federal acute care hospitals, 2024 (Data Brief No. 78). Office of the Assistant Secretary for Technology Policy. https://healthit.gov/data/data-briefs/electronic-public-health-reporting-among-non-federal-acute-care-hospitals-2024/',
  'Regenstrief Institute. (n.d.). About LOINC. https://loinc.org/about/',
  'Strawley, C., Larson, J., & Patel, V. (2024, September). Laboratory interoperability through health information exchange organizations (Data Brief No. 74). Office of the Assistant Secretary for Technology Policy. https://healthit.gov/data/data-briefs/laboratory-interoperability-through-health-information-exchange-organizations/',
  'U.S. Bureau of Labor Statistics. (2026). Health information technologists and medical registrars. Occupational Outlook Handbook. https://www.bls.gov/ooh/healthcare/health-information-technologists-and-medical-registrars.htm',
];

describe('Stage 10C: Sources & AI Use Disclosure', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('closes the page: Credits → Sources → AI Use Disclosure', () => {
    const credits = screen.getByRole('region', { name: 'Credits' });
    expect(credits.nextElementSibling).toBe(sources());
    expect(sources().nextElementSibling).toBe(disclosure());
    expect(disclosure().parentElement?.lastElementChild).toBe(disclosure());
  });

  it('introduces the sources word for word', () => {
    expect(text(sources().querySelector('.sources__intro'))).toBe(
      'Sources used to frame the public-health problem, market landscape, interoperability approach, surveillance ecosystem, workforce context, and healthcare AI environment are listed below.',
    );
  });

  it('lists all twelve references in APA 7 order and form', () => {
    const list = within(sources()).getByRole('list', { name: 'Sources' });
    expect(list.tagName).toBe('UL');
    const items = [...list.querySelectorAll(':scope > li')];
    expect(items.length).toBeGreaterThanOrEqual(10);
    expect(items.map(refText)).toEqual(REFERENCES);
  });

  it('italicises each title, and only the title', () => {
    const titles = [...sources().querySelectorAll('li')].map((li) => [...li.querySelectorAll('cite')].map(text));
    expect(titles.every((t) => t.length === 1)).toBe(true);
    expect(titles.map((t) => t[0])).toEqual([
      'About National Electronic Disease Surveillance System Base System (NBS)',
      'About NSSP',
      'About the Public Health Data Strategy',
      'BioSense Platform',
      'Data modernization at CDC',
      'Hospital trends in the use, evaluation, and governance of predictive AI, 2023–2024',
      'SMART App Launch: Launch and authorization',
      'FHIR overview',
      'Electronic public health reporting among non-federal acute care hospitals, 2024',
      'About LOINC',
      'Laboratory interoperability through health information exchange organizations',
      'Health information technologists and medical registrars',
    ]);
  });

  it('links every URL to itself, in a new tab, announced', () => {
    const links = within(sources()).getAllByRole('link');
    expect(links).toHaveLength(12);
    links.forEach((a) => {
      const href = a.getAttribute('href') ?? '';
      expect(href).toMatch(/^https:\/\//);
      expect(a.textContent).toBe(`${href} (opens in a new tab)`);
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('includes the evidence behind Stages 3 and 4', () => {
    const all = text(sources());
    for (const title of [
      'Laboratory interoperability through health information exchange organizations', // Stage 3
      'Electronic public health reporting among non-federal acute care hospitals, 2024', // Stage 3
      'Hospital trends in the use, evaluation, and governance of predictive AI, 2023–2024', // Stage 4: 71%
      'Health information technologists and medical registrars', // Stage 4: 16%
      'About the Public Health Data Strategy', // Stage 4: 12 facilities
      'About NSSP', 'BioSense Platform', 'About National Electronic Disease Surveillance System Base System (NBS)', 'Data modernization at CDC', // Stage 4 landscape
    ]) {
      expect(all).toContain(title);
    }
  });

  it('opens the disclosure word for word: AI assisted, the decisions were mine', () => {
    expect(text(disclosure().querySelector('.disclosure__opening'))).toBe(
      'AI tools were used as assistants during the development of Signal by ProbeSyQ. They supported selected research, refinement, coding, troubleshooting, and review tasks, while the project concept, healthcare problem, requirements, design direction, evaluation, testing, revisions, and final decisions remained my responsibility.',
    );
  });

  it('names exactly two AI tools, each with its contribution word for word', () => {
    const tools = [...disclosure().querySelectorAll('.disclosure__tool')].map((d) => [text(d.querySelector('h3')), text(d.querySelector('p'))]);
    expect(tools).toEqual([
      [
        'OpenAI',
        'OpenAI was used primarily as a thinking, research, and refinement assistant. It supported the review and refinement of project ideas, technical and healthcare concepts, interoperability considerations, responsible-AI principles, supporting research, presentation material, and written communication. Its outputs were evaluated, revised, and adapted to fit the project requirements and my own understanding and decisions.',
      ],
      [
        'Claude — Anthropic',
        'Claude was used primarily as a coding and implementation assistant. It helped create and refine frontend and backend code, write and update tests, inspect the codebase, verify project behavior, troubleshoot issues, and support Git/GitHub deployment workflows. Code and changes were reviewed, tested, and approved before being committed or deployed.',
      ],
    ]);
    expect(text(disclosure())).not.toMatch(/Copilot|ChatGPT|Gemini|Cursor|Perplexity|Midjourney|Clipchamp|VS Code|GitHub Actions/);
  });

  it('separates development AI from Signal’s surveillance logic', () => {
    const box = within(disclosure()).getByRole('heading', { level: 3, name: 'Development AI is not the same as product AI' }).parentElement as HTMLElement;
    expect(text(box.querySelector('p'))).toBe(
      'OpenAI and Claude were tools used to assist the development process. Their use does not mean that Signal’s surveillance engine is powered by a large language model. The current prototype’s core surveillance signals are generated through transparent statistical and rule-based methods and remain subject to human review. Any future AI capabilities would require separate validation, governance, security review, performance evaluation, and clearly defined human oversight before operational use.',
    );
  });

  it('never presents AI as the author, decider, validator or approver', () => {
    const all = text(disclosure());
    for (const claim of [
      /(OpenAI|Claude|AI) (independently )?(conceived|designed|formulated|created|built|organized|organised|wrote|implemented|validated|approved|decided)/i,
      /independently (designed|conceived|formulated|validated|approved)/i,
      /\bportfolio\b/i, /\bLLM\b/, /patient data|PHI\b/i, /clinical decision/i, /without (my )?review/i,
      /sorry|apolog|admit|confess/i,
    ]) {
      expect(all).not.toMatch(claim);
    }
    expect(all).toContain('remained my responsibility');
    // "Large language model" appears once, and only where it is ruled out.
    expect(all.match(/large language model/gi)).toHaveLength(1);
    expect(all).toContain('does not mean that Signal’s surveillance engine is powered by a large language model');
  });

  it('has no logos, cards or placeholders', () => {
    for (const region of [sources(), disclosure()]) {
      expect(region.querySelectorAll('img, picture, svg:not(.external-icon)')).toHaveLength(0);
    }
    expect(document.body.textContent).not.toMatch(/TODO|TBD|placeholder|lorem|\[[^\]]*\]/i);
  });
});
