interface Props {
  params: { domain: string };
}

export default function TastePage({ params }: Props) {
  return <div>취향 입력 — {params.domain}</div>;
}
