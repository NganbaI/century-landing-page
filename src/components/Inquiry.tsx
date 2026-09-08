"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { submitAICallback } from "@/services/aiCallback";
import {
  blockNonDigitKeys,
  sanitizeMessage,
  sanitizePhone,
  validateContactForm,
  type ContactFormErrors,
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PHONE_MAX_DIGITS,
} from "@/lib/formValidation";
import styles from "./Inquiry.module.css";

export default function Inquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const nextErrors = validateContactForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    const result = await submitAICallback({
      name: formData.name.trim(),
      phone: `+91${formData.phone}`,
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
      setErrors({});
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
                  maxLength={NAME_MAX_LENGTH}
                  placeholder="Jane Smith"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                  className={errors.name ? styles.inputError : undefined}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                />
                {errors.name && (
                  <span id="inquiry-name-error" className={styles.fieldError}>
                    {errors.name}
                  </span>
                )}
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  type="email"
                  name="email"
                  maxLength={EMAIL_MAX_LENGTH}
                  placeholder="jane@email.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "inquiry-email-error" : undefined
                  }
                  className={errors.email ? styles.inputError : undefined}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {errors.email && (
                  <span id="inquiry-email-error" className={styles.fieldError}>
                    {errors.email}
                  </span>
                )}
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Phone *</span>
                <div
                  className={`${styles.phoneWrapper} ${
                    errors.phone ? styles.inputError : ""
                  }`}
                >
                  <span className={styles.phonePrefix} aria-hidden="true">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={PHONE_MAX_DIGITS}
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "inquiry-phone-error" : undefined
                    }
                    value={formData.phone}
                    onKeyDown={blockNonDigitKeys}
                    onPaste={(e) => {
                      e.preventDefault();
                      const digits = sanitizePhone(
                        e.clipboardData.getData("text")
                      );
                      if (!digits) return;
                      setFormData((prev) => ({ ...prev, phone: digits }));
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    onChange={(e) => {
                      const digits = sanitizePhone(e.target.value);
                      setFormData((prev) => ({ ...prev, phone: digits }));
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                  />
                </div>
                {errors.phone && (
                  <span id="inquiry-phone-error" className={styles.fieldError}>
                    {errors.phone}
                  </span>
                )}
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={MESSAGE_MAX_LENGTH}
                  placeholder="Tell us about what you are looking for"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: sanitizeMessage(e.target.value),
                    }))
                  }
                />
                <span className={styles.fieldHint}>
                  {formData.message.length}/{MESSAGE_MAX_LENGTH} &middot;
                  letters, numbers and basic punctuation only
                </span>
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
