import Image from "next/image";
import styles from "./Footer.module.css";

const PAGES_PRIMARY = ["Home", "About Us", "Projects", "Services", "Blog"];
const PAGES_SECONDARY = ["FAQs", "Contact Us", "Privacy Policy"];

const THUMBS = [
  "/assets/footer-thumb-1.png",
  "/assets/footer-thumb-2.png",
  "/assets/footer-thumb-3.png",
  "/assets/footer-thumb-4.png",
];

const SOCIALS = [
  { label: "Instagram", icon: "/assets/social-instagram.svg", width: 14, height: 14 },
  { label: "Pinterest", icon: "/assets/social-pinterest.svg", width: 11.85, height: 14 },
  { label: "Facebook", icon: "/assets/social-facebook.svg", width: 7.78, height: 14 },
  { label: "X", icon: "/assets/social-x-b.svg", width: 13.99, height: 14 },
];

const TICKER = [
  "Residential garden design",
  "Landscape architecture",
  "Shaping land with purpose",
  "Est. 1957",
  "147 Projects Delivered",
  "Native planting",
  "Public landscapes",
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="blog">
      <div className={styles.info}>
        <div className={styles.brand}>
          <Image
            src="/assets/logo-footer.png"
            alt="Century"
            width={81}
            height={47}
            className={styles.logo}
          />
          <p className={styles.blurb}>
            Landscape architecture for clients{" "}
            <br />
            who understand that the outside{" "}
            <br />
            matters as much as the inside.
          </p>
          <div className={styles.thumbs}>
            {THUMBS.map((thumb) => (
              <a key={thumb} href="#projects" className={styles.thumb}>
                <Image src={thumb} alt="" fill sizes="97px" />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.pages}>
            <h3 className={`serif ${styles.columnTitle}`}>Pages</h3>
            <div className={styles.pageLists}>
              <ul>
                {PAGES_PRIMARY.map((page, i) => (
                  <li key={page}>
                    <a href="#top" data-current={i === 0}>
                      {page}
                    </a>
                  </li>
                ))}
              </ul>
              <ul>
                {PAGES_SECONDARY.map((page) => (
                  <li key={page}>
                    <a href="#contact">{page}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.contact}>
            <h3 className={`serif ${styles.columnTitle}`}>Contact info</h3>
            <ul>
              <li>
                <a href="mailto:hello@century.com">hello@century.com</a>
              </li>
              <li>
                <a href="tel:+919876565432">+91 9876 565432</a>
              </li>
              <li>
                125 Greenway Avenue{" "}
                <br />
                Indiranagar, Bangalore
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Century. All rights reserved.</p>
        <ul className={styles.socials}>
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href="#top" aria-label={social.label}>
                <img
                  src={social.icon}
                  alt=""
                  style={{ width: social.width, height: social.height }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.tickerBlock}>
        <div className={styles.tickerBg} aria-hidden="true">
          <Image
            src="/assets/footer-image.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.tickerPhoto}
          />
          <div className={styles.tickerFade} />
        </div>

        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            {[0, 1].map((copy) => (
              <div key={copy} className={styles.tickerRun}>
                {TICKER.map((item) => (
                  <span key={item} className={styles.tickerItem}>
                    <span className={`serif ${styles.tickerText}`}>{item}</span>
                    <img
                      src="/assets/ticker-star.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
