import styles from "./Awards.module.css";

/* Figma nodes 5:2688 – 5:2708. `x` / `y` are the Figma offsets inside the
   awards band, kept exact for the desktop scatter. */
const AWARDS = [
  { title: "Luxury Project of the Year", meta: "Century Ethos, 2021", x: 507, y: 0 },
  {
    title: "Top 50 Leading Developers in India",
    meta: "Construction Week ranking",
    x: 976.29,
    y: 46,
  },
  {
    title: "Most Trusted Developer of the Year",
    meta: "2021",
    x: 45,
    y: 101.17,
  },
  { title: "Best Developer – South India", meta: "2024", x: 1019.81, y: 289.96 },
  {
    title: "Top 100 Leading Developers in India",
    meta: "Construction Week ranking",
    x: 132.29,
    y: 351,
  },
  { title: "Iconic Project of the Year", meta: "Century Ethos, 2020", x: 645, y: 407 },
];

export default function Awards() {
  return (
    <section className={styles.section} aria-labelledby="awards-heading">
      <div className={styles.scatter}>
        {AWARDS.map((award) => (
          <article
            key={award.title}
            className={styles.card}
            style={{ "--x": `${award.x}px`, "--y": `${award.y}px` } as React.CSSProperties}
          >
            <h3 className={`serif ${styles.cardTitle}`}>{award.title}</h3>
            <p className={`serif-italic ${styles.cardMeta}`}>{award.meta}</p>
          </article>
        ))}
      </div>

      <h2 id="awards-heading" className={`serif ${styles.heading}`}>
        Recognised for Excellence
      </h2>
    </section>
  );
}
