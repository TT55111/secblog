import { describe, it, expect } from 'vitest';
import {
  sortPostsByDate,
  groupPostsByEvent,
  collectAllTags,
  getRankSuffix,
  filterByCategory,
} from '../lib/utils';
import type { CollectionEntry } from 'astro:content';

function makeCtfPost(overrides: Partial<CollectionEntry<'ctf'>['data']> & { title: string }): CollectionEntry<'ctf'> {
  return {
    id: overrides.title,
    slug: overrides.title.toLowerCase().replace(/\s+/g, '-'),
    body: '',
    collection: 'ctf',
    data: {
      title: overrides.title,
      date: new Date(overrides.date ?? '2026-01-01'),
      event: overrides.event ?? 'TestCTF',
      category: overrides.category ?? 'Web',
      difficulty: overrides.difficulty ?? 'Easy',
      tags: overrides.tags ?? [],
      rank: overrides.rank,
      team: overrides.team,
    },
  };
}

function makeVulnPost(overrides: Partial<CollectionEntry<'vuln'>['data']> & { title: string }): CollectionEntry<'vuln'> {
  return {
    id: overrides.title,
    slug: overrides.title.toLowerCase().replace(/\s+/g, '-'),
    body: '',
    collection: 'vuln',
    data: {
      title: overrides.title,
      date: new Date(overrides.date ?? '2026-01-01'),
      type: overrides.type ?? 'CVE',
      severity: overrides.severity ?? 'High',
      status: overrides.status ?? 'patched',
      cve: overrides.cve,
      tags: overrides.tags ?? [],
    },
  };
}

describe('sortPostsByDate', () => {
  it('按日期降序排列文章', () => {
    const posts = [
      makeCtfPost({ title: '旧文章', date: '2026-01-01' }),
      makeCtfPost({ title: '新文章', date: '2026-03-15' }),
      makeCtfPost({ title: '中文章', date: '2026-02-10' }),
    ];

    const sorted = sortPostsByDate(posts);

    expect(sorted[0].data.title).toBe('新文章');
    expect(sorted[1].data.title).toBe('中文章');
    expect(sorted[2].data.title).toBe('旧文章');
  });

  it('不修改原数组', () => {
    const posts = [
      makeCtfPost({ title: '旧文章', date: '2026-01-01' }),
      makeCtfPost({ title: '新文章', date: '2026-03-15' }),
    ];

    const sorted = sortPostsByDate(posts);

    expect(posts[0].data.title).toBe('旧文章');
    expect(sorted[0].data.title).toBe('新文章');
  });

  it('空数组返回空数组', () => {
    expect(sortPostsByDate([])).toEqual([]);
  });
});

describe('groupPostsByEvent', () => {
  it('按赛事名称分组', () => {
    const posts = [
      makeCtfPost({ title: 'A1', event: 'CTF-A' }),
      makeCtfPost({ title: 'B1', event: 'CTF-B' }),
      makeCtfPost({ title: 'A2', event: 'CTF-A' }),
    ];

    const events = groupPostsByEvent(posts);

    expect(events.size).toBe(2);
    expect(events.get('CTF-A')!.length).toBe(2);
    expect(events.get('CTF-B')!.length).toBe(1);
  });

  it('空列表返回空 Map', () => {
    const events = groupPostsByEvent([]);
    expect(events.size).toBe(0);
  });

  it('同一赛事的文章保持原有顺序', () => {
    const posts = [
      makeCtfPost({ title: '第一篇', event: 'SameCTF' }),
      makeCtfPost({ title: '第二篇', event: 'SameCTF' }),
    ];

    const events = groupPostsByEvent(posts);
    const sameEvent = events.get('SameCTF')!;

    expect(sameEvent[0].data.title).toBe('第一篇');
    expect(sameEvent[1].data.title).toBe('第二篇');
  });
});

describe('collectAllTags', () => {
  it('收集所有标签并去重', () => {
    const posts = [
      makeCtfPost({ title: 'P1', tags: ['SQLi', 'XSS'] }),
      makeCtfPost({ title: 'P2', tags: ['XSS', 'RCE'] }),
    ];

    const tags = collectAllTags(posts);

    expect(tags).toEqual(['RCE', 'SQLi', 'XSS']);
  });

  it('空列表返回空数组', () => {
    expect(collectAllTags([])).toEqual([]);
  });

  it('标签按字母排序', () => {
    const posts = [
      makeCtfPost({ title: 'P1', tags: ['Zebra', 'Alpha', 'Middle'] }),
    ];

    const tags = collectAllTags(posts);

    expect(tags).toEqual(['Alpha', 'Middle', 'Zebra']);
  });
});

describe('getRankSuffix', () => {
  it('第1名返回 1st', () => {
    expect(getRankSuffix(1)).toBe('1st');
  });

  it('第2名返回 2nd', () => {
    expect(getRankSuffix(2)).toBe('2nd');
  });

  it('第3名返回 3rd', () => {
    expect(getRankSuffix(3)).toBe('3rd');
  });

  it('第4名返回 4th', () => {
    expect(getRankSuffix(4)).toBe('4th');
  });

  it('第11名返回 11th', () => {
    expect(getRankSuffix(11)).toBe('11th');
  });

  it('undefined 返回 -', () => {
    expect(getRankSuffix(undefined)).toBe('-');
  });
});

describe('filterByCategory', () => {
  it('全部类别返回所有项目', () => {
    const items = [
      { data: { category: 'Web' } },
      { data: { category: 'Pwn' } },
    ];

    const result = filterByCategory(items, '全部');
    expect(result.length).toBe(2);
  });

  it('按类别筛选', () => {
    const items = [
      { data: { category: 'Web' } },
      { data: { category: 'Pwn' } },
      { data: { category: 'Web' } },
    ];

    const result = filterByCategory(items, 'Web');
    expect(result.length).toBe(2);
  });

  it('不存在的类别返回空数组', () => {
    const items = [
      { data: { category: 'Web' } },
    ];

    const result = filterByCategory(items, 'Crypto');
    expect(result.length).toBe(0);
  });
});
