const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  webpack: (config, { isServer }) => {
    // For server-side rendering (isServer), exclude the canvas.node file from the bundle
    if (isServer) {
      config.externals.push('canvas');
    }

    // Add a loader for .node files if needed
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader'
    });

    return config;
  },
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
      'www.notion.so',
      'step-forward-app.vercel.app',
      'step-forward.vercel.app',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'i.ibb.co'
    ]
  }
};
