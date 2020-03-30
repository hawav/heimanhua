// const purgecss = require('@fullhuman/postcss-purgecss')();

module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    [
      '@fullhuman/postcss-purgecss',
      {
        // Specify the paths to all of the template files in your project
        content: [
          // './public/**/*.html',
          './pages/**/*.jsx',
          './components/**/*.jsx'
          // etc.
        ],

        // Include any special characters you're using in this regular expression
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }
    ]
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
};
