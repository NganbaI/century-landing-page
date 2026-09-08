"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { submitAICallback } from "@/services/aiCallback";
import styles from "./Inquiry.module.css";

export default function Inquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({
        type: "error",
        message: "Please fill out required fields (Name and Phone).",
      });
      return;
    }

    setLoading(true);

    const result = await submitAICallback({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      your_email: formData.email.trim(),
      query: formData.message.trim(),
    });

    setLoading(false);

    if (result.success) {
      setStatus({
        type: "success",
        message: result.message || "Thank you! We'll call you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus({
        type: "error",
        message: result.message || "Something went wrong. Please try again.",
      });
    }
  };

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

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span className={styles.label}>Name *</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Phone *</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about what you are looking for"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                />
              </label>

              <button
                type="submit"
                className={styles.submit}
                disabled={loading}
              >
                {loading ? "Scheduling Call..." : "Submit"}
              </button>

              {status.type && (
                <div
                  className={`${styles.statusMessage} ${
                    status.type === "success"
                      ? styles.statusSuccess
                      : styles.statusError
                  }`}
                  role="alert"
                >
                  {status.message}
                </div>
              )}
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
