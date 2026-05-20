import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BuildingDiagram } from './BuildingDiagram';

describe('BuildingDiagram', () => {
  it('renders 6 floors with labels', () => {
    const { container } = render(<BuildingDiagram />);
    const floors = container.querySelectorAll('.building-diagram__floor');
    const texts = Array.from(floors).map((f) => f.textContent?.replace(/\s+/g, ' ').trim());
    expect(texts).toContain('6F · 대표실 + 유부');
    expect(texts).toContain('5F · Léa (MoU)');
    expect(texts).toContain('4F · Mail (154통)');
    expect(texts).toContain('3F · Nomi (8건)');
    expect(texts).toContain('2F · Solène (밸런스)');
    expect(texts).toContain('1F · Reception');
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

  it('omits floor labels when showLabels is false', () => {
    const { container } = render(<BuildingDiagram showLabels={false} />);
    const labels = container.querySelectorAll('.building-diagram__floor-label');
    expect(labels.length).toBe(0);
    // floor number must still render
    expect(container.querySelectorAll('.building-diagram__floor-num').length).toBe(6);
  });
});
