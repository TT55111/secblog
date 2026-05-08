import { defineCollection, z } from 'astro:content';

const ctfCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    event: z.string(),
    category: z.enum(['Web', 'Pwn', 'Crypto', 'Reverse', 'Misc']),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    tags: z.array(z.string()),
    rank: z.number().optional(),
    team: z.string().optional(),
  }),
});

const vulnCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(['CVE', '0day', '逻辑漏洞', '配置不当']),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
    status: z.enum(['patched', 'reported', 'unpatched']),
    cve: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  ctf: ctfCollection,
  vuln: vulnCollection,
};
