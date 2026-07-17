import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

/** 과거 '자동 저장'된 값과 충돌하지 않도록 키를 올림 — 명시적 토글만 저장된다 */
const STORAGE_KEY = 'theme-v2';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function initialTheme(): Theme {
  // 기본은 항상 라이트. index.html 인라인 스크립트가 스탬프한 값(저장된 명시적 선택)만 이어받는다.
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark') {
    return 'dark';
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () =>
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage 접근 불가 환경에서는 세션 내 상태만 유지 */
      }
      return next;
    });

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
