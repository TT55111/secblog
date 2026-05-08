import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getAllCtfPosts(): Promise<CollectionEntry<'ctf'>[]> {
  const posts = await getCollection('ctf');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllVulnPosts(): Promise<CollectionEntry<'vuln'>[]> {
  const posts = await getCollection('vuln');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getCtfEvents(): Promise<Map<string, CollectionEntry<'ctf'>[]>> {
  const posts = await getAllCtfPosts();
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

export async function getAllTags(): Promise<string[]> {
  const ctfPosts = await getCollection('ctf');
  const vulnPosts = await getCollection('vuln');
  const allPosts = [...ctfPosts, ...vulnPosts];
  const tags = new Set<string>();
  for (const post of allPosts) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
