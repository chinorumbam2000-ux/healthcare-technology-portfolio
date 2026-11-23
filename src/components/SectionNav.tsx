/**
 * Compact section navigation: plain anchor links to each case-study section's
 * heading. Sticky from 1024px, and the headings carry a matching scroll margin
 * so a jump never lands under it; a static, wrapped row on smaller screens.
 * Following a link moves the browser's focus starting point to that heading,
 * so the next Tab continues from there. No scripts, no animation.
 */
export default function SectionNav({ items }: { items: ReadonlyArray<{ label: string; target: string }> }) {
  return (
    <nav className="section-nav" aria-label="Sections">
      <div className="container">
        <ul role="list" className="section-nav__list">
          {items.map((item) => (
            <li key={item.target}>
              <a href={`#${item.target}`} className="section-nav__link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
