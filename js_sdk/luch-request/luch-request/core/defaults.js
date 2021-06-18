/**
 * 默认的全局配置
 */


export default {
	// 后台接口域名
	baseURL: 'http://localhost/apiToken/laravel-airlock-sample/public/index.php',
	// 默认请求头
	header: {},
	// 默认请求方式
	method: 'GET',
	// 返回的数据类型解析
	dataType: 'json',
	// #ifndef MP-ALIPAY
	responseType: 'text',
	// #endif
	custom: {},
	// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
	timeout: 60000,
	// #endif
	// #ifdef APP-PLUS
	sslVerify: true,
	// #endif
	// #ifdef H5
	withCredentials: false,
	// #endif
	// #ifdef APP-PLUS
	firstIpv4: false,
	// #endif
	validateStatus: function validateStatus(status) {
		return status >= 200 && status < 300
	}
}
