import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LangProvider } from '../context/LangContext';
import { WorkChapter } from './Work';

const renderWork = () =>
  render(
    <MemoryRouter>
      <LangProvider><WorkChapter /></LangProvider>
    </MemoryRouter>
  );

describe('WorkChapter', () => {
  it('shows the featured project title and section number', () => {
    const { container } = renderWork();
    expect(screen.getByText('OIA Village')).toBeInTheDocument();
    const head = container.querySelector('.work-head') as HTMLElement;
    expect(within(head).getByText('02')).toBeInTheDocument();
  });

  it('routes the featured CTA to the case study detail page', () => {
    const { container } = renderWork();
    const cta = container.querySelector('.work-featured-cta');
    expect(cta?.getAttribute('href')).toBe('/work/oia-building');
  });

  it('renders the two compact project cards with detail and live links', () => {
    const { container } = renderWork();
    const cards = container.querySelectorAll('.project-card');
    expect(cards.length).toBe(2);
    const liveLinks = Array.from(container.querySelectorAll('.project-card-link--live'))
      .map((a) => a.getAttribute('href'));
    expect(liveLinks).toContain('https://oia.yonsei.ac.kr/univfinder');
    expect(liveLinks).toContain('https://yonsei-oia.netlify.app');
    const detailLinks = Array.from(container.querySelectorAll('a.project-card-link:not(.project-card-link--live)'))
      .map((a) => a.getAttribute('href'));
    expect(detailLinks).toContain('/work/univ-finder');
    expect(detailLinks).toContain('/work/oia-website');
  });

  it('keeps the deep-dive slides off the home page', () => {
    renderWork();
    // 상세 슬라이드 heading은 홈에 렌더되지 않는다 (상세 라우트 전용)
    expect(screen.queryByText('하루 100통, 무한 반복 메일 지옥.')).toBeNull();
  });
});
