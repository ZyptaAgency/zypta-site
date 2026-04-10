'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import {
  buildPhoneCountries,
  splitPhoneValue,
  getRowByIso,
  MAX_PHONE_NATIONAL_DIGITS,
  type PhoneCountryRow,
} from '@/lib/phone-countries';
import type { CountryCode } from 'libphonenumber-js';

const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='rgba(240,238,255,0.45)' stroke-width='2'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`;

const fieldBase =
  'w-full border rounded-xl text-text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent-primary/50 focus:shadow-[0_0_20px_rgba(200,75,255,0.15)] transition-all duration-300 disabled:opacity-50';

type PhoneFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
  hasError?: boolean;
};

export default function PhoneField({ id, value, onChange, onBlur, disabled, hasError }: PhoneFieldProps) {
  const locale = useLocale();
  const t = useTranslations('contact');

  const rows = useMemo(() => buildPhoneCountries(locale), [locale]);
  const { iso, national } = useMemo(() => splitPhoneValue(value, rows), [value, rows]);

  const row = getRowByIso(rows, iso) ?? rows[0];

  const applyCountry = (newIso: CountryCode) => {
    const r = getRowByIso(rows, newIso);
    if (!r) return;
    onChange(`${r.dial}${national}`);
  };

  const applyNational = (raw: string) => {
    const r = row;
    if (!r) return;
    const digits = raw.replace(/\D/g, '').slice(0, MAX_PHONE_NATIONAL_DIGITS);
    onChange(`${r.dial}${digits}`);
  };

  const borderErr = hasError ? 'border-nova-outer/70' : 'border-white/10';

  return (
    <div className="space-y-1.5">
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          id={id ? `${id}-country` : undefined}
          className={`${fieldBase} form-select-dark shrink-0 sm:w-[min(46%,15rem)] w-full cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.65rem_center] bg-no-repeat pl-3 pr-9 py-3.5 ${borderErr}`}
          style={{
            backgroundColor: '#120a1c',
            backgroundImage: SELECT_ARROW,
          }}
          value={iso}
          onChange={(e) => applyCountry(e.target.value as CountryCode)}
          onBlur={onBlur}
          disabled={disabled}
          aria-label={t('phoneCountryLabel')}
        >
          {rows.map((c: PhoneCountryRow) => (
            <option key={c.iso} value={c.iso}>
              {c.flag} {c.dial} - {c.name}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder={t('phoneNationalPlaceholder')}
          className={`${fieldBase} flex-1 min-w-0 bg-white/[0.03] px-4 py-3.5 ${borderErr}`}
          value={national}
          onChange={(e) => applyNational(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={MAX_PHONE_NATIONAL_DIGITS}
          aria-invalid={hasError || undefined}
        />
      </div>
      <p className="text-xs text-text-muted/90 leading-snug">{t('phoneIntlHint')}</p>
    </div>
  );
}
