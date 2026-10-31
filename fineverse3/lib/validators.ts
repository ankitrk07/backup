import { z } from "zod";
import { INDIAN_STATES } from "@/lib/india";
import { PAYMENT_METHOD_IDS, SHIPPING_METHOD_IDS } from "@/types/order";

/*
 * Schemas deliberately avoid .transform()/.default() so that the input and
 * output types are identical, which keeps react-hook-form typing simple.
 */

const PHONE_REGEX = /^[6-9]\d{9}$/;
const PINCODE_REGEX = /^[1-9]\d{5}$/;
const PHONE_MESSAGE = "Enter a valid 10-digit mobile number";

const emailField = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .email("Enter a valid email address");

const phoneField = z.string().trim().regex(PHONE_REGEX, PHONE_MESSAGE);

const optionalPhoneField = z
  .string()
  .trim()
  .refine((value) => value === "" || PHONE_REGEX.test(value), PHONE_MESSAGE);

const pincodeField = z.string().trim().regex(PINCODE_REGEX, "Enter a valid 6-digit PIN code");

/* ───────────── newsletter / whitelist ───────────── */

export const newsletterSchema = z.object({
  email: emailField,
  /** honeypot: real users never fill this, bots do */
  website: z.string().max(0),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;

/* ───────────── contact ───────────── */

export const CONTACT_TOPICS = [
  { value: "order", label: "My order" },
  { value: "product", label: "Product question" },
  { value: "collab", label: "Collab / business" },
  { value: "other", label: "Something else" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  email: emailField,
  phone: optionalPhoneField,
  topic: z.enum(["order", "product", "collab", "other"], { message: "Choose a topic" }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(1000, "Message is too long (max 1000 characters)"),
  website: z.string().max(0),
});
export type ContactValues = z.infer<typeof contactSchema>;

/* ───────────── track order ───────────── */

export const trackOrderSchema = z.object({
  orderId: z.string().trim().min(4, "Enter your order number"),
  contact: z
    .string()
    .trim()
    .min(1, "Enter the email or mobile number used for the order")
    .refine(
      (value) => z.string().email().safeParse(value).success || PHONE_REGEX.test(value),
      "Enter a valid email address or 10-digit mobile number",
    ),
});
export type TrackOrderValues = z.infer<typeof trackOrderSchema>;

/* ───────────── pincode checker ───────────── */

export const pincodeSchema = z.object({ pincode: pincodeField });
export type PincodeValues = z.infer<typeof pincodeSchema>;

/* ───────────── checkout ───────────── */

export const checkoutSchema = z.object({
  email: emailField,
  phone: phoneField,
  fullName: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  addressLine1: z.string().trim().min(5, "Enter your house / flat / street").max(120),
  addressLine2: z.string().trim().max(120),
  landmark: z.string().trim().max(80),
  city: z.string().trim().min(2, "Enter your city").max(60),
  state: z
    .string()
    .min(1, "Select your state")
    .refine((value) => (INDIAN_STATES as readonly string[]).includes(value), "Select a valid state"),
  pincode: pincodeField,
  shippingMethod: z.enum(SHIPPING_METHOD_IDS, { message: "Choose a delivery method" }),
  paymentMethod: z.enum(PAYMENT_METHOD_IDS, { message: "Choose a payment method" }),
  acceptTerms: z.boolean().refine((value) => value === true, "Please accept the terms to continue"),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

/* ───────────── account ───────────── */

export const signInSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Enter your password"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
    email: emailField,
    password: z.string().min(8, "Use at least 8 characters").max(72, "Password is too long"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignUpValues = z.infer<typeof signUpSchema>;