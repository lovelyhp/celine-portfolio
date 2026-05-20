import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BuildingDiagram } from './BuildingDiagram';

describe('BuildingDiagram', () => {
  it('renders 6 floors with labels', () => {
    render(<BuildingDiagram />);
    expect(screen.getByText(/6F · 대표실 \+ 유부/)).toBeInTheDocument();
    expect(screen.getByText(/5F · Léa/)).toBeInTheDocument();
    expect(screen.getByText(/4F · Mail/)).toBeInTheDocument();
    expect(screen.getByText(/3F · Nomi/)).toBeInTheDocument();
    expect(screen.getByText(/2F · Solène/)).toBeInTheDocument();
    expect(screen.getByText(/1F · Reception/)).toBeInTheDocument();
  });

  it('marks the highlighted floor with a data attribute', () => {
    const { container } = render(<BuildingDiagram highlight={3} />);
    const highlighted = container.querySelector('[data-highlighted="true"]');
    expect(highlighted).not.toBeNull();
    expect(highlighted?.getAttribute('data-floor')).toBe('3');
  });

  it('applies size variant class', () => {
    const { container } = render(<BuildingDiagram size="mini" />);
    expect(container.querySelector('.building-diagram--mini')).not.toBeNull();
  });
});
