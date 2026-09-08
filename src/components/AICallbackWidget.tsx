"use client";

import { useState, useEffect, FormEvent } from "react";
import { submitAICallback } from "@/services/aiCallback";
import styles from "./AICallbackWidget.module.css";

export function triggerAICallbackWidget() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-ai-callback-widget"));
  }
}

export default function AICallbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validate = (data: typeof formData) => {
    const nextErrors: { name?: string; phone?: string; email?: string } = {};

    const name = data.name.trim();
    if (!name) {
      nextErrors.name = "Please enter your full name.";
    } else if (name.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z][a-zA-Z\s.'-]*$/.test(name)) {
      nextErrors.name = "Name can only contain letters, spaces, . ' and -";
    }

    if (!data.phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (data.phone.length !== 10) {
      nextErrors.phone = "Phone number must be 10 digits.";
    } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
      nextErrors.phone = "Please enter a valid Indian mobile number.";
    }

    const email = data.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    return nextErrors;
  };

  // Letters, numbers, whitespace and everyday punctuation only.
  // Blocks code-ish characters such as < > { } [ ] | \ ` ^ ~ * = $
  const DISALLOWED_MESSAGE_CHARS = /[^a-zA-Z0-9\s,.'"()\-_/&@:;!?+#%]/g;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-callback-widget", handleOpen);
    return () => {
      window.removeEventListener("open-ai-callback-widget", handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
    setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    const result = await submitAICallback({
      name: formData.name.trim(),
      phone: `+91${formData.phone}`,
      your_email: formData.email.trim(),
      query: formData.query.trim(),
    });

    setLoading(false);

    if (result.success) {
      setStatus({
        type: "success",
        message: result.message || "Thank you! We'll call you shortly.",
      });
      setFormData({ name: "", phone: "", email: "", query: "" });
      setErrors({});
    } else {
      setStatus({
        type: "error",
        message: result.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Request AI Instant Callback"
      >
        <span className={styles.pulseIcon} aria-hidden="true">
          <span className={styles.pulseRing} />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <span>Get a Call Back</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="widget-modal-title"
        >
          <div className={styles.modalCard}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.header}>
              <span className={styles.badge}>AI Voice Assistant</span>
              <h3 id="widget-modal-title" className={styles.title}>
                Request Instant Callback
              </h3>
              <p className={styles.subtitle}>
                Enter your details to receive an immediate AI phone call to discuss your property needs.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="widget-name">Full Name *</label>
                <input
                  id="widget-name"
                  type="text"
                  required
                  maxLength={50}
                  placeholder="e.g. Jane Smith"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "widget-name-error" : undefined}
                  className={errors.name ? styles.inputError : undefined}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                />
                {errors.name && (
                  <span id="widget-name-error" className={styles.fieldError}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="widget-phone">Phone Number *</label>
                <div
                  className={`${styles.phoneWrapper} ${errors.phone ? styles.inputError : ""}`}
                >
                  <span className={styles.phonePrefix} aria-hidden="true">
                    +91
                  </span>
                  <input
                    id="widget-phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "widget-phone-error" : undefined
                    }
                    value={formData.phone}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "Delete",
                        "Tab",
                        "Enter",
                        "Escape",
                        "Home",
                        "End",
                        "ArrowLeft",
                        "ArrowRight",
                        "ArrowUp",
                        "ArrowDown",
                      ];
                      if (
                        allowedKeys.includes(e.key) ||
                        e.ctrlKey ||
                        e.metaKey
                      ) {
                        return;
                      }
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const digits = e.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      if (!digits) return;
                      setFormData((prev) => ({ ...prev, phone: digits }));
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setFormData((prev) => ({ ...prev, phone: digits }));
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                  />
                </div>
                {errors.phone && (
                  <span id="widget-phone-error" className={styles.fieldError}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="widget-email">Email Address (Optional)</label>
                <input
                  id="widget-email"
                  type="email"
                  maxLength={100}
                  placeholder="e.g. jane@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "widget-email-error" : undefined
                  }
                  className={errors.email ? styles.inputError : undefined}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {errors.email && (
                  <span id="widget-email-error" className={styles.fieldError}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="widget-query">Message / Property Preference (Optional)</label>
                <textarea
                  id="widget-query"
                  maxLength={500}
                  placeholder="e.g. Interested in 3 BHK in Hebbal..."
                  value={formData.query}
                  onChange={(e) => {
                    const cleaned = e.target.value
                      .replace(DISALLOWED_MESSAGE_CHARS, "")
                      .slice(0, 500);
                    setFormData((prev) => ({ ...prev, query: cleaned }));
                  }}
                />
                <span className={styles.fieldHint}>
                  {formData.query.length}/500 &middot; letters, numbers and
                  basic punctuation only
                </span>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? "Scheduling Callback..." : "Call Me Now"}
              </button>

              {status.type && (
                <div
                  className={`${styles.statusMessage} ${status.type === "success"
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
      )}
    </>
  );
}
