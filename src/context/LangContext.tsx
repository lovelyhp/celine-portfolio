import { createContext, useContext, useState, ReactNode } from 'react';
import { ko } from '../content/ko';
import { en } from '../content/en';

type Lang = 'ko' | 'en';
type Content = typeof ko;

interface LangContextValue {
  lang: Lang;
  t: Content;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');
  const t = lang === 'ko' ? ko : (en as unknown as Content);
  const toggle = () => setLang((l) => (l === 'ko' ? 'en' : 'ko'));
  return <LangContext.Provider value={{ lang, t, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
