module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: "https://res.cloudinary.com/ekwuno",
  },
  
  async redirects() {
    return [
      {
        source: '/start',
        destination: ' /blog',
        permanent: true,
      },
    ]
  },
};
