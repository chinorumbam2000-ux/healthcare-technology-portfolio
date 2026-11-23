# Portfolio

Munyaradzi Chinorumba's healthcare technology portfolio: a static site for
GitHub Pages. Its first case study is the MS Healthcare Technology capstone,
**Signal by ProbeSyQ — Outbreak Intelligence**.

The Signal application itself lives in its own repository,
[signal-by-probesyq](https://github.com/chinorumbam2000-ux/signal-by-probesyq),
and is not part of this one. This site links to it.

## Status

The Signal case study is built one approved stage at a time.

- Stage 1, Try It Now: the live application, the source code and how to sign in to the demo.
- Stage 2, The Pitch: what Signal is, what the prototype shows, and my role.
- Stage 3, The Problem Worth Solving: the evidence (ASTP/ONC, 2024), a bar chart, the stakeholders and the motivation.
- Stage 4, Why Now: the evidence, today's surveillance landscape, where Signal fits, and AI governance.
- Stage 5, How I Built Signal: the intended architecture, the technology stack and the key design decisions.
- Stage 6, See Signal in Action: the narrated walkthrough, embedded from YouTube (privacy-enhanced domain, no autoplay).
- Stage 7, Proof It Works: software-test and release-check evidence, what testing changed, and what it does not prove.
- Stage 8, Responsible AI: where automation stops, the human-review flow, risks and controls, and what real-world AI deployment would require.
- Stage 9, Business Impact & What’s Next: potential value, implementation cost drivers, a proposed adoption path, current limitations and the roadmap.
- Stage 10A, About Me & This Project: about me, target roles and the skills the project demonstrates.

## Structure

```
src/
  App.tsx                 portfolio shell: header, main, footer
  site.ts                 site-wide identity (name, ownership lines)
  styles.css              design tokens and styles
  components/             shell parts shared by every page
  projects/
    signal/               the Signal capstone case study
      signal.ts           its links and copy
      SignalCaseStudy.tsx its sections, in page order
      TryItNow.tsx        Stage 1
      Pitch.tsx           Stage 2
      Problem.tsx         Stage 3
      WhyNow.tsx          Stage 4
      HowIBuilt.tsx       Stage 5
      SeeItInAction.tsx   Stage 6
      ProofItWorks.tsx    Stage 7
      ResponsibleAI.tsx   Stage 8
      BusinessImpact.tsx  Stage 9
      AboutMe.tsx         Stage 10A
  __tests__/
```

Each further project goes in its own folder under `src/projects/`.

## Commands

```
npm install
npm run dev         local development server
npm test            unit tests (Vitest, Testing Library, jsdom)
npm run typecheck   tsc -b --force
npm run build       type-check and production build into dist/
```

The build uses relative asset URLs, so it works from a GitHub Pages user site
or from a project repository's sub-path without configuration.

## Deployment

`.github/workflows/deploy.yml` tests, builds and publishes `dist/` to GitHub
Pages on each push to `main`. It does nothing until the repository is pushed
to GitHub and Pages is set to deploy from GitHub Actions.

© 2026 Munyaradzi Chinorumba. All rights reserved.
ProbeSyQ™ and Signal by ProbeSyQ™ are trademarks claimed by their owner.
