interface IResultPageProps {
  params: { id: string };
}

export default function ResultPage({ params }: IResultPageProps) {
  return <div>결과 페이지 — {params.id}</div>;
}
