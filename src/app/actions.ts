"use server";

import type { InquiryField, InquiryState } from "@/lib/inquiry";

/**
 * Inquiry handling.
 *
 * Validation runs on the server so the form still works with JavaScript disabled.
 * Delivery goes to a Google Sheet ("Axora Website Inquiries") via an Apps
 * Script Web App bound to that sheet (doPost appends a row). The deployment
 * URL lives in GOOGLE_SHEETS_WEBHOOK_URL (.env.local, not committed) rather
 * than hardcoded here, since it is effectively a write credential: anyone
 * with the URL can append rows.
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

  // Optional: the "I'm interested in" chip picker (only rendered on /our-work)
  // and the phone number on the /our-work sidebar's quick form. Neither is
  // validated, since both forms work fine without them.
  const interests = formData
    .getAll("interests")
    .filter((v): v is string => typeof v === "string")
    .join(", ");
  const phone = read(formData, "phone");

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

  try {
    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhook) {
      // Apps Script always answers with a redirect to the actual response,
      // and it and its target only need to be reachable, not read.
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, interests, phone }),
      });
    }

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
