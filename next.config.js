module.exports = {
<<<<<<< HEAD
	reactStrictMode: true,
	images: {
		loader: 'cloudinary',
		path: 'https://res.cloudinary.com/ekwuno',
	},
	redirects: async () => {
		return [
			{
				source: '/start',
				destination: '/blog',
				permanent: true,
			},
		];
	},
=======
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
>>>>>>> 6b66c07692621a000f7229442c7cb7186433f523
};
