/**
 * Renders a JSON-LD structured-data block.
 *
 * Follows Next.js' recommended pattern (see
 * `apps/web/node_modules/next/dist/docs/01-app/02-guides/json-ld.md`): a
 * `<script type="application/ld+json">` whose body is `JSON.stringify`'d data,
 * with every `<` replaced by its unicode escape so a value can never break out
 * of the script tag (XSS hardening). `type="application/ld+json"` is data, not
 * executable
 * script, so no CSP nonce is required.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
