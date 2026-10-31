/**
 * MOCK. [EDIT] Replace with a real call (your email provider, a server action
 * or an API route). Keep the signature and the UI will not change.
 */
export async function subscribeToNewsletter(_email: string): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
}