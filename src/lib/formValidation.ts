import type { KeyboardEvent } from "react";

export const PHONE_MAX_DIGITS = 10;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 100;
export const MESSAGE_MAX_LENGTH = 500;

/**
 * Letters, numbers, whitespace and everyday punctuation only. Blocks
 * code-ish characters such as < > { } [ ] | \ ` ^ ~ * = $
 */
const DISALLOWED_MESSAGE_CHARS = /[^a-zA-Z0-9\s,.'"()\-_/&@:;!?+#%]/g;

const NAME_PATTERN = /^[a-zA-Z][a-zA-Z\s.'-]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

/** Keys that must keep working inside a digits-only phone input. */
const PHONE_ALLOWED_KEYS = [
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

export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

/** Strips everything that is not a digit and caps the length at 10. */
export function sanitizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
}

/** Strips disallowed characters and caps the length. */
export function sanitizeMessage(
  value: string,
  maxLength: number = MESSAGE_MAX_LENGTH
): string {
  return value.replace(DISALLOWED_MESSAGE_CHARS, "").slice(0, maxLength);
}

/**
 * Blocks non-digit keystrokes while leaving navigation, editing and
 * clipboard shortcuts intact.
 */
export function blockNonDigitKeys(event: KeyboardEvent<HTMLInputElement>) {
  if (
    PHONE_ALLOWED_KEYS.includes(event.key) ||
    event.ctrlKey ||
    event.metaKey
  ) {
    return;
  }
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
}

export function validateContactForm(
  values: ContactFormValues
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Name can only contain letters, spaces, . ' and -";
  }

  if (!values.phone) {
    errors.phone = "Please enter your phone number.";
  } else if (values.phone.length !== PHONE_MAX_DIGITS) {
    errors.phone = "Phone number must be 10 digits.";
  } else if (!INDIAN_MOBILE_PATTERN.test(values.phone)) {
    errors.phone = "Please enter a valid Indian mobile number.";
  }

  const email = values.email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}
