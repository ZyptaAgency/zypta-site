export const PRICING_FORMULE_STORAGE_KEY = 'zypta-pricing-formule';

export function readStoredFormule(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = sessionStorage.getItem(PRICING_FORMULE_STORAGE_KEY);
    if (!v) return null;
    const id = v.trim().toLowerCase();
    return /^[a-z0-9_-]+$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function writeStoredFormule(id: string | null | undefined) {
  if (typeof window === 'undefined') return;
  try {
    if (id) sessionStorage.setItem(PRICING_FORMULE_STORAGE_KEY, id.toLowerCase());
    else sessionStorage.removeItem(PRICING_FORMULE_STORAGE_KEY);
  } catch {
    /* private mode / quota */
  }
}
