-- #127 #128
-- pgvector extension 활성화 + results 테이블 embedding 컬럼 추가

create extension if not exists vector with schema extensions;

-- 유사도 검색용 embedding 컬럼 (xAI text-embedding-3-small: 1536차원)
alter table public.results
  add column if not exists embedding vector(1536);

-- 코사인 유사도 IVFFlat 인덱스
-- lists=10: 초기 소규모 데이터 기준. row 수 > 10만 시 sqrt(row_count)로 조정 권장
create index if not exists results_embedding_cosine_idx
  on public.results
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 10);
