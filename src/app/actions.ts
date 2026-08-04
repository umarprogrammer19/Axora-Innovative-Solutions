"use server";

import type { InquiryField, InquiryState } from "@/lib/inquiry";

/**
 * Inquiry handling.
 *
 * Validation runs on the server so the form still works with JavaScript disabled.
 * The delivery step is the one thing left to wire up: drop your CRM call, email
 * provider, or database insert where the TODO sits below. Everything around it
 * (validation, error reporting, success state, honeypot) is finished.
 *
 * Only async functions may be exported from this file. Shared types and the
 * initial state live in src/lib/inquiry.ts.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot. Real people leave this hidden field empty.
  if (read(formData, "referrer_url")) {
    return {
      status: "success",
      message: "Thanks, we have it.",
      fieldErrors: {},
      values: {},
    };
  }

  const values: Record<InquiryField, string> = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    company: read(formData, "company"),
    bottleneck: read(formData, "bottleneck"),
    budget: read(formData, "budget"),
  };

  const fieldErrors: Partial<Record<InquiryField, string>> = {};

  if (values.name.length < 2) {
    fieldErrors.name = "Please tell us who you are.";
  }
  if (!EMAIL.test(values.email)) {
    fieldErrors.email = "That email address does not look complete.";
  }
  if (values.company.length < 2) {
    fieldErrors.company = "Which company are you writing from?";
  }
  if (values.bottleneck.length < 20) {
    fieldErrors.bottleneck =
      "A sentence or two about the process helps us reply usefully.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      // The summary sits beside the submit button, under the fields, so it cannot
      // say "below".
      message: "Almost there. Check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  // TODO: deliver the lead. Replace this with your CRM, email, or database call.
  // Keep it inside this function so validation stays server side.
  try {
    // await sendToCrm(values)
    return {
      status: "success",
      message: "Thanks. We will reply within one working day.",
      fieldErrors: {},
      values: {},
    };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong on our side. Please email us directly and we will pick it up.",
      fieldErrors: {},
      values,
    };
  }
}
