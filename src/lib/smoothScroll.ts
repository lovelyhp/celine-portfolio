import Lenis from 'lenis';

/** 헤더(3.75rem) 아래로 섹션 상단이 오도록 하는 앵커 오프셋 */
const ANCHOR_OFFSET = -64;

let lenis: Lenis | null = null;

/**
 * 관성 스무스 스크롤 초기화. cleanup 함수를 반환한다.
 * prefers-reduced-motion 사용자와 matchMedia가 없는 환경(jsdom)에서는
 * 네이티브 스크롤을 그대로 둔다.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
  });

  let rafId = 0;
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
  };
}

/** 앵커·최상단 이동. lenis가 없으면 네이티브로 폴백. */
export function scrollToTarget(
  target: string | number,
  opts: { immediate?: boolean } = {}
) {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : ANCHOR_OFFSET,
      immediate: opts.immediate,
    });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' });
  } else {
    document.querySelector(target)?.scrollIntoView({
      behavior: opts.immediate ? 'auto' : 'smooth',
      block: 'start',
    });
  }
}
