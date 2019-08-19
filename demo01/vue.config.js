
const url = 'http://v2.api.haodanku.com/super_classify/apikey/liuguichun'
// http://v2.api.haodanku.com/item_detail/apikey/你的apikey/itemid/557787124271
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                  target: "http://v2.api.haodanku.com",
                  pathRewrite: {"^/api" : ""}
                }
              }
        }
      
    }
  }