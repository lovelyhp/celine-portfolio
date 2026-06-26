import '@testing-library/jest-dom/vitest';

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// jsdom에는 IntersectionObserver가 없어 CaseStudy 렌더 시 필요
(globalThis as any).IntersectionObserver = IO;
