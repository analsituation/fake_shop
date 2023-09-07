const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json'
      }
    }
  ],
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
            @import "src/styles/_vars.sass"
`
      }
    }
  }
}
