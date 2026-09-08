import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backdropImage}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.inner}>
        <h1 className={`serif ${styles.title}`}>
          <span>BUILDING</span>
          <em className="serif-italic">Bengaluru</em>
          <span>SINCE 1973</span>
        </h1>

        <div className={styles.lede}>
          <span className={styles.rule} aria-hidden="true" />
          <p>
            Five decades of structural precision and visionary planning.{" "}
            <br />
            Shaping the foundation where Bengaluru lives, works, and grows{" "}
            <br />
            through engineering excellence.
          </p>
        </div>

        <div className={styles.actions}>
          <a href="#projects" className="btn btn--primary">
            Explore Projects
          </a>
          <a href="#projects" className="btn btn--light">
            View All Listings
          </a>
        </div>
      </div>

      {/* Figma node 5:2394 — white cut-out card; the hole exposes the
          un-dimmed hero photograph behind it. */}
      <a href="#projects" className={styles.spotCard}>
        <span className={styles.spotWindow} aria-hidden="true">
          <img src="/assets/hero-bg.png" alt="" className={styles.spotPhoto} />
        </span>
        <img
          src="/assets/hero-card-thumb.svg"
          alt=""
          className={styles.spotShape}
          aria-hidden="true"
        />
        <span className={styles.spotText}>
          <span className={styles.spotName}>Indiranagar</span>
          <span className={styles.spotMeta}>1M sq.ft</span>
          <img
            src="/assets/hero-arrow.svg"
            alt=""
            width={12}
            height={12}
            className={styles.spotArrow}
            aria-hidden="true"
          />
        </span>
      </a>
    </section>
  );
}
