import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'About Me & This Project' });
const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

describe('Stage 10A: About Me & This Project', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows Business Impact & What’s Next as its own section, and is followed by What I Learned', () => {
    const biz = screen.getByRole('region', { name: 'Business Impact & What’s Next' });
    expect(biz.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
    expect(section().nextElementSibling?.getAttribute('aria-labelledby')).toBe('reflection-title');
  });

  it('runs heading → lead → About Me → Target roles → Skills', () => {
    const order = [...section().querySelectorAll('h2, .about__lead, .about__text, h3')].map((el) => (el.tagName.startsWith('H') ? text(el) : el.className));
    expect(order).toEqual(['About Me & This Project', 'about__lead', 'about__text', 'Target roles', 'Skills this project demonstrates']);
  });

  it('gives the lead and the About Me paragraph word for word', () => {
    expect(text(section().querySelector('.about__lead'))).toBe(
      'Signal brings together my background in Medical Laboratory Sciences with my growing focus on clinical information systems, interoperability, healthcare analytics, and responsible AI.',
    );
    expect(text(section().querySelector('.about__text'))).toBe(
      'Munyaradzi Chinorumba is a Master of Science in Healthcare Technology (MSHT) degree holder with a background in Medical Laboratory Sciences and a growing focus on clinical information systems, data interoperability, analytics, and healthcare AI. Signal by ProbeSyQ reflects that intersection by combining laboratory knowledge with healthcare technology, public-health surveillance, software development, and standards-based interoperability.',
    );
    expect(section().querySelectorAll('.about__lead, .about__text')).toHaveLength(2);
  });

  it('lists the four target roles, unranked', () => {
    const roles = within(section()).getByRole('list', { name: 'Target roles' });
    expect(roles.tagName).toBe('UL');
    expect([...roles.querySelectorAll('li')].map(text)).toEqual([
      'Healthcare Technology Analyst',
      'Clinical Informatics Analyst',
      'EHR / LIS Analyst',
      'Healthcare Data Analyst',
    ]);
  });

  it('shows all eight skill areas, each a title and one sentence, word for word', () => {
    const skills = [...section().querySelectorAll('.skill')].map((li) => [text(li.querySelector('h4')), text(li.querySelector('p'))]);
    expect(skills).toEqual([
      ['Clinical information systems', 'Understanding of laboratory and EHR workflows and how new technology can complement existing clinical systems.'],
      ['Interoperability', 'Application of HL7 v2, FHIR and LOINC concepts to the intended exchange of laboratory information.'],
      ['Laboratory informatics', 'Use of Medical Laboratory Sciences knowledge to shape surveillance profiles, laboratory observations and outbreak-monitoring workflows.'],
      ['Healthcare analytics', 'Design of surveillance metrics, trend views, signal scoring and geographic intelligence for public-health monitoring.'],
      [
        'Software development',
        'Frontend development with React and TypeScript, backend development with FastAPI and Python, and database architecture using PostgreSQL, SQLAlchemy and Alembic.',
      ],
      ['Testing & accessibility', 'Automated testing, type checking, production builds, browser validation, responsive testing, keyboard testing and accessibility checks.'],
      [
        'Responsible AI & governance',
        'Design choices that keep surveillance interpretable, human-reviewed and appropriately limited rather than relying on autonomous clinical or public-health decisions.',
      ],
      ['Product & systems thinking', 'Translation of a healthcare problem into a working prototype, architecture, adoption path, validation strategy and future roadmap.'],
    ]);
  });

  it('has no ratings, badges, résumé sections, contact details or downloads', () => {
    const s = section();
    expect(within(s).queryAllByRole('link')).toHaveLength(0);
    expect(s.querySelectorAll('img, svg, progress, meter, [role="progressbar"], [role="meter"], table, iframe')).toHaveLength(0);
    const all = text(s);
    expect(all).not.toMatch(/\d+\s?%|\b\d\s?\/\s?(5|10)\b|★|☆/);
    expect(all).not.toMatch(/Qualifications|Education|Certifications?|Certified|Employment|Experience|Résumé|Resume|Curriculum vitae|CV\b|Download/i);
    expect(all).not.toMatch(/@|\+?\d[\d\s().-]{7,}\d|linkedin|phone|e-?mail/i);
    expect(all).not.toMatch(/\bEpic\b/);
  });

  it('claims no role held, certification or clinical competence', () => {
    const all = text(section());
    for (const claim of [/\bI am an?\b/i, /\bcurrently (work|serve|employed)/i, /works as/i, /years of experience/i, /proves?\b/i, /clinical competence/i, /expert/i]) {
      expect(all).not.toMatch(claim);
    }
  });

  it('adds no Stage 10C content yet', () => {
    const page = document.body.textContent ?? '';
    for (const later of ['AI Use Disclosure', 'References']) {
      expect(page).not.toContain(later);
    }
    expect(screen.queryByRole('heading', { name: /Sources|Disclosure|References/ })).toBeNull();
  });
});
