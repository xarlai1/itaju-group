import { Cms, CmsClient } from '@kit/cms-types';

import { createKeystaticReader } from './create-reader';
import { DocumentationEntryProps, PostEntryProps } from './keystatic.config';
import { renderMarkdoc } from './markdoc';

export function createKeystaticClient() {
  return new KeystaticClient();
}

class KeystaticClient implements CmsClient {
  async getContentItems(options: Cms.GetContentItemsOptions) {
    const reader = await createKeystaticReader();

    // `faq` is a data-only collection read via getFaqItems(), not through the
    // generic content-item pipeline (it has no status/categories/content).
    const collection = options.collection as Exclude<
      keyof (typeof reader)['collections'],
      'faq'
    >;

    if (!reader.collections[collection]) {
      throw new Error(`Collection ${collection} not found`);
    }

    const fetchContent = options.content ?? true;

    const startOffset = options?.offset ?? 0;
    const endOffset = startOffset + (options?.limit ?? 10);

    const docs = await reader.collections[collection].all();

    const filtered = docs
      .filter((item) => {
        const status = options?.status ?? 'published';

        // For posts, a post is public only when `published === true`.
        // Keystatic omits a default-false checkbox on save, so unpublishing
        // must win over any stale legacy `status: published` left in the
        // frontmatter — we deliberately do NOT fall back to the `status` enum.
        if (options.collection === 'posts') {
          const entry = item.entry as PostEntryProps;
          const wantsPublished = status === 'published';
          const isPublished = entry.published === true;

          if (wantsPublished && !isPublished) {
            return false;
          }
          if (!wantsPublished && isPublished) {
            return false;
          }
        } else if (item.entry.status !== status) {
          return false;
        }

        const categoryMatch = options?.categories?.length
          ? options.categories.find((category) =>
              item.entry.categories.includes(category),
            )
          : true;

        if (!categoryMatch) {
          return false;
        }

        if (options.language) {
          if (item.entry.language && item.entry.language !== options.language) {
            return false;
          }
        }

        const tagMatch = options?.tags?.length
          ? options.tags.find((tag) => item.entry.tags.includes(tag))
          : true;

        if (!tagMatch) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const direction = options.sortDirection ?? 'asc';
        const sortBy = options.sortBy ?? 'publishedAt';

        const transform = (value: string | number | undefined | null) => {
          if (typeof value === 'string') {
            return new Date(value).getTime();
          }

          return value ?? 0;
        };

        const left = transform(a.entry[sortBy]);
        const right = transform(b.entry[sortBy]);

        if (direction === 'asc') {
          return left - right;
        }

        return right - left;
      });

    function processItems(items: typeof filtered) {
      const slugSet = new Set(items.map((item) => item.slug));
      const indexFileCache = new Map<string, boolean>();
      const parentCache = new Map<string, string | null>();

      const isIndexFile = (slug: string): boolean => {
        if (indexFileCache.has(slug)) {
          return indexFileCache.get(slug)!;
        }

        const parts = slug.split('/');

        const result =
          parts.length === 1 ||
          (parts.length >= 2 &&
            parts[parts.length - 1] === parts[parts.length - 2]);

        indexFileCache.set(slug, result);
        return result;
      };

      const findClosestValidParent = (pathParts: string[]): string | null => {
        const path = pathParts.join('/');

        if (parentCache.has(path)) {
          return parentCache.get(path)!;
        }

        for (let i = pathParts.length - 1; i > 0; i--) {
          const parentParts = pathParts.slice(0, i);
          const lastPart = parentParts[parentParts.length - 1];

          if (!lastPart) {
            continue;
          }

          const possibleIndexParent = parentParts.concat(lastPart).join('/');

          if (slugSet.has(possibleIndexParent)) {
            parentCache.set(path, possibleIndexParent);
            return possibleIndexParent;
          }

          const regularParent = parentParts.join('/');

          if (slugSet.has(regularParent)) {
            parentCache.set(path, regularParent);
            return regularParent;
          }
        }

        parentCache.set(path, null);
        return null;
      };

      const results = new Array(items.length) as typeof items;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (!item) {
          continue;
        }

        // If the parent is already set, we don't need to do anything
        if (item.entry.parent !== null) {
          continue;
        }

        if (isIndexFile(item.slug)) {
          item.entry.parent = null;
          results[i] = item;
          continue;
        }

        const pathParts = item.slug.split('/');
        const parentParts = pathParts.slice(0, -1);
        const lastPart = parentParts[parentParts.length - 1]!;
        const possibleIndexParent = parentParts.concat(lastPart).join('/');

        if (slugSet.has(possibleIndexParent)) {
          item.entry.parent = possibleIndexParent;
        } else {
          const regularParent = parentParts.join('/');
          if (slugSet.has(regularParent)) {
            item.entry.parent = regularParent;
          } else {
            item.entry.parent = findClosestValidParent(pathParts);
          }
        }

        results[i] = item;
      }

      return results;
    }

    const itemsWithParents = processItems(filtered);

    const items = await Promise.all(
      itemsWithParents
        .slice(startOffset, endOffset)
        .sort((a, b) => {
          return (a.entry.order ?? 0) - (b.entry.order ?? 0);
        })
        .map((item) => {
          if (collection === 'documentation') {
            return this.mapDocumentationPost(
              item as {
                entry: DocumentationEntryProps;
                slug: string;
              },
              { fetchContent },
            );
          }

          return this.mapPost(
            item as {
              entry: PostEntryProps;
              slug: string;
            },
            { fetchContent },
          );
        }),
    );

    return {
      total: filtered.length,
      items,
    };
  }

  async getContentItemBySlug(params: {
    slug: string;
    collection: string;
    status?: Cms.ContentItemStatus;
  }) {
    const reader = await createKeystaticReader();

    const collection = params.collection as Exclude<
      keyof (typeof reader)['collections'],
      'faq'
    >;

    if (!reader.collections[collection]) {
      throw new Error(`Collection ${collection} not found`);
    }

    const doc = await reader.collections[collection].read(params.slug);
    const status = params.status ?? 'published';

    // verify that the document exists
    if (!doc) {
      return Promise.resolve(undefined);
    }

    // For posts, a post is public only when `published === true`. Drafts
    // (published false or unset) return undefined so the public route 404s.
    if (params.collection === 'posts') {
      const post = doc as PostEntryProps;
      const wantsPublished = status === 'published';
      const isPublished = post.published === true;

      if (wantsPublished !== isPublished) {
        return Promise.resolve(undefined);
      }
    } else if (doc.status !== status) {
      return Promise.resolve(undefined);
    }

    return this.mapPost({ entry: doc as PostEntryProps, slug: params.slug });
  }

  async getCategories() {
    return Promise.resolve([]);
  }

  async getTags() {
    return Promise.resolve([]);
  }

  async getTagBySlug() {
    return Promise.resolve(undefined);
  }

  async getCategoryBySlug() {
    return Promise.resolve(undefined);
  }

  private async mapDocumentationPost<
    Type extends {
      entry: DocumentationEntryProps;
      slug: string;
    },
  >(
    item: Type,
    params: {
      fetchContent: boolean;
    } = {
      fetchContent: true,
    },
  ): Promise<Cms.ContentItem> {
    const publishedAt = item.entry.publishedAt
      ? new Date(item.entry.publishedAt)
      : new Date();

    const content = await item.entry.content();
    const html = params.fetchContent ? await renderMarkdoc(content.node) : [];

    return {
      id: item.slug,
      title: item.entry.title,
      label: item.entry.label,
      url: item.slug,
      slug: item.slug,
      description: item.entry.description,
      publishedAt: publishedAt.toISOString(),
      content: html as string,
      image: item.entry.image ?? undefined,
      status: item.entry.status as Cms.ContentItemStatus,
      collapsible: item.entry.collapsible,
      collapsed: item.entry.collapsed,
      categories:
        (item.entry.categories ?? []).map((item) => {
          return {
            id: item,
            name: item,
            slug: item,
          };
        }) ?? [],
      tags: (item.entry.tags ?? []).map((item) => {
        return {
          id: item,
          name: item,
          slug: item,
        };
      }),
      parentId: item.entry.parent ?? undefined,
      order: item.entry.order ?? 1,
      children: [],
    };
  }

  private async mapPost<
    Type extends {
      entry: PostEntryProps;
      slug: string;
    },
  >(
    item: Type,
    params: {
      fetchContent: boolean;
    } = {
      fetchContent: true,
    },
  ): Promise<Cms.ContentItem> {
    const publishedAt = item.entry.publishedAt
      ? new Date(item.entry.publishedAt)
      : new Date();

    const content = await item.entry.content();
    const html = params.fetchContent ? await renderMarkdoc(content.node) : [];

    const entry = item.entry;

    // Post-only SEO fields (optional; safe to read even if undefined).
    const excerpt = entry.excerpt ?? undefined;
    const category = entry.category ?? undefined;
    const author = entry.author ?? undefined;
    const imageAlt = entry.imageAlt ?? undefined;
    const published = entry.published === true;
    const relatedPostSlugs = Array.isArray(entry.relatedPosts)
      ? (entry.relatedPosts.filter(Boolean) as string[])
      : [];

    // Prefer `excerpt` for the description surface; fall back to legacy
    // `description` so old posts keep rendering.
    const description = excerpt ?? entry.description ?? undefined;

    // Merge legacy `categories` array with new single `category` so both
    // existing and new posts produce a non-empty list.
    const categoryList = category
      ? [category, ...(entry.categories ?? [])]
      : (entry.categories ?? []);

    return {
      id: item.slug,
      title: entry.title,
      label: entry.label,
      url: item.slug,
      slug: item.slug,
      description,
      publishedAt: publishedAt.toISOString(),
      content: html as string,
      image: entry.image ?? undefined,
      status: entry.status as Cms.ContentItemStatus,
      categories: categoryList.map((c) => ({ id: c, name: c, slug: c })),
      tags: (entry.tags ?? []).map((t) => ({ id: t, name: t, slug: t })),
      parentId: entry.parent ?? undefined,
      order: entry.order ?? 1,
      children: [],
      excerpt,
      category,
      author,
      imageAlt,
      published,
      relatedPostSlugs,
    };
  }
}
