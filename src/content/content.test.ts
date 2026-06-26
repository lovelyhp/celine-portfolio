import { describe, it, expect } from 'vitest';
import { ko } from './ko';
import { en } from './en';

describe('content schema', () => {
  it('exposes the new 4-item nav', () => {
    for (const c of [ko, en]) {
      expect(Object.keys(c.nav)).toEqual(['work', 'about', 'lab', 'contact']);
    }
  });

  it('groups work with section number 01 and two card links', () => {
    for (const c of [ko, en]) {
      expect(c.work.number).toBe('01');
      expect(c.univFinder.link).toMatch(/^https?:\/\//);
      expect(c.oiaWebsite.link).toMatch(/^https?:\/\//);
    }
  });

  it('moves macron into about.highlight and small tools into lab', () => {
    for (const c of [ko, en]) {
      expect(c.about.highlight.title.length).toBeGreaterThan(0);
      expect(c.lab.tools.length).toBeGreaterThanOrEqual(4);
      expect('selected' in c).toBe(false);
    }
  });

  it('keeps ko and en structurally aligned for lab tools', () => {
    expect(ko.lab.tools.length).toBe(en.lab.tools.length);
    expect(ko.about.snapshot.length).toBe(en.about.snapshot.length);
  });
});
