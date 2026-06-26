import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CaseStudy, CaseSlide } from './CaseStudy';

const slides: CaseSlide[] = [
  { kind: 'cover', heading: 'Cover Head', sub: 'sub', body: 'body' },
  { kind: 'section', tag: 'PROBLEM', heading: 'Hidden Head', body: ['p1'] },
];

const base = { index: '01', year: '2026', title: 'T', subtitle: 's', stack: ['X'], slides };

describe('CaseStudy collapsible', () => {
  it('hides non-cover slides until expanded', async () => {
    render(<CaseStudy {...base} collapsible showBuilding={false} />);
    expect(screen.getByText('Cover Head')).toBeInTheDocument();
    expect(screen.queryByText('Hidden Head')).toBeNull();

    const btn = screen.getByRole('button', { name: /자세히|detail|more/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(btn);
    expect(screen.getByText('Hidden Head')).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows all slides when not collapsible', () => {
    render(<CaseStudy {...base} showBuilding={false} />);
    expect(screen.getByText('Hidden Head')).toBeInTheDocument();
  });
});
