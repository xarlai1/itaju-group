import { collection, config, fields } from '@keystatic/core';
import { Entry } from '@keystatic/core/reader';

import { KeystaticStorage } from './keystatic-storage';

export const keyStaticConfig = createKeyStaticConfig(
  process.env.NEXT_PUBLIC_KEYSTATIC_CONTENT_PATH ?? '',
);

function getContentField() {
  return fields.markdoc({
    label: 'Content',
    options: {
      link: true,
      blockquote: true,
      bold: true,
      divider: true,
      orderedList: true,
      unorderedList: true,
      strikethrough: true,
      heading: true,
      code: true,
      italic: true,
      image: {
        directory: 'public/images/posts',
        publicPath: '/images/posts',
        schema: {
          title: fields.text({
            label: 'Caption',
            description: 'The text to display under the image in a caption.',
          }),
        },
      },
    },
  });
}

export type PostEntryProps = Entry<
  (typeof keyStaticConfig)['collections']['posts']
>;

export type DocumentationEntryProps = Entry<
  (typeof keyStaticConfig)['collections']['documentation']
>;

export type ChangelogEntryProps = Entry<
  (typeof keyStaticConfig)['collections']['changelog']
>;

export type FaqEntryProps = Entry<
  (typeof keyStaticConfig)['collections']['faq']
>;

// Itaju Residency Keystatic Cloud project. Switched on via
// NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=cloud in apps/web/.env.local.
const ITAJU_CLOUD_PROJECT = 'xarlai1/itaju-residency';

function createKeyStaticConfig(path = '') {
  if (path && !path.endsWith('/')) {
    path += '/';
  }

  const collections = getKeystaticCollections(path);

  // Attach the Keystatic Cloud config only in cloud mode. In github/local mode
  // there is no cloud project to bind to, and passing one would couple the
  // editor to Keystatic Cloud features it shouldn't use.
  return config({
    storage: KeystaticStorage,
    ...(KeystaticStorage.kind === 'cloud'
      ? { cloud: { project: KeystaticStorage.project || ITAJU_CLOUD_PROJECT } }
      : {}),
    collections,
  });
}

function getKeystaticCollections(path: string) {
  const statusOptions = [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Review', value: 'review' },
    { label: 'Pending', value: 'pending' },
  ];

  const imageField = fields.image({
    label: 'Image',
    directory: 'public/images/posts',
    publicPath: '/images/posts',
  });

  return {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: `${path}posts/*`,
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({
          label: 'Excerpt',
          description:
            'One-paragraph summary used in meta description, cards, and RSS.',
          multiline: true,
          validation: { isRequired: false },
        }),
        category: fields.text({
          label: 'Category',
          description: 'Single primary category, used for grouping and SEO.',
          validation: { isRequired: false },
        }),
        author: fields.text({
          label: 'Author name',
          validation: { isRequired: false },
        }),
        publishedAt: fields.date({ label: 'Publish date' }),
        image: fields.image({
          label: 'Cover image',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
          description: 'Any size; cropped to 1200×675 on display.',
        }),
        imageAlt: fields.text({
          label: 'Cover image alt text',
          description: 'Required for accessibility and SEO.',
          validation: { isRequired: false },
        }),
        published: fields.checkbox({
          label: 'Published',
          description:
            'Off = draft (excluded from /blog, sitemap, RSS; 404 to the public).',
          defaultValue: false,
        }),
        relatedPosts: fields.array(
          fields.relationship({
            label: 'Related post',
            collection: 'posts',
          }),
          {
            label: 'Related posts',
            itemLabel: (props) => props.value ?? '(unset)',
          },
        ),
        // Back-compat fields kept so existing posts don't break.
        label: fields.text({
          label: 'Label',
          validation: { isRequired: false },
        }),
        categories: fields.array(fields.text({ label: 'Legacy category' })),
        tags: fields.array(fields.text({ label: 'Tag' })),
        description: fields.text({
          label: 'Legacy description',
          validation: { isRequired: false },
        }),
        parent: fields.relationship({
          label: 'Parent',
          collection: 'posts',
        }),
        language: fields.text({ label: 'Language' }),
        order: fields.number({ label: 'Order' }),
        content: getContentField(),
        status: fields.select({
          defaultValue: 'draft',
          label: 'Legacy status',
          options: statusOptions,
        }),
      },
    }),
    documentation: collection({
      label: 'Documentation',
      slugField: 'title',
      path: `${path}documentation/**`,
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        label: fields.text({
          label: 'Label',
          validation: { isRequired: false },
        }),
        content: getContentField(),
        image: imageField,
        description: fields.text({ label: 'Description' }),
        publishedAt: fields.date({ label: 'Published At' }),
        order: fields.number({ label: 'Order' }),
        language: fields.text({ label: 'Language' }),
        parent: fields.relationship({
          label: 'Parent',
          collection: 'documentation',
        }),
        categories: fields.array(fields.text({ label: 'Category' })),
        tags: fields.array(fields.text({ label: 'Tag' })),
        status: fields.select({
          defaultValue: 'draft',
          label: 'Status',
          options: statusOptions,
        }),
        collapsible: fields.checkbox({
          label: 'Collapsible',
          defaultValue: false,
        }),
        collapsed: fields.checkbox({
          label: 'Collapsed',
          defaultValue: false,
        }),
      },
    }),
    changelog: collection({
      label: 'Changelog',
      slugField: 'title',
      path: `${path}changelog/*`,
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        image: imageField,
        categories: fields.array(fields.text({ label: 'Category' })),
        tags: fields.array(fields.text({ label: 'Tag' })),
        publishedAt: fields.date({ label: 'Published At' }),
        parent: fields.relationship({
          label: 'Parent',
          collection: 'changelog',
        }),
        language: fields.text({ label: 'Language' }),
        order: fields.number({ label: 'Order' }),
        content: getContentField(),
        status: fields.select({
          defaultValue: 'draft',
          label: 'Status',
          options: statusOptions,
        }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: `${path}faq/*`,
      format: { data: 'yaml' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({
          label: 'Answer',
          multiline: true,
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          description:
            'Heading this question is grouped under on the FAQ page.',
          options: [
            { label: 'Cost', value: 'Cost' },
            { label: 'Process', value: 'Process' },
            { label: 'Tax', value: 'Tax' },
            { label: 'Residency', value: 'Residency' },
            { label: 'Daily Life', value: 'Daily Life' },
            { label: 'Getting Started', value: 'Getting Started' },
          ],
          defaultValue: 'Process',
        }),
        order: fields.number({
          label: 'Order',
          description: 'Lower numbers appear first.',
          defaultValue: 0,
        }),
      },
    }),
  };
}
