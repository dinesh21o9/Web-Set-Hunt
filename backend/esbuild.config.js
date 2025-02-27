const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./app.js'],
  bundle: true,
  outfile: 'build/index.js',
  platform: 'node',
  target: 'node20',
  external: [
    // External dependencies that are causing issues
    'mock-aws-s3',
    'aws-sdk',
    'nock',
    // Add any other problematic dependencies here
  ],
  loader: {
    // Define loaders for file extensions
    '.html': 'text',  // Load HTML files as text
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
    '.gif': 'file'
  },
  logLevel: 'info',
})
.catch(() => process.exit(1));