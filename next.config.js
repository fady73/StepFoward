const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  },
  api: {
    bodyParser: {
      sizeLimit: '20mb' // Set desired value here
    }
  },
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
