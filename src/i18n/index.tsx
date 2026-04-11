import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ru, { type Dict } from './ru';
import en from './en';

export type Lang = 'ru' | 'en';

const DICTS: Record<Lang, Dict> = { ru, en };

function detectLang(): Lang {
  const stored = localStorage.getItem('crydera:lang') as Lang | null;
  if (stored === 'ru' || stored === 'en') return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  return nav.startsWith('ru') ? 'ru' : 'en';
}

interface I18nCtx {
  lang: Lang;
  t: (key: keyof Dict, vars?: Record<string, string>) => string;
  setLang: (lang: Lang) => void;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectLang());

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('crydera:lang', lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const t = useCallback(
    (key: keyof Dict, vars?: Record<string, string>) => {
      const raw = DICTS[lang][key] ?? String(key);
      if (!vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? `{${v}}`);
    },
    [lang],
  );

  const value = useMemo<I18nCtx>(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
