import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CaseStudyDetail, CaseStudyData } from './CaseStudy';

const data: CaseStudyData = {
  id: 'demo',
  index: '01',
  year: '2026',
  title: 'Demo Title',
  subtitle: 'demo subtitle',
  stack: ['X', 'Y'],
  showBuilding: false,
  slides: [
    { kind: 'cover', heading: 'Cover Head', sub: 'Cover lede', body: 'Cover body' },
    { kind: 'section', tag: 'PROBLEM', heading: 'Section Head', body: ['p1', 'p2'] },
    {
      kind: 'result', tag: 'RESULT', heading: 'Impact Head',
      body: [{ h: 'Metric', p: 'Explanation' }],
    },
    {
      kind: 'scenes', tag: 'SCENES', heading: 'Scenes Head',
      scenes: ['scene one'], closing: { h: 'Closing', p: 'closing p' },
    },
  ],
};

describe('CaseStudyDetail', () => {
  it('renders the header block from the cover slide', () => {
    render(<CaseStudyDetail data={data} />);
    expect(screen.getByText('Demo Title')).toBeInTheDocument();
    expect(screen.getByText('Case Study · 2026')).toBeInTheDocument();
    expect(screen.getByText('Cover lede')).toBeInTheDocument();
    expect(screen.getByText('Cover body')).toBeInTheDocument();
  });

  it('renders every non-cover slide as a row', () => {
    render(<CaseStudyDetail data={data} />);
    expect(screen.getByText('Section Head')).toBeInTheDocument();
    expect(screen.getByText('p2')).toBeInTheDocument();
    expect(screen.getByText('scene one')).toBeInTheDocument();
    expect(screen.getByText('Closing')).toBeInTheDocument();
  });

  it('renders the result slide as the navy impact panel', () => {
    const { container } = render(<CaseStudyDetail data={data} />);
    const impact = container.querySelector('.case-impact');
    expect(impact).not.toBeNull();
    expect(impact?.textContent).toContain('Metric');
  });

  it('renders stack chips in the meta column', () => {
    const { container } = render(<CaseStudyDetail data={data} />);
    expect(container.querySelectorAll('.case-stack .chip').length).toBe(2);
  });
});
