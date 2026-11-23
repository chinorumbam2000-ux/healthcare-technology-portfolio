import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Stage 2: The Pitch', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('follows Try It Now, as its own section headed The Pitch', () => {
    const pitch = screen.getByRole('region', { name: 'The Pitch' });
    const hero = screen.getByRole('region', { name: 'Signal by ProbeSyQ — Outbreak Intelligence' });
    expect(hero.compareDocumentPosition(pitch) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(pitch.parentElement?.tagName).toBe('MAIN');
  });

  it('gives the three paragraphs word for word, in order', () => {
    const pitch = screen.getByRole('region', { name: 'The Pitch' });
    expect([...pitch.querySelectorAll('p')].map((p) => p.textContent)).toEqual([
      'Signal by ProbeSyQ is a vendor-agnostic outbreak intelligence sidecar designed to integrate alongside existing clinical systems and help healthcare and public-health teams make better use of routine laboratory data for earlier disease surveillance. Rather than replacing an organization’s existing laboratory information system or electronic health record, Signal is designed to sit alongside those systems and use standards-based interoperability, including HL7 v2 and FHIR, to support the flow of laboratory data into a dedicated surveillance environment.',
      'The working prototype demonstrates how laboratory data can be organized into multiple disease and syndrome surveillance profiles, analyzed for emerging patterns, and presented through dashboards, geographic views, signal queues, and investigation workflows. The public version uses synthetic data and is not connected to a real healthcare organization or clinically validated system.',
      'I conceived, designed, and developed Signal as my Healthcare Technology capstone, drawing on my background in Medical Laboratory Sciences and graduate work in healthcare technology. My role included defining the problem and product concept, designing the surveillance and interoperability workflow, developing the working prototype, shaping the user experience, implementing and testing core functionality, and evaluating privacy, security, accessibility, and responsible-AI considerations. The project demonstrates how clinical laboratory knowledge, health information systems, interoperability, analytics, and emerging AI capabilities can be brought together to support more timely and actionable outbreak intelligence.',
    ]);
  });

  it('does not repeat the title or program label, and adds no links', () => {
    const pitch = screen.getByRole('region', { name: 'The Pitch' });
    expect(pitch.textContent).not.toContain('Outbreak Intelligence —');
    expect(pitch.textContent).not.toContain('MS Healthcare Technology Capstone');
    expect(pitch.querySelectorAll('a')).toHaveLength(0);
    expect(screen.getAllByText('Signal by ProbeSyQ — Outbreak Intelligence')).toHaveLength(1);
    expect(screen.getAllByText('MS Healthcare Technology Capstone')).toHaveLength(1);
  });
});
