import Image from "next/image";
import styles from "./Stats.module.css";

const STATS = [
  {
    value: "50+",
    label: "Years of Legacy",
    description: ["Trusted service", "from first call", "to final keys."],
    image: "/assets/stat-home.png",
    tone: "light" as const,
  },
  {
    value: "12",
    label: "Key Neighborhoods",
    description: [
      "Local expertise",
      "across the city’s",
      "most wanted areas.",
    ],
    image: "/assets/stat-aerial.png",
    tone: "dark" as const,
  },
  {
    value: "20M+",
    label: "Sq. ft. Delivered",
    description: ["Successful", "deals completed", "with confidence."],
    image: "/assets/stat-modern.png",
    tone: "light" as const,
  },
];

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.row}`}>
        {STATS.map((stat) => (
          <article key={stat.label} className={styles.card} data-tone={stat.tone}>
            <Image
              src={stat.image}
              alt=""
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
              className={styles.photo}
            />
            <div className={styles.body}>
              <p className={`serif ${styles.value}`}>{stat.value}</p>
              <p className={`serif-italic ${styles.label}`}>{stat.label}</p>
              <p className={styles.description}>
                {stat.description.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < stat.description.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
