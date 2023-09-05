const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: {
    plugins: [new TsconfigPathsPlugin()]
  },
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
