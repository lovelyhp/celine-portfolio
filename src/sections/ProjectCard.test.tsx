import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  it('renders title, summary, stack chips and external link', () => {
    render(
      <ProjectCard
        index="02" year="2025" title="Univ Finder" subtitle="D3 tool"
        summary="A dashboard." stack={['React', 'D3.js']}
        link="https://example.com"
      />
    );
    expect(screen.getByText('Univ Finder')).toBeInTheDocument();
    expect(screen.getByText('A dashboard.')).toBeInTheDocument();
    expect(screen.getByText('D3.js')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
