'use client';

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import {
  buildPhoneCountries,
  splitPhoneValue,
  getRowByIso,
  MAX_PHONE_NATIONAL_DIGITS,
  flagImageUrl,
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

function CountryFlagImg({ iso, size = 20 }: { iso: string; size?: 20 | 40 }) {
  const [failed, setFailed] = useState(false);
  const w = size;
  const h = size === 40 ? 30 : 15;
  if (failed) {
    return (
      <span className="inline-flex h-[15px] min-w-[1.25rem] items-center justify-center rounded text-[9px] font-mono text-text-muted/80">
        {iso}
      </span>
    );
  }
  return (
    <img
      src={flagImageUrl(iso, size)}
      alt=""
      width={w}
      height={h}
      className="inline-block rounded-sm object-cover shadow-sm shrink-0"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function PhoneField({ id, value, onChange, onBlur, disabled, hasError }: PhoneFieldProps) {
  const locale = useLocale();
  const t = useTranslations('contact');

  const rows = useMemo(() => buildPhoneCountries(locale), [locale]);
  const { iso, national } = useMemo(() => splitPhoneValue(value, rows), [value, rows]);

  const row = getRowByIso(rows, iso) ?? rows[0];

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const applyCountry = useCallback(
    (newIso: CountryCode) => {
      const r = getRowByIso(rows, newIso);
      if (!r) return;
      onChange(`${r.dial}${national}`);
      setOpen(false);
    },
    [rows, national, onChange],
  );

  const applyNational = (raw: string) => {
    const r = row;
    if (!r) return;
    const digits = raw.replace(/\D/g, '').slice(0, MAX_PHONE_NATIONAL_DIGITS);
    onChange(`${r.dial}${digits}`);
  };

  const borderErr = hasError ? 'border-nova-outer/70' : 'border-white/10';

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="space-y-1.5">
      <div className="flex flex-col sm:flex-row gap-2">
        <div ref={wrapRef} className="relative shrink-0 sm:w-[min(46%,15rem)] w-full">
          <button
            type="button"
            id={id ? `${id}-country` : undefined}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={t('phoneCountryLabel')}
            onBlur={onBlur}
            onClick={() => !disabled && setOpen((o) => !o)}
            className={`${fieldBase} flex w-full cursor-pointer items-center gap-2 px-3 py-3.5 text-left ${borderErr}`}
            style={{
              backgroundColor: '#120a1c',
              backgroundImage: SELECT_ARROW,
              backgroundSize: '1rem',
              backgroundPosition: 'right 0.65rem center',
              backgroundRepeat: 'no-repeat',
              paddingRight: '2.25rem',
            }}
          >
            <CountryFlagImg iso={row.iso} />
            <span className="min-w-0 flex-1 truncate text-sm">
              {row.dial} — {row.name}
            </span>
          </button>

          {open && (
            <ul
              role="listbox"
              aria-label={t('phoneCountryLabel')}
              className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-[#120a1c] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            >
              {rows.map((c: PhoneCountryRow) => (
                <li key={c.iso} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.iso === iso}
                    className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5 ${
                      c.iso === iso ? 'bg-accent-primary/10 text-text-white' : 'text-text-muted'
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => applyCountry(c.iso)}
                  >
                    <CountryFlagImg iso={c.iso} />
                    <span className="min-w-0 flex-1 truncate">
                      {c.dial} — {c.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
