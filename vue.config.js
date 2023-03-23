const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	//代理跨域
});
// module.exports = {
// 	lintOnsave: false,
// 	devServer: {
// 		proxy: {
// 			'/api': {
// 				//后台服务器地址
// 				target: 'http://192.168.0.103:8881', //需要修改
// 				// ws: true,   //是否开启websocked
// 				changeOrigin: true, //是否开启跨域
// 			},
// 		},
// 	},
// };
