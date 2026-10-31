export const AUTH_NOT_LIVE_MESSAGE =
  "Accounts are not live yet. This form is a preview, so nothing was submitted.";

/**
 * MOCK. [EDIT] Replace with real authentication (your provider or backend).
 * It deliberately never reports success, so the UI cannot pretend someone is signed in.
 */
export async function submitAuthForm(): Promise<{ ok: false; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: false, message: AUTH_NOT_LIVE_MESSAGE };
}