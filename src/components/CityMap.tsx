import Image from "next/image";
import styles from "./CityMap.module.css";

const REGIONS = [
  { index: "01", name: "Central & South", note: "The Heritage Holdings" },
  { index: "02", name: "East", note: "The Tech Corridor" },
  { index: "03", name: "North", note: "The Future Hub" },
];

const FEATURES = [
  {
    index: "01",
    title: "Century Ethos",
    copy: "Thoughtfully designed residences for elevated living.",
    image: "/assets/feature-1b.png",
    inset: true,
    copyWidth: 246,
    tone: "light" as const,
  },
  {
    index: "02",
    title: "Century Trails",
    copy: "Architecture shaped around light, space and living.",
    image: "/assets/feature-2b.png",
    inset: true,
    copyWidth: 236,
    tone: "light" as const,
  },
  {
    index: "03",
    title: "Tailored support",
    copy: "Recommendations based on your goals, budget, and lifestyle.",
    image: "/assets/feature-3.png",
    inset: false,
    copyWidth: 215,
    tone: "dark" as const,
  },
];

export default function CityMap() {
  return (
    <section className={styles.section}>
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src="/assets/city-map.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.map}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copyColumn}>
          <h2 className={`serif ${styles.heading}`}>
            A CITY WE HAVE{" "}
            <br />
            HELPED BUILD.
          </h2>

          <p className={styles.body}>
            Five decades of structural precision and visionary planning.{" "}
            <br />
            Shaping the foundation where Bengaluru lives, works, and grows{" "}
            <br />
            through engineering excellence.
          </p>

          <ul className={styles.regions}>
            {REGIONS.map((region, i) => (
              <li key={region.name} className={styles.region}>
                <span
                  className={styles.marker}
                  data-active={i === REGIONS.length - 1}
                >
                  {region.index}
                </span>
                <span>
                  <span className={styles.regionName}>{region.name}</span>
                  <span className={`serif-italic ${styles.regionNote}`}>
                    {region.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.plot} aria-hidden="true">
          <span className={styles.pin}>
            <span className={styles.pinRing} />
          </span>
          <span className={styles.dotA} />
          <span className={styles.dotB} />
        </div>
      </div>

      {/* Figma node 5:2661 "Features Media Stack" — 367-wide column of
          396-tall cards, 412 apart, clipped by the section. */}
      <div className={styles.stack}>
        {FEATURES.map((feature) => (
          <article
            key={feature.index}
            className={styles.feature}
            data-tone={feature.tone}
            style={{ "--copy-w": `${feature.copyWidth}px` } as React.CSSProperties}
          >
            <div className={styles.featureThumb}>
              {feature.inset ? (
                /* Figma nodes 5:2665 / 5:2674 — a 439x311 photo laid over the
                   241-tall card window at (-42, -35). */
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={439}
                  height={311}
                  className={styles.featureInset}
                />
              ) : (
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="367px"
                  className={styles.featureImage}
                />
              )}
            </div>
            <div className={styles.featureBody}>
              <div className={styles.featureHead}>
                <span>{feature.title}</span>
                <span className={styles.featureIndex}>{feature.index}</span>
              </div>
              <p className={styles.featureCopy}>{feature.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
