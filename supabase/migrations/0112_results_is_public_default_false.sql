-- #301
-- results.is_public 스키마 기본값을 true → false 로 변경 (기본 비공개)
--
-- 배경: 앱 레벨에서는 #278에서 POST /api/results insert 시 is_public:false를 명시했지만,
-- 스키마 기본값(0103)이 여전히 true라, is_public을 명시하지 않는 insert 경로가
-- 새로 생기면 결과가 공개로 저장되는 잠재 리스크가 남는다.
-- "명시 안 하면 비공개"가 안전 기본값이므로 스키마 기본값 자체를 false로 내린다.
--
-- 주의: 기존 행의 is_public 값은 건드리지 않는다 (default 변경은 신규 insert에만 영향).

alter table public.results
  alter column is_public set default false;
