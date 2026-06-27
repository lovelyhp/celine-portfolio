import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../context/LangContext';
import { LabChapter } from './Lab';

describe('LabChapter', () => {
  it('renders every lab tool as a card', () => {
    const { container } = render(<LangProvider><LabChapter /></LangProvider>);
    expect(container.querySelectorAll('.lab-card').length).toBe(5);
    expect(screen.getByText('ECTS 성적 환산 자동화')).toBeInTheDocument();
  });
});
