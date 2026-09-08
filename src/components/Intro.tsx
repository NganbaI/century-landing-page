import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.intro} id="about">
      <h2 className={`serif ${styles.heading}`}>
        For over five decades, we&apos;ve learned to listen before we build. To
        the land, to the city, and to the lives that will unfold there. Every
        place is shaped with patience, purpose, and an{" "}
        <em className={styles.accent}>eye on what comes next.</em>
      </h2>
    </section>
  );
}
