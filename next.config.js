module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: "https://res.cloudinary.com/ekwuno",
  },
  
 redirects: async()=> {
   return [
      {
        source: '/start',
        destination: '/blog',
        permanent: true,
      },
    ]
 }
};
