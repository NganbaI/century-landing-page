"use client";

import Image from "next/image";
import { useState } from "react";
import { LISTINGS } from "@/data/listings";
import styles from "./Projects.module.css";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export default function Projects() {
  const [active, setActive] = useState<FilterId>("all");

  const listings =
    active === "all"
      ? LISTINGS
      : LISTINGS.filter((listing) => listing.category === active);

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Properties</p>
          <h2 className={styles.title}>Our Projects</h2>

          <div className={styles.filters} role="tablist" aria-label="Property type">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active === filter.id}
                className={styles.filter}
                data-active={active === filter.id}
                onClick={() => setActive(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </header>

        <div className={styles.grid}>
          {listings.map((listing) => (
            <a key={listing.id} href="#contact" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={listing.image}
                  alt={listing.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.thumbImage}
                />
                <span className={styles.tag}>{listing.tag}</span>
              </div>

              <div className={styles.body}>
                <p className={styles.name}>{listing.name}</p>
                <p className={styles.location}>
                  <img src="/assets/icon-pin.svg" alt="" width={14} height={17} />
                  {listing.location}
                </p>
                <span className={styles.rule} aria-hidden="true" />
                <p className={styles.detail}>
                  <img src="/assets/icon-bed.svg" alt="" width={20} height={14} />
                  {listing.detail}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.more}>
          <a href="#contact" className="btn btn--primary">
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
}
