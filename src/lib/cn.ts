type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Small on purpose — no merge semantics needed. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
