import Image from "next/image";
import styles from "./Showcase.module.css";

export default function Showcase() {
  return (
    <section className={styles.section}>
      <div className="container">
        <article className={styles.card}>
          <Image
            src="/assets/video-poster.png"
            alt="Century Ethos, Hebbal"
            fill
            sizes="(max-width: 1440px) 100vw, 1356px"
            className={styles.media}
          />

          <div className={styles.overlay}>
            <div className={styles.topRow}>
              <div>
                <h3 className={`serif ${styles.title}`}>Century Ethos</h3>
                <p className={styles.place}>Hebbal</p>
              </div>

              <div className={styles.pager}>
                <div className={styles.arrows}>
                  <button type="button" aria-label="Previous project">
                    <img src="/assets/arrow-left.svg" alt="" width={38} height={15} />
                  </button>
                  <button type="button" aria-label="Next project">
                    <img src="/assets/arrow-right.svg" alt="" width={75} height={15} />
                  </button>
                </div>
                <p className={styles.count}>Key Projects 1/3</p>
              </div>
            </div>

            <div className={styles.footRow}>
              <p>3 &amp; 4 BHK Residences</p>
              <a href="#projects" className={styles.explore}>
                Explore
                <img
                  src="/assets/video-container.svg"
                  alt=""
                  width={11}
                  height={11}
                />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
