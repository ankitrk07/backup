export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded focus:bg-accent focus:px-5 focus:py-3 focus:font-display focus:uppercase focus:tracking-wider focus:text-accent-fg"
    >
      Skip to main content
    </a>
  );
}