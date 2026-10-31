interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders structured data. `<` is escaped so the JSON can never break out of the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}