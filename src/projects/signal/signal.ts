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
    { value: '81%', text: 'of U.S. non-federal acute care hospitals reported at least one electronic public-health reporting challenge in 2024.' },
    { value: '55%', text: 'reported technical complexity with interfaces or data submission.' },
    { value: '48%', text: 'reported at least one challenge with electronic laboratory reporting.' },
  ],
  chart: {
    title: 'Electronic Public-Health Reporting Challenges — U.S. Non-Federal Acute Care Hospitals, 2024',
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

/**
 * Stage 4, Why Now. It keeps three things apart: today's public-health
 * infrastructure (the landscape), the working prototype, and Signal's intended
 * place beside that infrastructure (where Signal fits).
 */
export const WHY_NOW = {
  heading: 'Why Now',
  lead: 'Public-health data modernization, healthcare AI adoption, and demand for health-information expertise are accelerating at the same time.',
  intro:
    'Signal was developed at a time when healthcare and public-health organizations are investing heavily in faster data exchange, interoperable systems, advanced analytics, and responsible AI. Existing surveillance infrastructure is becoming more connected, while healthcare organizations increasingly need professionals who can work across clinical systems, data, interoperability, analytics, and emerging AI technologies.',
  evidence: [
    {
      value: '71%',
      unit: '',
      text: 'of U.S. non-federal acute care hospitals reported using predictive AI integrated with their EHR in 2024, up from 66% in 2023.',
      source: 'ASTP/ONC, Hospital Trends in the Use, Evaluation, and Governance of Predictive AI, 2023–2024.',
    },
    {
      value: '16%',
      unit: '',
      text: 'projected employment growth for health information technologists and medical registrars from 2025 to 2035, compared with 3% for all occupations.',
      source: 'U.S. Bureau of Labor Statistics, Occupational Outlook Handbook.',
    },
    {
      value: '12',
      unit: 'facilities',
      text: 'were already submitting critical hospital data to CDC through automated FHIR-based exchange, exceeding CDC’s 2025 target of 10 facilities.',
      source: 'CDC Public Health Data Strategy.',
    },
  ],
  landscape: {
    heading: 'A growing surveillance ecosystem',
    entries: [
      {
        name: 'NSSP / BioSense',
        text: 'Near-real-time syndromic surveillance infrastructure that receives data from thousands of healthcare facilities and supports early detection and monitoring.',
      },
      {
        name: 'NBS',
        text: 'CDC-developed disease-surveillance infrastructure that supports reportable-disease workflows, case investigation, electronic laboratory reporting, and standards-based exchange.',
      },
      {
        name: 'CDC Public Health Data Strategy / 1CDP',
        text: 'Ongoing modernization focused on integrated data, faster exchange, reusable analytics, FHIR adoption, and reducing siloed public-health data systems.',
      },
    ],
  },
  fit: {
    heading: 'Where Signal fits',
    flow: ['Healthcare & laboratory systems', 'Signal sidecar', 'Public-health surveillance ecosystem'],
    /** The flow step that is Signal itself. */
    signalStep: 1,
    claim: 'Complement, not replacement.',
    text: 'Signal does not aim to replace national, state, or jurisdictional surveillance platforms. It explores a complementary, vendor-agnostic sidecar approach that can sit closer to the laboratory and healthcare-system level, transform routine laboratory data into surveillance signals, and support standards-based exchange with broader public-health infrastructure.',
  },
  ai: {
    heading: 'AI is changing the work—but governance matters',
    text: 'In 2024, predictive AI was already integrated into the EHR environment at 71% of U.S. non-federal acute care hospitals. Adoption is increasing, but so is the expectation that healthcare organizations evaluate AI for accuracy, bias, and performance after implementation. For Signal, this reinforces a design principle used throughout the project: AI should support surveillance and analysis without replacing human review, validation, or accountable decision-making.',
  },
  source:
    'Sources: ASTP/ONC, Hospital Trends in the Use, Evaluation, and Governance of Predictive AI, 2023–2024; U.S. Bureau of Labor Statistics, Occupational Outlook Handbook; CDC Public Health Data Strategy; CDC National Syndromic Surveillance Program; CDC National Electronic Disease Surveillance System Base System.',
} as const;

/** The hero screenshot: a real capture of the live prototype. */
export const DASHBOARD_SHOT = {
  width: 2880,
  height: 1800,
  alt: 'The Signal Dashboard on Scenario Replay Day 5: Regional Outbreak Status for Worcester County, MA, with four signals requiring attention, led by COVID-19 at critical.',
  caption: 'The Signal Dashboard in the live prototype, on Scenario Replay Day 5.',
} as const;
