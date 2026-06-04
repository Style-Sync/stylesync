import Link from "next/link";

export default function SelectPage() {
  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <h2 className="text-2xl font-bold">도메인 선택</h2>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          href="/taste/music"
          className="rounded-2xl border p-6 text-center hover:bg-neutral-50"
        >
          Music
        </Link>

        <Link
          href="/taste/movie"
          className="rounded-2xl border p-6 text-center hover:bg-neutral-50"
        >
          Movie
        </Link>

        <Link
          href="/taste/fashion"
          className="rounded-2xl border p-6 text-center hover:bg-neutral-50"
        >
          Fashion
        </Link>
      </div>
    </main>
  );
}
