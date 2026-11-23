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
    'Signal by ProbeSyQ is a vendor-agnostic outbreak intelligence sidecar designed to integrate alongside existing clinical systems and help healthcare and public-health teams make better use of routine laboratory data for earlier disease surveillance. Rather than replacing an organization’s existing laboratory information system or electronic health record, Signal is designed to sit alongside those systems and use standards-based interoperability, including HL7 v2 and FHIR, to support the flow of laboratory data into a dedicated surveillance environment.',
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

/**
 * Stage 5, How I Built Signal. The flow is the intended production
 * architecture; the public prototype is a static site on synthetic data. Every
 * technology named here is in the Signal repository (frontend in src/, the
 * FastAPI + PostgreSQL backend in backend/).
 */
export const BUILT = {
  heading: 'How I Built Signal',
  lead: 'Signal was designed as a vendor-agnostic sidecar so it could add outbreak-intelligence capabilities without requiring an organization to replace its existing clinical systems.',
  flow: [
    'Laboratory & EHR systems',
    'HL7 v2 / FHIR interoperability',
    'Signal by ProbeSyQ sidecar',
    'Surveillance & analytics',
    'Early-warning intelligence',
  ],
  /** The flow step that is Signal itself. */
  signalStep: 2,
  caption:
    'Intended production architecture: Signal sits alongside existing clinical systems and uses standards-based interoperability to move laboratory data into a dedicated surveillance workflow.',
  explanation:
    'Rather than building another laboratory information system or electronic health record, I designed Signal as a sidecar application. The goal is to preserve the systems organizations already use while adding a separate layer for surveillance, analytics, geographic intelligence, signal review, and outbreak investigation. Standards such as HL7 v2 and FHIR provide the interoperability path, while laboratory terminology such as LOINC supports consistent representation of laboratory observations. Signal’s current surveillance logic uses interpretable methods including EWMA, CUSUM, and a composite signal score rather than relying on a black-box model.',
  stack: {
    heading: 'Technology stack',
    entries: [
      { area: 'Frontend', tech: 'React · TypeScript · Vite', text: 'Interactive application interface, surveillance views, routing and responsive user experience.' },
      { area: 'Backend', tech: 'FastAPI · Python', text: 'API architecture for health checks, data services and future interoperability workflows.' },
      {
        area: 'Data layer',
        tech: 'PostgreSQL · SQLAlchemy · Alembic',
        text: 'Structured architecture for facilities, laboratory observations, surveillance signals and audit events.',
      },
      {
        area: 'Interoperability',
        tech: 'HL7 v2 · FHIR · LOINC',
        text: 'Standards and terminology used to shape the intended flow of clinical laboratory information into Signal.',
      },
      { area: 'Deployment', tech: 'GitHub Pages · GitHub Actions', text: 'Public frontend deployment and automated build workflow.' },
      {
        area: 'Quality & testing',
        tech: 'Vitest · browser testing · accessibility testing · TypeScript type checking',
        text: 'Used to verify application behaviour, routing, responsive layouts, accessibility and build integrity.',
      },
    ],
  },
  decisions: {
    heading: 'Key design decisions',
    items: [
      {
        title: 'Sidecar, not replacement',
        decision: 'Design Signal to complement existing LIS and EHR infrastructure.',
        why: 'Replacing core clinical systems would create unnecessary disruption, cost and vendor dependence. The sidecar model keeps Signal focused on surveillance intelligence.',
      },
      {
        title: 'Synthetic data for the public prototype',
        decision: 'Use synthetic laboratory and surveillance data.',
        why: 'It allows the complete workflow to be demonstrated publicly without exposing patient information or connecting to a real healthcare organization.',
      },
      {
        title: 'Interpretable surveillance first',
        decision:
          'Keep the core surveillance logic transparent and reviewable rather than making outbreak detection dependent on an opaque AI model.',
        why: 'Public-health signals should be understandable, auditable and subject to human review.',
      },
      {
        title: 'Vendor-neutral interoperability',
        decision:
          "Base the architecture on standards such as HL7 v2, FHIR and LOINC rather than a single vendor's proprietary ecosystem.",
        why: 'The long-term goal is for Signal to work across different laboratory and EHR environments.',
      },
      {
        title: 'Prototype first, production architecture next',
        decision: 'Prioritize a working, testable public prototype while building the backend and database architecture incrementally.',
        why: 'This allowed the core surveillance experience and product concept to be demonstrated before investing in production-scale integration.',
      },
    ],
  },
} as const;

/**
 * Stage 6, See Signal in Action: the narrated walkthrough of the public
 * prototype (synthetic data), embedded from YouTube's privacy-enhanced domain.
 */
const DEMO_VIDEO_ID = 'HfU7U67jeiQ';

export const DEMO = {
  heading: 'See Signal in Action',
  intro:
    'Watch a walkthrough of the working Signal prototype, from surveillance monitoring and signal investigation to analytics, geographic intelligence, and the intended interoperability architecture.',
  video: {
    id: DEMO_VIDEO_ID,
    title: 'Signal by ProbeSyQ prototype walkthrough',
    /** No autoplay, loop or mute parameters: the viewer starts it, with YouTube's own controls and captions. */
    embedUrl: `https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?rel=0`,
    watchUrl: `https://youtu.be/${DEMO_VIDEO_ID}`,
  },
  labels: 'Working prototype · Synthetic data · Narrated & captioned demo',
  fallback: 'Watch on YouTube',
} as const;

/**
 * Stage 7, Proof It Works: software-reliability evidence only, never clinical
 * performance. Each claim is backed by the Signal repository at its deployed
 * commit: 933 of 933 Vitest tests passing across 68 files; the GitHub Pages
 * workflow runs the tests and `tsc -b && vite build` before each deployment;
 * the route guard (/signin, return to the deep link) and SMART-route tests;
 * and the landing-page commits that removed the duplicate hero calls to
 * action and broadened the Multi-profile monitoring wording. The browser
 * checks (axe-core scans, keyboard, reduced motion, 375–1440 px) were run
 * against the live deployment at each release; no lifetime total is claimed.
 *
 * In `changes`, text between backticks is shown as code.
 */
export const PROOF = {
  heading: 'Proof It Works',
  lead: 'Signal was tested as working software across functionality, routing, accessibility, responsive behavior, and production deployment—not as a clinically validated surveillance system.',
  intro:
    'Testing focused on whether the prototype behaves reliably as software: whether users can access the application, navigate surveillance workflows, review signals, use protected routes, interact with SMART-related routes, view the interface across screen sizes, and use the application with accessible keyboard and reduced-motion behavior. The prototype was also repeatedly checked after production deployments to confirm that new changes did not break existing functionality.',
  areas: [
    {
      title: 'Automated frontend testing',
      metric: '933 / 933 tests passing',
      text: 'Signal’s frontend test suite verifies application behavior, routing, surveillance views, authentication flows, component behavior, and regression-sensitive functionality.',
    },
    {
      title: 'Production browser validation',
      metric: 'Production smoke checks passed across deployed releases',
      text: 'Browser-based checks were run against the live GitHub Pages deployment to verify navigation, sign-in, protected-route returns, SMART routes, surveillance views, and release-critical behavior.',
    },
    {
      title: 'Responsive & accessibility validation',
      metric: '375 px → 1440 px',
      text: 'Signal was checked across mobile, tablet, laptop, and desktop widths, with no horizontal scrolling in the tested layouts. Accessibility scans, keyboard navigation, focus behavior, and reduced-motion behavior were also tested.',
    },
    {
      title: 'Build integrity',
      metric: 'Typecheck + production build',
      text: 'TypeScript type checking and production builds were run before release, helping catch implementation errors before deployment.',
    },
  ],
  summary: {
    title: 'Software validation summary',
    items: [
      { icon: 'tests', value: '933 / 933', label: 'Frontend tests passing', figure: true },
      { icon: 'responsive', value: '375–1440 px', label: 'Responsive layouts checked', figure: true },
      { icon: 'accessibility', value: 'WCAG accessibility checks', label: 'Keyboard, focus, reduced motion and automated scans', figure: false },
      { icon: 'deployment', value: 'Production deployment checks', label: 'Routing, authentication, SMART routes and release smoke testing', figure: false },
    ],
  },
  changes: {
    heading: 'Testing changed the product',
    items: [
      {
        title: 'Routing and sign-in',
        text: 'Protected routes were tested so signed-out users are redirected to `/signin` and returned to their intended destination after authentication.',
      },
      {
        title: 'Landing-page simplification',
        text: 'Duplicate hero calls to action were removed after reviewing the first-screen experience, leaving navigation and Sign in in the header.',
      },
      {
        title: 'Surveillance wording',
        text: 'The Multi-profile monitoring description was broadened so the public landing page reflects multiple disease and syndrome profiles instead of implying a respiratory-only scope.',
      },
      {
        title: 'Responsive behavior',
        text: 'Layouts were repeatedly checked at 375, 768, 1024, 1280 and 1440 px to catch spacing, overflow and visual-balance issues before deployment.',
      },
      {
        title: 'Accessibility',
        text: 'Keyboard focus, heading structure, reduced-motion behavior, accessible labels and automated accessibility scans were incorporated into release checks.',
      },
    ],
  },
  limits: {
    heading: 'What this does not prove',
    text: 'Passing software tests does not mean Signal is clinically validated or proven to detect real-world outbreaks. The current public prototype uses synthetic data. Real deployment would require validation with appropriate healthcare and public-health partners, governance, security review, real-world data evaluation, and ongoing performance monitoring.',
  },
  approach: {
    label: 'Testing approach:',
    text: 'automated unit and component tests, TypeScript type checking, production builds, browser-based smoke checks, responsive testing, accessibility scans, keyboard testing, and production verification.',
  },
} as const;

/**
 * Stage 8, Responsible AI. Keeps three things apart: the current prototype
 * (transparent statistical signal logic such as CUSUM and EWMA, synthetic data,
 * human review; no model-based detection), future AI capabilities, and what a
 * real-world deployment would require.
 */
export const RESPONSIBLE_AI = {
  heading: 'Responsible AI',
  lead: 'For Signal, responsible AI starts with knowing where automation should stop.',
  intro:
    'Signal is designed to support surveillance and investigation, not replace professional judgment. The current prototype keeps its core surveillance logic interpretable and reviewable, uses synthetic data for public demonstration, and deliberately avoids autonomous diagnosis or autonomous public-health action. Any future AI capability would need to operate within the same human-reviewed, auditable and privacy-conscious framework.',
  areas: [
    {
      title: 'Deliberate limits on AI',
      text: 'Signal does not depend on a black-box model to declare that an outbreak is occurring. The current prototype uses transparent surveillance logic and presents signals for human review. AI can support future pattern recognition, prioritization and analysis, but it should not independently make clinical or public-health decisions. The current Roella assistant is rule-based and responds from Signal’s own application data; it is not powered by a large language model.',
    },
    {
      title: 'Human oversight',
      text: 'Surveillance signals are treated as prompts for investigation rather than final conclusions. A human user remains responsible for reviewing the supporting evidence, understanding the context, and deciding whether escalation or further investigation is appropriate.',
    },
    {
      title: 'Bias and fairness',
      text: 'Outbreak surveillance can be affected by differences in testing access, healthcare utilization, geography, reporting practices and population coverage. Signal therefore should not assume that higher or lower observed activity represents the full underlying disease burden. Future model-based features would require subgroup evaluation, monitoring for unequal performance, and review of how data availability may shape results.',
    },
    {
      title: 'Privacy and security',
      text: 'The public prototype uses synthetic data and contains no real patient information. In a real deployment, access control, encryption, secure authentication, audit logging, minimum-necessary data use, and organizational privacy and security requirements would be essential before processing protected health information.',
    },
    {
      title: 'Standards and auditability',
      text: 'Signal’s intended architecture uses standards such as HL7 v2, FHIR and LOINC to support consistent and traceable data exchange. Surveillance signals should remain explainable, with enough supporting information for users to understand why a signal was generated and to review the data and logic behind it.',
    },
  ],
  flow: {
    title: 'Human-reviewed surveillance by design',
    steps: [
      { label: 'Laboratory data', human: false },
      { label: 'Transparent surveillance logic', human: false },
      { label: 'Signal generated', human: false },
      { label: 'Human review', human: true },
      { label: 'Investigation / public-health decision', human: true },
    ],
  },
  risks: {
    heading: 'Risk → Control',
    pairs: [
      { risk: 'Automation risk', control: 'Human review before escalation or action.' },
      {
        risk: 'Bias risk',
        control: 'Subgroup evaluation, data-quality review and ongoing performance monitoring before future AI deployment.',
      },
      {
        risk: 'Privacy risk',
        control: 'Synthetic data in the public prototype; minimum-necessary data, access controls, encryption and audit logging in any real deployment.',
      },
      {
        risk: 'Explainability risk',
        control: 'Transparent signal logic and visible supporting evidence rather than unexplained automated conclusions.',
      },
    ],
  },
  boundary: {
    heading: 'Before real-world AI deployment',
    text: 'Any AI capability used with real healthcare or public-health data would require formal validation, governance approval, security and privacy review, bias and performance evaluation, ongoing monitoring, and clearly defined human accountability before operational use.',
  },
} as const;

/**
 * Stage 9, Business Impact & What's Next. Keeps four things apart: potential
 * value (not achieved anywhere), what implementation would require (no cost
 * figures: none has been established), the proposed adoption path and roadmap
 * (future, none of it done), and what the prototype is today (its limitations).
 */
export const BUSINESS = {
  heading: 'Business Impact & What’s Next',
  lead: 'Signal’s potential value comes from helping organizations make better use of laboratory data they already generate, without requiring them to replace the clinical systems they already depend on.',
  value: {
    heading: 'Potential organizational value',
    items: [
      {
        title: 'Earlier surveillance visibility',
        text: 'Signal is designed to bring laboratory activity, surveillance profiles, analytics and active signals into one focused environment, helping surveillance teams identify patterns that may warrant attention earlier in the review process.',
      },
      {
        title: 'Better use of existing laboratory data',
        text: 'Routine laboratory data already generated during patient care can also contribute to population-level surveillance. Signal explores how that information can be organized into a dedicated outbreak-intelligence workflow rather than remaining useful only at the individual-result level.',
      },
      {
        title: 'Lower-disruption integration model',
        text: 'Because Signal is designed as a sidecar, organizations would not need to replace their existing LIS or EHR simply to add the surveillance layer. Standards-based integration is intended to reduce dependence on a single clinical-system vendor.',
      },
      {
        title: 'More structured investigation',
        text: 'Signals, supporting indicators, geography, analytics and investigation status are brought into one workflow so that users can move from detection to review without relying entirely on disconnected reports or manual interpretation.',
      },
    ],
  },
  cost: {
    heading: 'What implementation would cost',
    intro:
      'Signal is currently a prototype, so a real implementation cost has not been established. The major cost drivers would come from integration, infrastructure, validation, security, governance and ongoing support rather than from the public prototype itself.',
    areas: [
      {
        area: 'Integration',
        text: 'Interface development, data mapping, terminology mapping, FHIR or HL7 v2 configuration, and testing with each participating clinical system.',
      },
      { area: 'Infrastructure', text: 'Secure hosting, database services, monitoring, backups, networking and production availability requirements.' },
      {
        area: 'Security & compliance',
        text: 'Identity and access management, encryption, audit logging, privacy review, security assessment and organization-specific compliance work.',
      },
      {
        area: 'Validation',
        text: 'Clinical and public-health validation, data-quality evaluation, workflow testing and performance monitoring before operational use.',
      },
      { area: 'Operations', text: 'Training, user support, interface maintenance, surveillance-profile maintenance and ongoing system monitoring.' },
    ],
  },
  path: {
    heading: 'A phased adoption path',
    phases: [
      { name: 'Connect', text: 'Establish a standards-based interface with one laboratory or healthcare environment using a limited data scope.' },
      {
        name: 'Validate',
        text: 'Compare Signal’s outputs with existing surveillance workflows using historical, synthetic or approved real-world data under appropriate governance.',
      },
      {
        name: 'Pilot',
        text: 'Run Signal in a limited operational setting with human review, defined users, clear escalation rules and measurable success criteria.',
      },
      {
        name: 'Scale',
        text: 'Expand to additional facilities, disease and syndrome profiles, interfaces and public-health integrations after validation and governance approval.',
      },
    ],
  },
  limitations: {
    heading: 'Current limitations',
    items: [
      { title: 'Synthetic data', text: 'The public prototype does not use real patient or production laboratory data.' },
      {
        title: 'No live production integration',
        text: 'The public application is not connected to a real LIS, EHR, hospital, laboratory or public-health agency.',
      },
      {
        title: 'No clinical validation',
        text: 'Signal has not been validated for real-world outbreak detection or operational public-health decision-making.',
      },
      {
        title: 'Prototype-scale surveillance',
        text: 'The current application demonstrates selected disease and syndrome profiles and a controlled surveillance scenario rather than production-scale regional or national surveillance.',
      },
      {
        title: 'Development-stage backend',
        text: 'The backend, database and interoperability architecture are still being developed toward a production-capable implementation.',
      },
    ],
  },
  roadmap: {
    heading: 'Next version roadmap',
    items: [
      {
        title: 'Real standards-based ingestion',
        text: 'Extend the existing interoperability work into controlled ingestion from approved FHIR and HL7 v2 test environments.',
      },
      {
        title: 'Broader surveillance profiles',
        text: 'Expand configurable disease and syndrome monitoring while maintaining transparent surveillance logic and human review.',
      },
      {
        title: 'Stronger geographic intelligence',
        text: 'Develop deeper geographic and facility-level analysis for comparing emerging patterns across locations.',
      },
      {
        title: 'Validation framework',
        text: 'Establish formal evaluation methods for data quality, surveillance performance, bias, usability and workflow impact before real-world use.',
      },
      {
        title: 'Security and governance',
        text: 'Strengthen authentication, authorization, audit logging, deployment security, privacy controls and governance requirements for production environments.',
      },
      {
        title: 'Pilot readiness',
        text: 'Prepare Signal for a limited, partner-approved pilot only after technical validation, privacy and security review, and defined operational success criteria.',
      },
    ],
  },
  closing:
    'The next milestone is not to make Signal more autonomous. It is to make the system more connected, validated, secure and useful to the people responsible for surveillance decisions.',
} as const;

/**
 * Stage 10A, About Me & This Project: who built Signal, the roles they are
 * pursuing (targets, not positions held, in no order), and the skills the
 * project itself demonstrates. No résumé, education, certifications or
 * employment history.
 */
export const ABOUT = {
  heading: 'About Me & This Project',
  lead: 'Signal brings together my background in Medical Laboratory Sciences with my growing focus on clinical information systems, interoperability, healthcare analytics, and responsible AI.',
  about:
    'Munyaradzi Chinorumba is a Master of Science in Healthcare Technology (MSHT) degree holder with a background in Medical Laboratory Sciences and a growing focus on clinical information systems, data interoperability, analytics, and healthcare AI. Signal by ProbeSyQ reflects that intersection by combining laboratory knowledge with healthcare technology, public-health surveillance, software development, and standards-based interoperability.',
  roles: {
    heading: 'Target roles',
    items: ['Healthcare Technology Analyst', 'Clinical Informatics Analyst', 'EHR / LIS Analyst', 'Healthcare Data Analyst'],
  },
  skills: {
    heading: 'Skills this project demonstrates',
    items: [
      {
        title: 'Clinical information systems',
        text: 'Understanding of laboratory and EHR workflows and how new technology can complement existing clinical systems.',
      },
      { title: 'Interoperability', text: 'Application of HL7 v2, FHIR and LOINC concepts to the intended exchange of laboratory information.' },
      {
        title: 'Laboratory informatics',
        text: 'Use of Medical Laboratory Sciences knowledge to shape surveillance profiles, laboratory observations and outbreak-monitoring workflows.',
      },
      {
        title: 'Healthcare analytics',
        text: 'Design of surveillance metrics, trend views, signal scoring and geographic intelligence for public-health monitoring.',
      },
      {
        title: 'Software development',
        text: 'Frontend development with React and TypeScript, backend development with FastAPI and Python, and database architecture using PostgreSQL, SQLAlchemy and Alembic.',
      },
      {
        title: 'Testing & accessibility',
        text: 'Automated testing, type checking, production builds, browser validation, responsive testing, keyboard testing and accessibility checks.',
      },
      {
        title: 'Responsible AI & governance',
        text: 'Design choices that keep surveillance interpretable, human-reviewed and appropriately limited rather than relying on autonomous clinical or public-health decisions.',
      },
      {
        title: 'Product & systems thinking',
        text: 'Translation of a healthcare problem into a working prototype, architecture, adoption path, validation strategy and future roadmap.',
      },
    ],
  },
} as const;

/**
 * Stage 10B, What I Learned: the reflection, three paragraphs, 208 words.
 */
export const REFLECTION = {
  heading: 'What I Learned',
  paragraphs: [
    'Building Signal changed the way I think about healthcare technology projects. I started with a public-health problem and quickly learned that creating a useful solution requires much more than building a working interface. I had to think about clinical workflows, interoperability, data quality, surveillance logic, system architecture, privacy, accessibility, testing, and how a real organization might eventually adopt the product.',
    'One of the most important lessons was learning to separate what a prototype can demonstrate from what would still require real-world validation. Signal can show a working surveillance workflow using synthetic data, but that does not mean it is clinically validated or ready for operational deployment. That distinction influenced many of my design decisions, including keeping the surveillance logic interpretable, maintaining human review, and being transparent about current limitations.',
    'The project also strengthened my ability to connect my Medical Laboratory Sciences background with healthcare technology. Working across laboratory informatics, HL7 v2, FHIR, analytics, frontend and backend development, testing, and responsible AI helped me see how these areas come together in real clinical-information-system projects. Most importantly, I learned to approach technology as both a builder and a healthcare professional: asking not only whether a system can be built, but whether it is understandable, safe, useful, and realistic to implement.',
  ],
} as const;

/**
 * Stage 10B, Credits. An individual capstone: no teammates. The resources are
 * the supplied list plus those actually in the repositories (Signal's
 * package.json and backend/requirements.txt, and the map's tile layer):
 * React Router, Tailwind CSS, Recharts, Leaflet, React Leaflet, OpenStreetMap
 * tiles (attribution required), fhirclient, fhir.resources, Vitest and
 * Testing Library. No web fonts, icon libraries, image assets or third-party
 * datasets are used: every dataset, hospital and map area is synthetic, made
 * for the project, and the portfolio's screenshot is a capture of Signal.
 */
export const CREDITS = {
  heading: 'Credits',
  project: {
    heading: 'Project',
    text: 'Signal by ProbeSyQ was conceived, designed, and developed as an individual Healthcare Technology capstone project by Munyaradzi Chinorumba.',
  },
  resources: {
    heading: 'Technologies & third-party resources',
    groups: [
      { name: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS', 'Recharts'] },
      { name: 'Backend & data', items: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'fhir.resources'] },
      {
        name: 'Standards & interoperability',
        items: ['HL7 FHIR standards', 'HL7 v2 concepts', 'LOINC terminology', 'SMART on FHIR JavaScript client (fhirclient)'],
      },
      { name: 'Maps', items: ['Leaflet', 'React Leaflet', 'OpenStreetMap map tiles and data'] },
      { name: 'Testing', items: ['Vitest', 'Testing Library'] },
      { name: 'Hosting & delivery', items: ['GitHub', 'GitHub Actions', 'YouTube for hosting the narrated demo'] },
    ],
    /** OpenStreetMap's licence asks for this attribution, linked to its copyright page. */
    osm: { item: 'OpenStreetMap map tiles and data', credit: '© OpenStreetMap contributors', href: 'https://www.openstreetmap.org/copyright' },
    note: 'Open-source technologies and standards were used to build and demonstrate the prototype. Their inclusion here acknowledges the tools and standards that supported the project; full research references appear in the Sources section.',
  },
} as const;

/**
 * Stage 10C, Sources: twelve references in APA 7 style, in APA order
 * (alphabetical by author; one author's works n.d. first, then by date; the
 * four CDC pages from 2026 take the letters a–d, assigned by title). Every
 * URL, author, date, title, organization and report number was checked
 * against the source: the three ASTP data briefs' suggested citations, the
 * date each CDC page shows, the BLS page's last-modified date (2026), FHIR
 * R4 v4.0.1 (published November 1, 2019), SMART App Launch v2.2.0, and the
 * LOINC page (Regenstrief Institute). Each entry: author, date, the italic
 * title, what follows the title, and the URL.
 */
export const SOURCES = {
  heading: 'Sources',
  intro:
    'Sources used to frame the public-health problem, market landscape, interoperability approach, surveillance ecosystem, workforce context, and healthcare AI environment are listed below.',
  references: [
    {
      author: 'Centers for Disease Control and Prevention.',
      date: '(2025, December 30).',
      title: 'About National Electronic Disease Surveillance System Base System (NBS)',
      after: '.',
      url: 'https://www.cdc.gov/nbs/php/about/',
    },
    {
      author: 'Centers for Disease Control and Prevention.',
      date: '(2026a, September 1).',
      title: 'About NSSP',
      after: '.',
      url: 'https://www.cdc.gov/nssp/php/about/',
    },
    {
      author: 'Centers for Disease Control and Prevention.',
      date: '(2026b, October 21).',
      title: 'About the Public Health Data Strategy',
      after: '.',
      url: 'https://www.cdc.gov/public-health-data-strategy/php/about/index.html',
    },
    {
      author: 'Centers for Disease Control and Prevention.',
      date: '(2026c, January 13).',
      title: 'BioSense Platform',
      after: '.',
      url: 'https://www.cdc.gov/nssp/php/about/about-nssp-and-the-biosense-platform.html',
    },
    {
      author: 'Centers for Disease Control and Prevention.',
      date: '(2026d, May 27).',
      title: 'Data modernization at CDC',
      after: '.',
      url: 'https://www.cdc.gov/data-modernization/php/about/index.html',
    },
    {
      author: 'Chang, W., Owusu-Mensah, P., Everson, J., & Richwine, C.',
      date: '(2025, September).',
      title: 'Hospital trends in the use, evaluation, and governance of predictive AI, 2023–2024',
      after: ' (Data Brief No. 80). Office of the Assistant Secretary for Technology Policy.',
      url: 'https://healthit.gov/data/data-briefs/hospital-trends-use-evaluation-and-governance-predictive-ai-2023-2024/',
    },
    {
      author: 'Health Level Seven International.',
      date: '(n.d.).',
      title: 'SMART App Launch: Launch and authorization',
      after: ' (Version 2.2.0).',
      url: 'https://www.hl7.org/fhir/smart-app-launch/app-launch.html',
    },
    {
      author: 'Health Level Seven International.',
      date: '(2019).',
      title: 'FHIR overview',
      after: ' (Version 4.0.1).',
      url: 'https://www.hl7.org/fhir/R4/overview.html',
    },
    {
      author: 'Owusu-Mensah, P., & Richwine, C.',
      date: '(2025, July).',
      title: 'Electronic public health reporting among non-federal acute care hospitals, 2024',
      after: ' (Data Brief No. 78). Office of the Assistant Secretary for Technology Policy.',
      url: 'https://healthit.gov/data/data-briefs/electronic-public-health-reporting-among-non-federal-acute-care-hospitals-2024/',
    },
    {
      author: 'Regenstrief Institute.',
      date: '(n.d.).',
      title: 'About LOINC',
      after: '.',
      url: 'https://loinc.org/about/',
    },
    {
      author: 'Strawley, C., Larson, J., & Patel, V.',
      date: '(2024, September).',
      title: 'Laboratory interoperability through health information exchange organizations',
      after: ' (Data Brief No. 74). Office of the Assistant Secretary for Technology Policy.',
      url: 'https://healthit.gov/data/data-briefs/laboratory-interoperability-through-health-information-exchange-organizations/',
    },
    {
      author: 'U.S. Bureau of Labor Statistics.',
      date: '(2026).',
      title: 'Health information technologists and medical registrars',
      after: '. Occupational Outlook Handbook.',
      url: 'https://www.bls.gov/ooh/healthcare/health-information-technologists-and-medical-registrars.htm',
    },
  ],
} as const;

/**
 * Stage 10C, AI Use Disclosure. AI assisted the work; the concept, problem,
 * requirements, design, evaluation, testing and final decisions stayed with
 * the author. Only the tools with evidence of material use are named: the
 * project records show no other generative-AI tool.
 */
export const AI_DISCLOSURE = {
  heading: 'AI Use Disclosure',
  opening:
    'AI tools were used as assistants during the development of Signal by ProbeSyQ. They supported selected research, refinement, coding, troubleshooting, and review tasks, while the project concept, healthcare problem, requirements, design direction, evaluation, testing, revisions, and final decisions remained my responsibility.',
  tools: [
    {
      name: 'OpenAI',
      text: 'OpenAI was used as a research, review, and refinement assistant. It supported selected technical and healthcare research, helped clarify interoperability and responsible-AI concepts, and assisted with refining written materials. Its outputs were reviewed, verified where appropriate, and adapted to the project requirements, while the project ideas, final decisions, and overall project direction remained my responsibility.',
    },
    {
      name: 'Claude — Anthropic',
      text: 'Claude was used primarily as a coding and implementation assistant. It helped create and refine frontend and backend code, write and update tests, inspect the codebase, verify project behavior, troubleshoot issues, and support Git/GitHub deployment workflows. Code and changes were reviewed, tested, and approved before being committed or deployed.',
    },
  ],
  distinction: {
    heading: 'Development AI is not the same as product AI',
    text: 'OpenAI and Claude were tools used to assist the development process. Their use does not mean that Signal’s surveillance engine is powered by a large language model. The current prototype’s core surveillance signals are generated through transparent statistical and rule-based methods and remain subject to human review. Any future AI capabilities would require separate validation, governance, security review, performance evaluation, and clearly defined human oversight before operational use.',
  },
} as const;

/**
 * The section navigation: each label and the id of the section heading it
 * jumps to (the headings' existing ids).
 */
export const SECTION_NAV = [
  { label: 'Pitch', target: 'pitch-title' },
  { label: 'Problem', target: 'problem-title' },
  { label: 'Why Now', target: 'why-now-title' },
  { label: 'Build', target: 'built-title' },
  { label: 'Demo', target: 'demo-title' },
  { label: 'Proof', target: 'proof-title' },
  { label: 'Responsible AI', target: 'rai-title' },
  { label: 'Impact', target: 'biz-title' },
  { label: 'About', target: 'about-title' },
] as const;

/** The hero screenshot: a real capture of the live prototype. */
export const DASHBOARD_SHOT = {
  width: 2880,
  height: 1800,
  alt: 'The Signal Dashboard on Scenario Replay Day 5: Regional Outbreak Status for Worcester County, MA, with four signals requiring attention, led by COVID-19 at critical.',
  caption: 'The Signal Dashboard in the live prototype, on Scenario Replay Day 5.',
} as const;
