import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { AboutChapter } from './About';

const renderAbout = () =>
  render(
    <LangProvider>
      <AboutChapter />
    </LangProvider>
  );

describe('AboutChapter', () => {
  it('renders the four snapshot rows with English labels', () => {
    const { container } = renderAbout();
    const rows = container.querySelectorAll('.about-snap-row');
    expect(rows.length).toBe(4);
    const keys = Array.from(container.querySelectorAll('.about-snap-k')).map((k) => k.textContent);
    expect(keys).toEqual(['Now', 'Study', 'Build', 'Proof']);
  });

  it('renders How I Work as one flow line covering all six steps', () => {
    const { container } = renderAbout();
    const flow = container.querySelector('.about-flow');
    expect(flow).not.toBeNull();
    expect(flow?.textContent).toContain('문제 정의');
    expect(flow?.textContent).toContain('배포·운영');
  });

  it('links to the CV pdf', () => {
    const { container } = renderAbout();
    const link = container.querySelector('a.about-cv-link');
    expect(link?.getAttribute('href')).toBe('/CV_SeoAh_Choi_EN.pdf');
  });

  it('renders the Macron operations highlight', () => {
    const { container } = renderAbout();
    const hl = container.querySelector('.about-highlight');
    expect(hl).not.toBeNull();
    expect(hl?.textContent).toContain('마크롱');
  });

  it('renders career as collapsible details with role and education entries', () => {
    const { container } = renderAbout();
    const details = container.querySelectorAll('.about-career details');
    expect(details.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the three skill groups', () => {
    const { container } = renderAbout();
    expect(container.querySelectorAll('.about-skill-group').length).toBe(3);
  });
});
