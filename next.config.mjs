/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_SERVER: process.env.DB_SERVER,
    DB_NAME: process.env.DB_NAME,
    APP_URL: process.env.APP_URL,
  },
};

export default nextConfig;
