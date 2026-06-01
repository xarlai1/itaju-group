import { createKeystaticReader } from './create-reader';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  order: number;
}

/**
 * Reads the FAQ collection from Keystatic (Git-backed content). Because the
 * page and its FAQPage JSON-LD both derive from this, editing FAQ entries in
 * the CMS automatically updates the structured data. Sorted by `order`.
 */
export async function getFaqItems(): Promise<FaqItem[]> {
  const reader = await createKeystaticReader();
  const entries = await reader.collections.faq.all();

  return entries
    .map(({ entry }) => ({
      question: entry.question,
      answer: entry.answer,
      category: entry.category,
      order: entry.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}
