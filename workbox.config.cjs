// A config for `generateSW`
// globDirectory is for Netlify's dist location
module.exports = {
  globDirectory: '/opt/build/repo/dist/',
  globPatterns: [
    '**/*.{css,woff2,png,svg,jpg,js}'
  ],
  swDest: '/opt/build/repo/dist/sw.js'
};