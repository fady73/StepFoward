module.exports = {
  images: {
    unoptimized: true,
    minimumCacheTTL: 60
  },
  images: {
    domains: [
      's3.us-west-2.amazonaws.com', // Images coming from Notion
      'via.placeholder.com', // for articles that do not have a cover image
      'images.unsplash.com', // For blog articles that use an external cover ima ge
      'pbs.twimg.com', // Twitter Profile Picture
      'dwgyu36up6iuz.cloudfront.net',
      'cdn.hashnode.com',
      'res.craft.do',
      'res.cloudinary.com',
      'nextjs-notion-blog-starter.vercel.app',
      'step-forward-app.vercel.app',
      'step-forward.vercel.app',
      'prod-files-secure.s3.us-west-2.amazonaws.com'
    ]
  }
};
