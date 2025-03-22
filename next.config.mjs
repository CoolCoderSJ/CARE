/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "amwtgoclmijtxlsifzqi.supabase.co",
                port: '',
            }
        ]
    }
};

export default nextConfig;
