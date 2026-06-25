/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" }, // 목 추론 응답 이미지 (#35, 실제 API 연동 시 제거)
    ],
  },
};

export default nextConfig;