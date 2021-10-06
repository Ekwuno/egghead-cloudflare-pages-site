module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: "https://res.cloudinary.com/ekwuno",
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/get-started',
        permanent: true,
      },
    ]
  },
};
