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
  publicPath: '',
  outputDir: 'dist',
  assetsDir: '',
  devServer: {

    public: '127.0.0.1:8080',

    hot: true,

    disableHostCheck: true,

}
}
