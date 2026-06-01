export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The /keystatic route is a sibling of [locale], so it bypasses the
  // <html>/<body> provided by app/[locale]/layout.tsx. Next 16 requires every
  // route's layout chain to render these tags, so provide them here.
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
