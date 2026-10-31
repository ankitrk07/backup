import type { ContactValues } from "@/lib/validators";

/**
 * MOCK. Nothing is sent anywhere.
 * [EDIT] Replace with a real call (email service, helpdesk or a server action).
 * Keep the signature and the form will not need to change.
 */
export async function sendContactMessage(_values: ContactValues): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
}