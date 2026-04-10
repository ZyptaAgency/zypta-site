import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
  type CountryCode,
} from 'libphonenumber-js';

export type PhoneCountryRow = {
  iso: CountryCode;
  name: string;
  flag: string;
  dial: string;
};

const DEFAULT_ISO: CountryCode = 'BE';
const MAX_NATIONAL_DIGITS = 15;

/** Drapeau Unicode à partir du code ISO 3166-1 alpha-2 */
export function isoToFlag(iso: string): string {
  const u = iso.toUpperCase();
  if (u.length !== 2) return '🏳️';
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (u.charCodeAt(0) - 65), A + (u.charCodeAt(1) - 65));
}

function intlLocaleForSite(locale: string): string {
  if (locale === 'fr') return 'fr-BE';
  return 'en-GB';
}

/** Tous les pays supportés par libphonenumber, noms selon la langue du site, triés A→Z */
export function buildPhoneCountries(locale: string): PhoneCountryRow[] {
  const tag = intlLocaleForSite(locale);
  let display: Intl.DisplayNames;
  try {
    display = new Intl.DisplayNames([tag], { type: 'region' });
  } catch {
    display = new Intl.DisplayNames(['en-GB'], { type: 'region' });
  }

  return getCountries()
    .map((iso) => {
      try {
        const dial = `+${getCountryCallingCode(iso)}`;
        return {
          iso,
          name: display.of(iso) ?? iso,
          dial,
          flag: isoToFlag(iso),
        } satisfies PhoneCountryRow;
      } catch {
        return null;
      }
    })
    .filter((x): x is PhoneCountryRow => x !== null)
    .sort((a, b) => a.name.localeCompare(b.name, tag, { sensitivity: 'base' }));
}

export function getRowByIso(rows: PhoneCountryRow[], iso: string): PhoneCountryRow | undefined {
  return rows.find((r) => r.iso === iso);
}

/** Décompose une valeur E.164 (+32…) en pays + numéro national (chiffres) */
export function splitPhoneValue(value: string, rows: PhoneCountryRow[]): { iso: CountryCode; national: string } {
  const v = (value || '').trim();
  if (!v) {
    return { iso: DEFAULT_ISO, national: '' };
  }

  const tryParse = (s: string) => {
    try {
      const pn = parsePhoneNumber(s);
      if (pn?.country) {
        return { iso: pn.country, national: pn.nationalNumber };
      }
    } catch {
      /* numéro partiel ou invalide */
    }
    return null;
  };

  const withPlus = v.startsWith('+') ? v : `+${v.replace(/\D/g, '')}`;
  const parsed = tryParse(withPlus);
  if (parsed) return parsed;

  const sorted = [...rows].sort((a, b) => b.dial.length - a.dial.length);
  for (const r of sorted) {
    if (v.startsWith(r.dial)) {
      return {
        iso: r.iso,
        national: v.slice(r.dial.length).replace(/\D/g, '').slice(0, MAX_NATIONAL_DIGITS),
      };
    }
  }

  const digitsOnly = v.replace(/\D/g, '');
  for (const r of sorted) {
    const cc = r.dial.slice(1);
    if (digitsOnly.startsWith(cc)) {
      return {
        iso: r.iso,
        national: digitsOnly.slice(cc.length).slice(0, MAX_NATIONAL_DIGITS),
      };
    }
  }

  return {
    iso: DEFAULT_ISO,
    national: digitsOnly.slice(0, MAX_NATIONAL_DIGITS),
  };
}

export function validatePhoneFull(value: string): boolean {
  const v = (value || '').trim();
  if (!v) return false;
  const normalized = v.startsWith('+') ? v : `+${v.replace(/\D/g, '')}`;
  return isValidPhoneNumber(normalized);
}

export const MAX_PHONE_NATIONAL_DIGITS = MAX_NATIONAL_DIGITS;
