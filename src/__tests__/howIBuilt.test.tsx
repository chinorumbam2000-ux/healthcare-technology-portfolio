import { render, screen, within } from '@testing-library/react';
import App from '../App';

const section = () => screen.getByRole('region', { name: 'How I Built Signal' });

describe('Stage 5: How I Built Signal', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows Why Now as its own section', () => {
    const whyNow = screen.getByRole('region', { name: 'Why Now' });
    expect(whyNow.compareDocumentPosition(section()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section().parentElement?.tagName).toBe('MAIN');
  });

  it('runs heading → lead → architecture → explanation → Technology stack → Key design decisions', () => {
    const order = [...section().querySelectorAll('h2, .built__lead, .arch, .built > *')].map((el) => el.className.split(' ')[0]);
    expect(order).toEqual(['case-section__title', 'built__lead', 'arch', 'built__text', 'built__stack', 'built__decisions']);
  });

  it('gives the lead, caption and explanation word for word', () => {
    const s = section();
    expect(s.querySelector('.built__lead')?.textContent).toBe(
      'Signal was designed as a vendor-agnostic sidecar so it could add outbreak-intelligence capabilities without requiring an organization to replace its existing clinical systems.',
    );
    expect(s.querySelector('figcaption')?.textContent).toBe(
      'Intended production architecture: Signal sits alongside existing clinical systems and uses standards-based interoperability to move laboratory data into a dedicated surveillance workflow.',
    );
    expect(s.querySelector('.built__text')?.textContent).toBe(
      'Rather than building another laboratory information system or electronic health record, I designed Signal as a sidecar application. The goal is to preserve the systems organizations already use while adding a separate layer for surveillance, analytics, geographic intelligence, signal review, and outbreak investigation. Standards such as HL7 v2 and FHIR provide the interoperability path, while laboratory terminology such as LOINC supports consistent representation of laboratory observations.',
    );
  });

  it('draws the architecture as an ordered, labelled five-step flow that reads without colour', () => {
    const figure = within(section()).getByRole('figure');
    const flow = within(figure).getByRole('list', { name: 'Signal architecture, in order' });
    expect(flow.tagName).toBe('OL');
    const steps = within(flow).getAllByRole('listitem');
    expect(steps.map((li) => li.textContent)).toEqual([
      'Laboratory & EHR systems',
      'HL7 v2 / FHIR interoperability',
      'Signal by ProbeSyQ sidecar',
      'Surveillance & analytics',
      'Early-warning intelligence',
    ]);
    // Arrows are decorative; the ordered list and the step labels carry the meaning.
    expect(flow.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(4);
    expect(flow.querySelectorAll('.arch-flow__node--signal')).toHaveLength(1);
    expect(steps[2].querySelector('.arch-flow__node--signal')?.textContent).toBe('Signal by ProbeSyQ sidecar');
    // The figure is labelled as the intended architecture, not a live connection.
    expect(figure.querySelector('figcaption')?.textContent).toMatch(/^Intended production architecture:/);
  });

  it('lists the technology stack exactly: six areas, their technologies and what they do', () => {
    const stack = section().querySelector('dl.stack') as HTMLElement;
    expect(stack.getAttribute('aria-labelledby')).toBe('stack-title');
    expect([...stack.querySelectorAll('.stack__entry')].map((e) => [
      e.querySelector('dt')?.textContent,
      e.querySelector('.stack__tech')?.textContent,
      e.querySelector('.stack__text')?.textContent,
    ])).toEqual([
      ['Frontend', 'React · TypeScript · Vite', 'Interactive application interface, surveillance views, routing and responsive user experience.'],
      ['Backend', 'FastAPI · Python', 'API architecture for health checks, data services and future interoperability workflows.'],
      ['Data layer', 'PostgreSQL · SQLAlchemy · Alembic', 'Structured architecture for facilities, laboratory observations, surveillance signals and audit events.'],
      ['Interoperability', 'HL7 v2 · FHIR · LOINC', 'Standards and terminology used to shape the intended flow of clinical laboratory information into Signal.'],
      ['Deployment', 'GitHub Pages · GitHub Actions', 'Public frontend deployment and automated build workflow.'],
      [
        'Quality & testing',
        'Vitest · browser testing · accessibility testing · TypeScript type checking',
        'Used to verify application behaviour, routing, responsive layouts, accessibility and build integrity.',
      ],
    ]);
  });

  it('gives the five design decisions exactly, each with its Decision and Why', () => {
    const items = [...section().querySelectorAll('.decision')];
    expect(items.map((li) => [
      li.querySelector('h4')?.textContent,
      ...[...li.querySelectorAll('.decision__line')].map((p) => p.textContent),
    ])).toEqual([
      [
        'Sidecar, not replacement',
        'Decision: Design Signal to complement existing LIS and EHR infrastructure.',
        'Why: Replacing core clinical systems would create unnecessary disruption, cost and vendor dependence. The sidecar model keeps Signal focused on surveillance intelligence.',
      ],
      [
        'Synthetic data for the public prototype',
        'Decision: Use synthetic laboratory and surveillance data.',
        'Why: It allows the complete workflow to be demonstrated publicly without exposing patient information or connecting to a real healthcare organization.',
      ],
      [
        'Interpretable surveillance first',
        'Decision: Keep the core surveillance logic transparent and reviewable rather than making outbreak detection dependent on an opaque AI model.',
        'Why: Public-health signals should be understandable, auditable and subject to human review.',
      ],
      [
        'Vendor-neutral interoperability',
        "Decision: Base the architecture on standards such as HL7 v2, FHIR and LOINC rather than a single vendor's proprietary ecosystem.",
        'Why: The long-term goal is for Signal to work across different laboratory and EHR environments.',
      ],
      [
        'Prototype first, production architecture next',
        'Decision: Prioritize a working, testable public prototype while building the backend and database architecture incrementally.',
        'Why: This allowed the core surveillance experience and product concept to be validated before investing in production-scale integration.',
      ],
    ]);
  });

  it('has no links, images, logos, code screenshots or statistics', () => {
    const s = section();
    expect(s.querySelectorAll('a, img, picture, pre, code')).toHaveLength(0);
    expect(s.textContent).not.toMatch(/\d+%/);
  });

  it('makes none of the excluded claims', () => {
    const text = section().textContent ?? '';
    for (const claim of [
      /live (HL7|feed)/i, /receives? (live )?HL7/i, /production FHIR server/i, /(powered|backed) by PostgreSQL/i,
      /deployed (in|inside|at) (a )?(real )?(hospital|healthcare organization)/i, /clinically validated/i, /certified|endorsed/i,
    ]) {
      expect(text).not.toMatch(claim);
    }
  });
});
