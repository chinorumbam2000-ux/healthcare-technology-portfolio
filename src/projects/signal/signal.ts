/**
 * The Signal by ProbeSyQ capstone: every link and line of copy the case study
 * shows, in one place. Later stages add their content here, beside Stage 1's.
 */

/** The working public prototype (GitHub Pages, synthetic data only). */
export const LIVE_APP_URL = 'https://chinorumbam2000-ux.github.io/signal-by-probesyq/';

/** The application's public source repository (verified public). */
export const SOURCE_CODE_URL = 'https://github.com/chinorumbam2000-ux/signal-by-probesyq';

export const SIGNAL = {
  title: 'Signal by ProbeSyQ — Outbreak Intelligence',
  programLabel: 'MS Healthcare Technology Capstone',
  supportingLine: 'Explore the working public prototype using synthetic data.',
  primaryCta: 'Try the Live Application',
  secondaryCta: 'View Source Code',
} as const;

/**
 * How to sign in to the public demo. Signal has no fixed demo account: its
 * sign-in accepts any non-empty name and password, presets the role, and never
 * stores the password (see src/lib/demoSession.ts in the Signal repository).
 */
export const DEMO_ACCESS = {
  fields: [
    { label: 'Name', value: 'Any name' },
    { label: 'Role', value: 'Public Health Analyst' },
    { label: 'Password', value: 'Any password' },
  ],
  note: 'No account needed: the role is preset, and the password is never stored.',
} as const;

/** Stage 2, The Pitch: what Signal is, what the prototype shows, and my role. */
export const PITCH = {
  heading: 'The Pitch',
  paragraphs: [
    'Signal by ProbeSyQ is a vendor-agnostic, plug-and-play outbreak intelligence sidecar designed to help healthcare and public-health teams make better use of routine laboratory data for earlier disease surveillance. Rather than replacing an organization’s existing laboratory information system or electronic health record, Signal is designed to sit alongside those systems and use standards-based interoperability, including HL7 v2 and FHIR, to support the flow of laboratory data into a dedicated surveillance environment.',
    'The working prototype demonstrates how laboratory data can be organized into multiple disease and syndrome surveillance profiles, analyzed for emerging patterns, and presented through dashboards, geographic views, signal queues, and investigation workflows. The public version uses synthetic data and is not connected to a real healthcare organization or clinically validated system.',
    'I conceived, designed, and developed Signal as my Healthcare Technology capstone, drawing on my background in Medical Laboratory Sciences and graduate work in healthcare technology. My role included defining the problem and product concept, designing the surveillance and interoperability workflow, developing the working prototype, shaping the user experience, implementing and testing core functionality, and evaluating privacy, security, accessibility, and responsible-AI considerations. The project demonstrates how clinical laboratory knowledge, health information systems, interoperability, analytics, and emerging AI capabilities can be brought together to support more timely and actionable outbreak intelligence.',
  ],
} as const;

/**
 * Stage 3, The Problem Worth Solving. Every statistic comes from the two
 * ASTP/ONC publications named in `source`; nothing here is a Signal result.
 */
export const PROBLEM = {
  heading: 'The Problem Worth Solving',
  lead: 'Laboratory data is abundant. Turning it into timely, connected outbreak intelligence is still difficult.',
  intro:
    'Clinical laboratories generate large volumes of information that can support disease surveillance, but that data is often distributed across different laboratories, healthcare organizations, information systems, and public-health agencies. Even where electronic reporting is established, technical complexity, onboarding, interoperability, and data-extraction challenges can slow the movement from laboratory result to usable surveillance intelligence.',
  evidence: [
    { value: '81%', text: 'of U.S. hospitals reported at least one electronic public-health reporting challenge in 2024.' },
    { value: '55%', text: 'reported technical complexity with interfaces or data submission.' },
    { value: '48%', text: 'reported at least one challenge with electronic laboratory reporting.' },
  ],
  chart: {
    title: 'Electronic Public-Health Reporting Challenges — U.S. Hospitals, 2024',
    subtitle: 'Share of hospitals reporting each challenge',
    rows: [
      { label: 'At least one reporting challenge', value: 81 },
      { label: 'Technical complexity of interfaces/submission', value: 55 },
      { label: 'Cost challenges', value: 33 },
      { label: 'Cumbersome onboarding', value: 33 },
      { label: 'Difficulty extracting information from EHRs', value: 25 },
    ],
  },
  stakeholders: {
    label: 'Stakeholders',
    flow: ['Clinical laboratories', 'Healthcare IT & informatics teams', 'Epidemiologists', 'Public-health agencies'],
  },
  closing:
    'Signal explores how a vendor-agnostic sidecar can help turn distributed laboratory data into more timely, actionable outbreak intelligence without replacing existing clinical systems.',
  source:
    'Sources: ASTP/ONC, Laboratory Interoperability Through Health Information Exchange Organizations (2024); ASTP/ONC, Electronic Public Health Reporting Among Non-Federal Acute Care Hospitals, 2024.',
} as const;

/** The hero screenshot: a real capture of the live prototype. */
export const DASHBOARD_SHOT = {
  width: 2880,
  height: 1800,
  alt: 'The Signal Dashboard on Scenario Replay Day 5: Regional Outbreak Status for Worcester County, MA, with four signals requiring attention, led by COVID-19 at critical.',
  caption: 'The Signal Dashboard in the live prototype, on Scenario Replay Day 5.',
} as const;
