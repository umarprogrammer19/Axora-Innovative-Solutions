/**
 * Shared shape for the inquiry form state.
 *
 * This lives outside the "use server" module on purpose: a server module may only
 * export async functions, so a plain constant exported from there arrives on the
 * client as undefined.
 */

export type InquiryField = "name" | "email" | "company" | "bottleneck" | "budget";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<InquiryField, string>>;
  /** Echoed back so a failed submit does not wipe what the person typed. */
  values: Partial<Record<InquiryField, string>>;
};

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
};
