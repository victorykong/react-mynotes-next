const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const path = require('path')

module.exports = {
  webpack(config, options) {
    if (!options.defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
      )
    }

    const { dev, isServer } = options
    const lessObj = {
      extensions: ['less'],
      dev,
      isServer,
      loaders: [
        {
          loader: 'less-loader',
          options: { javascriptEnabled: true },
        },
      ],
    }
    const less = cssLoaderConfig(config, lessObj)
    const moduleless = cssLoaderConfig(config, {
      ...lessObj,
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
    })

    // 除了 node_modules 的 .less 文件都添加 css module
    config.module.rules.push({
      test: /\.less$/,
      use: moduleless,
      exclude: path.join(__dirname, 'node_modules'),
    })

    config.module.rules.push({
      test: /\.less$/,
      include: path.join(__dirname, 'node_modules'),
      use: less,
    })

    return config
  },
}
