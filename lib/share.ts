import type { ShareableData } from "@/types";
import { shareableDataSchema } from "@/lib/schemas";

export function encodeShareData(data: ShareableData): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function decodeShareData(encoded: string): ShareableData | null {
  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const decoded = JSON.parse(json);
    const result = shareableDataSchema.safeParse(decoded);
    if (result.success) return result.data as ShareableData;
    return null;
  } catch {
    return null;
  }
}
