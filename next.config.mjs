/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL validation in development only
}
const nextConfig = {
  images: {
    domains: ["predemo.site"],

  },
};

export default nextConfig;
