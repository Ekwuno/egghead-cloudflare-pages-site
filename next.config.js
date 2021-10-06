module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: "https://res.cloudinary.com/ekwuno",
  },
  async redirects() {
    return [
      {
        source: '/get-started',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
};
