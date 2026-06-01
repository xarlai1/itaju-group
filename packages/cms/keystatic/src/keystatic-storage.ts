import { CloudConfig, GitHubConfig, LocalConfig } from '@keystatic/core';
import * as z from 'zod';

/**
 * @name STORAGE_KIND
 * @description The kind of storage to use for the Keystatic reader.
 *
 * This can be provided through the `KEYSTATIC_STORAGE_KIND` environment variable or 'NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND'.
 * The previous environment variable `KEYSTATIC_STORAGE_KIND` is deprecated - as Keystatic may need this to be available in the client-side.
 *
 */
const STORAGE_KIND =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND ??
  /* @deprecated */
  process.env.KEYSTATIC_STORAGE_KIND ??
  'local';

/**
 * @name REPO
 * @description The repository to use for the GitHub storage.
 * This can be provided through the `NEXT_PUBLIC_KEYSTATIC_STORAGE_REPO` environment variable. The previous environment variable `KEYSTATIC_STORAGE_REPO` is deprecated.
 */
const REPO =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_REPO ??
  /* @deprecated */
  process.env.KEYSTATIC_STORAGE_REPO;

const BRANCH_PREFIX = process.env.KEYSTATIC_STORAGE_BRANCH_PREFIX;

/**
 * @name PATH_PREFIX
 * @description The repository subdirectory the Keystatic project lives in.
 * This app sits at `apps/web` in the monorepo and content is committed under
 * `apps/web/content/*`, so Keystatic Cloud/GitHub must resolve collection
 * paths (e.g. `content/posts`) against `apps/web`, not the repo root —
 * otherwise the editor finds zero entries even though the blog (local reader,
 * which uses the app cwd and ignores pathPrefix) renders them fine.
 *
 * Defaulted in code rather than via env alone because the Keystatic admin is
 * a client bundle: a non-`NEXT_PUBLIC_` env var is undefined there, so the
 * literal fallback is what reaches the SPA.
 */
const PATH_PREFIX = process.env.KEYSTATIC_PATH_PREFIX ?? 'apps/web';

/**
 * @name PROJECT
 * @description The Keystatic Cloud project (e.g. "team/project").
 * Must be available client-side, so it is read from
 * `NEXT_PUBLIC_KEYSTATIC_STORAGE_PROJECT`. The previous environment
 * variable `KEYSTATIC_STORAGE_PROJECT` is deprecated - it is server-only,
 * so the cloud admin SPA cannot read it and fails Zod validation.
 */
const PROJECT =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_PROJECT ??
  /* @deprecated */
  process.env.KEYSTATIC_STORAGE_PROJECT;

/**
 * @name local
 * @description The configuration for the local storage.
 */
const local = z.object({
  kind: z.literal('local'),
}) satisfies z.ZodType<LocalConfig['storage']>;

/**
 * @name cloud
 * @description The configuration for the cloud storage.
 */
const cloud = z.object({
  kind: z.literal('cloud'),
  project: z
    .string({
      error: `The Keystatic Cloud project. Please provide the value through the "NEXT_PUBLIC_KEYSTATIC_STORAGE_PROJECT" environment variable.`,
    })
    .min(1),
  branchPrefix: z.string().optional(),
  pathPrefix: z.string().optional(),
}) satisfies z.ZodType<CloudConfig['storage']>;

/**
 * @name github
 * @description The configuration for the GitHub storage.
 */
const github = z.object({
  kind: z.literal('github'),
  repo: z.custom<`${string}/${string}`>(),
  branchPrefix: z.string().optional(),
  pathPrefix: z.string().optional(),
}) satisfies z.ZodType<GitHubConfig['storage']>;

/**
 * @name KeystaticStorage
 * @description The configuration for the Keystatic storage. This is used to determine where the content is stored.
 * This configuration is validated through Zod to ensure that the configuration is correct.
 */
export const KeystaticStorage = z.union([local, cloud, github]).parse({
  kind: STORAGE_KIND,
  project: PROJECT,
  repo: REPO,
  branchPrefix: BRANCH_PREFIX,
  pathPrefix: PATH_PREFIX,
});
