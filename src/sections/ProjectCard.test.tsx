import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  it('renders title, summary, stack chips, detail route and external link', () => {
    render(
      <MemoryRouter>
        <ProjectCard
          index="02" year="2025" title="Univ Finder" subtitle="D3 tool"
          summary="A dashboard." stack={['React', 'D3.js']}
          link="https://example.com" to="/work/univ-finder"
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Univ Finder')).toBeInTheDocument();
    expect(screen.getByText('A dashboard.')).toBeInTheDocument();
    expect(screen.getByText('D3.js')).toBeInTheDocument();

    const title = screen.getByRole('link', { name: 'Univ Finder' });
    expect(title).toHaveAttribute('href', '/work/univ-finder');

    const live = screen.getByRole('link', { name: 'Live ↗' });
    expect(live).toHaveAttribute('href', 'https://example.com');
    expect(live).toHaveAttribute('target', '_blank');
  });
});
