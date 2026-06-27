import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App structure', () => {
  it('renders exactly the five top-level sections', () => {
    const { container } = render(<App />);
    const ids = Array.from(container.querySelectorAll('main > section'))
      .map((s) => s.id);
    expect(ids).toEqual(['hero', 'work', 'about', 'lab', 'contact']);
  });

  it('uses a single light header tone (no dark)', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.deck-top--dark')).toBeNull();
    expect(container.querySelector('.deck-top--light')).not.toBeNull();
  });

  it('renders four nav items', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('.deck-nav-item').length).toBe(4);
  });
});
