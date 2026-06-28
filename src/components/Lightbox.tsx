import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import './Lightbox.css';

type OpenFn = (src: string, caption?: string) => void;

const LightboxCtx = createContext<OpenFn>(() => {});
export const useLightbox = () => useContext(LightboxCtx);

interface LightboxState {
  src: string;
  caption?: string;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);
  const open = useCallback<OpenFn>((src, caption) => setState({ src, caption }), []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [state, close]);

  return (
    <LightboxCtx.Provider value={open}>
      {children}
      {state && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox-close" aria-label="닫기" onClick={close}>×</button>
          <figure className="lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <img src={`/images/${state.src}`} alt={state.caption ?? ''} />
            {state.caption && <figcaption>{state.caption}</figcaption>}
          </figure>
        </div>
      )}
    </LightboxCtx.Provider>
  );
}
