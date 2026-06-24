/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "image.tmdb.org" }, // TMDB 포스터/배경
        { protocol: "https", hostname: "i.scdn.co" }, // Spotify 아티스트/앨범 (Premium 풀리면)
      ],
    },
  };
  
  export default nextConfig;