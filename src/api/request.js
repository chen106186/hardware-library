//对axios进行二次封装,将刚才下载好的axios导入进来
import axios from 'axios';
import { devUrl } from '@/settings';
//1.利用axios对象的方法create,去创建一个axios实例
//2.requests就是axios,只不过稍微配置一下
const baseURL = process.env.NODE_ENV === 'production' ? location.origin : devUrl;
const service = axios.create({
	//配置对象
	//基础路径，发请求的时候，路径当中会出现api，不用你手写
	baseURL: baseURL + '/api',
	//请求时间超过5秒
	timeout: 50000,
});
//请求拦截器:在发请求之前，请求拦截器可以检测到,可以在请求发出去之前做一些事情
service.interceptors.request.use(
	async (config) => {
		config.headers = {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
		};

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		const { code, msg } = res;

		// if (Object(res).hasOwnProperty('status')) {
		//     if (!res.status) {
		//         Message.error('查无此数据')
		//         return Promise.reject('error')
		//     } else if (res.status === '000000') {
		//         res.object = res.result
		//         return res
		//     }
		// }

		if (code !== 0) {
			return Promise.reject(`${code}&${msg || 'Error'}`);
		} else {
			return res;
		}
	},
	(error) => {
		alert(error);
		return Promise.reject(error);
	}
);

export const GET = (url, params) => {
	return service.get(url, { params }).then((res) => res.object);
};
export const POST = (url, data) => {
	return service.post(url, data).then((res) => res.object);
};
export const POST_JSON = (url, body, params) => {
	return service.post(url, body, { params }).then((res) => res.object);
};
