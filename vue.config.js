// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
module.exports = {
  // todo: 基本路径
  publicPath: "./",
  assetsDir: "static", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  // launch_path: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  // proxyTable: {/* 设置跨域的代理服务器 */
  //   '/api': {
  //     target: "http://fd.sctsjkj.com:5081",
  //     ws: true,
  //     changeOrigin: true,
  //      pathRewrite: {
  //       '^/api': '/api'
  //     }
  //   },
  //   '/ueditor': {
  //     target: "http://fd.sctsjkj.com:5081",
  //     ws: true,
  //     changeOrigin: true,
  //      pathRewrite: {
  //       '^/ueditor': '/ueditor'
  //     }
  //   },
  // },
  configureWebpack: {},

};
