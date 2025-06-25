async function hashValue(value: Uint8Array) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", value);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hash;
}

export async function hashHandler(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hash = hashValue(data);

  return hash;
}

export async function hashRandomValue() {
  const randomValue = crypto.getRandomValues(new Uint8Array(32));
  const hash = hashValue(randomValue);

  return hash;
}
