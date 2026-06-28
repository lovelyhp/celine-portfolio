import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { HeroChapter } from './Hero';

describe('HeroChapter', () => {
  it('accents the last line of the slogan', () => {
    const { container } = render(
      <LangProvider>
        <HeroChapter />
      </LangProvider>
    );
    const accent = container.querySelector('.hero-headline-accent');
    expect(accent).not.toBeNull();
    expect(accent?.textContent).toBe('도구를 만듭니다.');
  });

  it('renders four stat values including the ECTS metric', () => {
    const { container } = render(
      <LangProvider>
        <HeroChapter />
      </LangProvider>
    );
    const values = Array.from(container.querySelectorAll('.hero-stat-value')).map(
      (v) => v.textContent
    );
    expect(values.length).toBe(4);
    expect(values).toContain('-83%');
  });
});
