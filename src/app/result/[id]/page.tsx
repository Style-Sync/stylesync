interface Props {
  params: { id: string };
}

export default function ResultPage({ params }: Props) {
  return <div>결과 페이지 — {params.id}</div>;
}
