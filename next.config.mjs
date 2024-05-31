/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [{protocol: "https", hostname: "randomuser.me"}]
    },
};

export default nextConfig;
