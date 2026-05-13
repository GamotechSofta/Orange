const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/**
 * @param {string} accessKey - Web3Forms access key (from Vite env, never hardcode)
 * @param {{ name: string, email: string, phone?: string, message: string, subject?: string }} fields
 */
export async function submitWeb3Form(accessKey, fields) {
  const key = String(accessKey ?? "").trim();
  if (!key) {
    throw new Error(
      "Web3Forms is not configured. Set VITE_WEB3FORMS_KEY_CONTACT, VITE_WEB3FORMS_KEY_APIS, and/or VITE_WEB3FORMS_KEY_GAMES in frontend/.env."
    );
  }

  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: key,
      subject: fields.subject || "Message from Orange website",
      name: fields.name,
      email: fields.email,
      phone: fields.phone || "",
      message: fields.message,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  if (data.success === false) {
    throw new Error(data.message || "Submission failed");
  }

  return data;
}

export function getWeb3ContactKey() {
  return String(import.meta.env.VITE_WEB3FORMS_KEY_CONTACT ?? "").trim();
}

export function getWeb3ApisKey() {
  return String(import.meta.env.VITE_WEB3FORMS_KEY_APIS ?? "").trim();
}

export function getWeb3GamesKey() {
  return String(import.meta.env.VITE_WEB3FORMS_KEY_GAMES ?? "").trim();
}
