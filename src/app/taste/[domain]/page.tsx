interface ITastePageProps {
  params: { domain: string };
}

export default function TastePage({ params }: ITastePageProps) {
  return <div>취향 입력 — {params.domain}</div>;
}
