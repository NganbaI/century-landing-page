import Image from "next/image";
import styles from "./Inquiry.module.css";

export default function Inquiry() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src="/assets/contact-bg.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.backdropImage}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Contact us</p>
          <h2 className={`serif ${styles.title}`}>Property inquiry</h2>
        </header>

        <div className={styles.layout}>
          {/* Figma node 5:2726 — white card whose left cut-out reveals the
              photograph behind it. */}
          <img
            src="/assets/map-image.svg"
            alt=""
            className={styles.plate}
            aria-hidden="true"
          />

          <p className={styles.panelText}>
            <span>Discover</span>
            <span className="serif-italic">your ideal</span>
            <span>place</span>
          </p>

          <div className={styles.fields}>
            <p className={styles.intro}>
              Tell us what you’re looking for, and we’ll guide you to the best
              options
            </p>

            <form className={styles.form}>
              <label className={styles.field}>
                <span className={styles.label}>Name</span>
                <input type="text" name="name" placeholder="Jane Smith" />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input type="email" name="email" placeholder="jane@email.com" />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Phone</span>
                <input type="tel" name="phone" placeholder="+91 9876 564532" />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Message</span>
                <textarea name="message" rows={4} placeholder="Tell us about" />
              </label>

              <button type="submit" className={styles.submit}>
                Submit
              </button>
            </form>
          </div>
        </div>

        <p className={styles.closing}>
          <span>Let’s find</span>{" "}
          <em className="serif-italic">your perfect</em> <span>home</span>
        </p>
      </div>
    </section>
  );
}
