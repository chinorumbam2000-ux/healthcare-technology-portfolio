import { ABOUT } from './signal';

/**
 * Stage 10A, About Me & This Project: a short close to the case study. The
 * lead and one paragraph about me, the roles I am pursuing (an unordered list:
 * no ranking), and the skills Signal demonstrates as compact rows, two across
 * from 640px. No ratings, badges or résumé sections.
 */
export default function AboutMe() {
  const { roles, skills } = ABOUT;
  return (
    <section className="case-section" aria-labelledby="about-title">
      <div className="container case-section__grid">
        <h2 id="about-title" className="case-section__title">
          {ABOUT.heading}
        </h2>
        <div className="about">
          <p className="about__lead">{ABOUT.lead}</p>
          <p className="about__text">{ABOUT.about}</p>

          <div className="about__block">
            <h3 id="about-roles-title" className="about__subhead">
              {roles.heading}
            </h3>
            <ul role="list" className="roles" aria-labelledby="about-roles-title">
              {roles.items.map((role) => (
                <li key={role} className="roles__item">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="about__block">
            <h3 className="about__subhead">{skills.heading}</h3>
            <ul role="list" className="skills">
              {skills.items.map((skill) => (
                <li key={skill.title} className="skill">
                  <h4 className="skill__title">{skill.title}</h4>
                  <p className="skill__text">{skill.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
