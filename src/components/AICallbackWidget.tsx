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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-callback-widget", handleOpen);
    return () => {
      window.removeEventListener("open-ai-callback-widget", handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your Name and Phone number.",
      });
      return;
    }

    setLoading(true);

    const result = await submitAICallback({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
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
                  placeholder="e.g. Jane Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="widget-phone">Phone Number *</label>
                <input
                  id="widget-phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="widget-email">Email Address (Optional)</label>
                <input
                  id="widget-email"
                  type="email"
                  placeholder="e.g. jane@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="widget-query">Message / Property Preference (Optional)</label>
                <textarea
                  id="widget-query"
                  placeholder="e.g. Interested in 3 BHK in Hebbal..."
                  value={formData.query}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, query: e.target.value }))
                  }
                />
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
