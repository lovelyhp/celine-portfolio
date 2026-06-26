import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { WorkChapter } from './Work';

const renderWork = () =>
  render(<LangProvider><WorkChapter /></LangProvider>);

describe('WorkChapter', () => {
  it('shows the featured project title and section number', () => {
    renderWork();
    expect(screen.getByText('OIA Rush')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders the two compact project cards with live links', () => {
    const { container } = renderWork();
    const cards = container.querySelectorAll('.project-card');
    expect(cards.length).toBe(2);
    const links = Array.from(container.querySelectorAll('.project-card-link'))
      .map((a) => a.getAttribute('href'));
    expect(links).toContain('https://oia.yonsei.ac.kr/univfinder');
    expect(links).toContain('https://yonsei-oia.netlify.app');
  });

  it('collapses the featured deep-dive by default', () => {
    renderWork();
    // OIA Rush PROBLEM 슬라이드 heading은 펼치기 전 숨겨져 있다
    expect(screen.queryByText('하루 100통, 무한 반복 메일 지옥.')).toBeNull();
  });
});
