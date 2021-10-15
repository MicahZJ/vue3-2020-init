const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源目录 (js, css, img, fonts)
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',
  // lintOnSave：{ type:Boolean default:true } 是否使用 eslint
  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果不需要生产时的源映射，那么将此设置为 false 可以加速生产构建
  productionSourceMap: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
    config.module.rule('images')
      .use('url-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]',
        esModule: false,
      })
      .end()
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production'){
      // 定义压缩文件类型
      const productionGzipExtensions = ['js', 'css', 'svg', 'ttf', 'otf']
      config.plugins.push(
        // 缓存dll,优化编译速度
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          // test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240,//对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: false //不删除源文件
        })
      )
    }
  
    Object.assign(config, {
      // 开发生产共同配置
      externals: {
        "BMap": "BMapGL",
        'BMapLib':'BMapLib'
      },
      // externals: {
      //   'vue': 'Vue',
      //   'element-ui': 'ELEMENT',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex'
      // } // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
      resolve: {
        extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views"),
          "@u": path.resolve(__dirname, "./src/utils"),
          "@s": path.resolve(__dirname, "./src/service")
        }, // 别名配置
        plugins: [],
      },
    });
  },
  devServer: {
    disableHostCheck: true,
    port: '', // 端口号
    host: '',
    https: false,
    open: true, // 配置自动启动浏览器
    overlay: { // 浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    compress: true,
    hot: true  //热加载
    // 配置跨域处理
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
}
