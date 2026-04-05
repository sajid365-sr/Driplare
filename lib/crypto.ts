import crypto from "crypto";

const KEY_ENV = "CLIENT_API_KEY_SECRET";

function getKey(): Buffer {
  const raw = process.env[KEY_ENV];
  if (!raw) {
    throw new Error(`${KEY_ENV} is not set`);
  }
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error(`${KEY_ENV} must be 32 bytes base64`);
  }
  return key;
}

export function encryptSecret(value: string) {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptSecret(payload: { ciphertext: string; iv: string; tag: string }) {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

export function maskKey(key: string) {
  if (key.length <= 4) return key;
  return `${"*".repeat(Math.max(0, key.length - 4))}${key.slice(-4)}`;
}
