import { render, screen, within } from '@testing-library/react';
import App from '../App';

const reflection = () => screen.getByRole('region', { name: 'What I Learned' });
const credits = () => screen.getByRole('region', { name: 'Credits' });
const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

const PARAGRAPHS = [
  'Building Signal changed the way I think about healthcare technology projects. I started with a public-health problem and quickly learned that creating a useful solution requires much more than building a working interface. I had to think about clinical workflows, interoperability, data quality, surveillance logic, system architecture, privacy, accessibility, testing, and how a real organization might eventually adopt the product.',
  'One of the most important lessons was learning to separate what a prototype can demonstrate from what would still require real-world validation. Signal can show a working surveillance workflow using synthetic data, but that does not mean it is clinically validated or ready for operational deployment. That distinction influenced many of my design decisions, including keeping the surveillance logic interpretable, maintaining human review, and being transparent about current limitations.',
  'The project also strengthened my ability to connect my Medical Laboratory Sciences background with healthcare technology. Working across laboratory informatics, HL7 v2, FHIR, analytics, frontend and backend development, testing, and responsible AI helped me see how these areas come together in real clinical-information-system projects. Most importantly, I learned to approach technology as both a builder and a healthcare professional: asking not only whether a system can be built, but whether it is understandable, safe, useful, and realistic to implement.',
];

describe('Stage 10B: What I Learned & Credits', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows About Me & This Project directly: What I Learned, then Credits, then Sources', () => {
    const about = screen.getByRole('region', { name: 'About Me & This Project' });
    expect(about.nextElementSibling).toBe(reflection());
    expect(reflection().nextElementSibling).toBe(credits());
    expect(credits().parentElement?.tagName).toBe('MAIN');
    expect(credits().nextElementSibling?.getAttribute('aria-labelledby')).toBe('sources-title');
  });

  it('gives the reflection as three paragraphs, word for word, with no bullets', () => {
    const paragraphs = [...reflection().querySelectorAll('p')].map(text);
    expect(paragraphs).toEqual(PARAGRAPHS);
    expect(reflection().querySelectorAll('ul, ol, li, img, svg, figure')).toHaveLength(0);
  });

  it('keeps the reflection between 150 and 250 words (208)', () => {
    // Counted per paragraph: the paragraphs' text runs together without spaces when joined.
    const perParagraph = [...reflection().querySelectorAll('p')].map((p) => words(text(p)));
    expect(perParagraph).toEqual([60, 69, 79]);
    const count = perParagraph.reduce((sum, n) => sum + n, 0);
    expect(count).toBe(208);
    expect(count).toBeGreaterThanOrEqual(150);
    expect(count).toBeLessThanOrEqual(250);
  });

  it('credits the project as an individual capstone, with no teammates', () => {
    const heading = within(credits()).getByRole('heading', { level: 3, name: 'Project' });
    expect(text(heading.nextElementSibling)).toBe(
      'Signal by ProbeSyQ was conceived, designed, and developed as an individual Healthcare Technology capstone project by Munyaradzi Chinorumba.',
    );
    expect(text(credits())).not.toMatch(/team(mate)?s?\b|co-?author|collaborat|with help from|contribut(ed|ion) by/i);
  });

  it('lists the supplied technologies and the resources found in the repositories, grouped, with no logos', () => {
    const list = credits().querySelector('dl[aria-labelledby="credits-resources-title"]') as HTMLElement;
    const groups = [...list.querySelectorAll(':scope > div')].map((row) => [text(row.querySelector('dt')), [...row.querySelectorAll('li')].map(text)]);
    expect(groups).toEqual([
      ['Frontend', ['React', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS', 'Recharts']],
      ['Backend & data', ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'fhir.resources']],
      ['Standards & interoperability', ['HL7 FHIR standards', 'HL7 v2 concepts', 'LOINC terminology', 'SMART on FHIR JavaScript client (fhirclient)']],
      ['Maps', ['Leaflet', 'React Leaflet', 'OpenStreetMap map tiles and data (© OpenStreetMap contributors (opens in a new tab))']],
      ['Testing', ['Vitest', 'Testing Library']],
      ['Hosting & delivery', ['GitHub', 'GitHub Actions', 'YouTube for hosting the narrated demo']],
    ]);
    // Every item from the supplied list is present.
    const all = groups.flatMap(([, items]) => items as string[]);
    for (const supplied of [
      'React', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'HL7 FHIR standards', 'HL7 v2 concepts',
      'LOINC terminology', 'GitHub', 'GitHub Actions', 'YouTube for hosting the narrated demo',
    ]) {
      expect(all).toContain(supplied);
    }
    expect(credits().querySelectorAll('img, picture, svg:not(.external-icon)')).toHaveLength(0);
  });

  it('attributes OpenStreetMap with a link to its copyright page, in a new tab', () => {
    const link = within(credits()).getByRole('link', { name: '© OpenStreetMap contributors (opens in a new tab)' });
    expect(link.getAttribute('href')).toBe('https://www.openstreetmap.org/copyright');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(within(credits()).getAllByRole('link')).toHaveLength(1);
  });

  it('closes the credits with the note, word for word', () => {
    expect(text(credits().querySelector('.credits__note'))).toBe(
      'Open-source technologies and standards were used to build and demonstrate the prototype. Their inclusion here acknowledges the tools and standards that supported the project; full research references appear in the Sources section.',
    );
  });

  it('keeps references out of the credits: they are in Sources', () => {
    expect(text(credits())).not.toMatch(/\(\d{4}[a-z]?(, [A-Z][a-z]+( \d{1,2})?)?\)\.|\(n\.d\.\)|Retrieved from|https?:\/\/doi\.org/);
  });
});
