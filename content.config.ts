import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Writing collection. Each post declares its own language (`lang`) so the bilingual UI can
// filter to the active locale. `series` marks the deep protocol/security essays that carry
// the security-red accent; `featured` surfaces a post on the home ledger.
export default defineContentConfig({
  collections: {
    writing: defineCollection({
      type: 'page',
      source: 'writing/**/*.md',
      schema: z.object({
        lang: z.enum(['vi', 'en']).default('vi'),
        date: z.string(),
        summary: z.string(),
        tags: z.array(z.string()).default([]),
        kind: z.enum(['security', 'protocol', 'engineering', 'ai', 'note']).default('note'),
        readingTime: z.number().optional(),
        featured: z.boolean().default(false),
        canonical: z.string().url().optional(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
