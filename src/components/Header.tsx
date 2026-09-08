"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="#top" className={styles.logo} aria-label="Century — home">
          <Image
            src="/assets/logo.png"
            alt="Century"
            width={81}
            height={47}
            priority
          />
        </a>

        <nav className={styles.menu} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={`btn btn--light ${styles.cta}`}>
          Book a Visit
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className={styles.burgerBox} data-open={menuOpen} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={styles.panel}
        data-open={menuOpen}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.panelLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className={`btn btn--primary ${styles.panelCta}`}
          onClick={() => setMenuOpen(false)}
        >
          Book a Visit
        </a>
      </div>
    </header>
  );
}
