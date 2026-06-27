/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" }, // 목 추론 응답 이미지 (#35, 실제 API 연동 시 제거)
      { protocol: "https", hostname: "image.tmdb.org" }, // TMDB 포스터 (#78)
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify 앨범 커버
    ],
  },
};

export default nextConfig;