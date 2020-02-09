const modeENV = process.env.NODE_ENV;

const prodPlugin = (plugin, argv) => {
  return argv === 'production' ? plugin : () => { };
}

// configure Cssnano
const configureCssnano = () => {
  return {
    preset: 'default'
  }
}

// configure Purgecss
const configPurgecss = () => {
  return {
    content: [
      './blog/**/*.html',
      './blog/js/main.js'
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = {
  plugins: [
    // autoprefixer
    prodPlugin(require('autoprefixer'), modeENV),
    // cssnano
    prodPlugin(require('cssnano')(
      configureCssnano()
    ), modeENV),
    // purgecss
    prodPlugin(
      require('@fullhuman/postcss-purgecss')(
        configPurgecss()
      ), modeENV)
  ]
}