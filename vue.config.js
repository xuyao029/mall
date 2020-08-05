module.exports ={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  },
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  publicPath: '',
  //编译打包存放的目录默认dist
  outputDir: 'dist',
  assetsDir: '',
  devServer: {
    public: '127.0.0.1:8080',
    hot: true,
    disableHostCheck: true,
}
}
