import type { CollectionEntry } from 'astro:content';

export function sortPostsByDate<T extends CollectionEntry<'ctf' | 'vuln'>>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function groupPostsByEvent(posts: CollectionEntry<'ctf'>[]): Map<string, CollectionEntry<'ctf'>[]> {
  const events = new Map<string, CollectionEntry<'ctf'>[]>();
  for (const post of posts) {
    const eventName = post.data.event;
    if (!events.has(eventName)) {
      events.set(eventName, []);
    }
    events.get(eventName)!.push(post);
  }
  return events;
}

export function collectAllTags(posts: CollectionEntry<'ctf' | 'vuln'>[]): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function getRankSuffix(rank: number | undefined): string {
  if (!rank) return '-';
  if (rank === 1) return '1st';
  if (rank === 2) return '2nd';
  if (rank === 3) return '3rd';
  return `${rank}th`;
}

export function filterByCategory<T extends { data: { category: string } }>(
  items: T[],
  category: string,
): T[] {
  if (category === '全部') return items;
  return items.filter(item => item.data.category === category);
}
