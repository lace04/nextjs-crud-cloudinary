// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

const million = require('million/compiler');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: true,
  // if you're using RSC:
  // auto: { rsc: true },
};

// export default million.next(nextConfig, millionConfig);
module.exports = million.next(nextConfig, millionConfig);
module.exports = nextConfig;
