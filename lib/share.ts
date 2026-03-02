import type { ShareableData } from "@/types";
import { shareableDataSchema } from "@/lib/schemas";

export function encodeShareData(data: ShareableData): string {
  return btoa(JSON.stringify(data));
}

export function decodeShareData(encoded: string): ShareableData | null {
  try {
    const decoded = JSON.parse(atob(encoded));
    const result = shareableDataSchema.safeParse(decoded);
    if (result.success) return result.data as ShareableData;
    return null;
  } catch {
    return null;
  }
}
