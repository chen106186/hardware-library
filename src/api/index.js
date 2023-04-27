import { GET, POST } from './request';

export default {
	//组件相关
	findContentInfo: (params) => GET('/content/findContentInfo', params),
	findDetailsById: (params) => GET('/content/findDetailsById', params),
	insertContent: data => POST('/content/insertContent', data),
	updateContent: (params) => POST('/content/updateContent/' + params.id, params),
	deleteContent: (params) => POST('/content/deleteContent/' + params.id, params),

	//库存相关
	insertInventory: (params) => POST('/inventory/insertInventory', params),
	///inventory/insertInventory
	//预定
	findList: (params) => GET('/reservation/findList', params),
	deleteReservation: (params) => POST('/reservation/deleteReservation/' + params.id, params),
	insertReservation: (params) => POST('/reservation/insertReservation', params),
	updateReservation: (params) => POST('/reservation/updateReservation/' + params.id, params),
	
	//成员
	getMemberList: (params) => GET('/user/findList', params),
	deleteUser: (params) => POST('/user/deleteUser/' + params.id, params),
	insertUser: (params) => POST('/user/insertUser', params),

	//建议
	getList: (params) => GET('/proposal/findList', params),
	updateProposal: (params) => POST('/proposal/updateProposal/' + params.id, params),

	//用户端

	findComponentViewByUser: (params) => GET('/contentUser/findComponentViewByUser', params),
	findProposalListByUser: (params) => GET('/contentUser/findProposalListByUser', params),
	insertProposal: (params) => POST('/contentUser/insertProposal', params),
	//用户收藏列表
	findCartListByUser: (params) => GET('/contentUser/findCartListByUser', params),
	//Cart
	deleteCart: (params) => POST('/contentUser/deleteCart/' + params.id, params),
	insertCart: (params) => POST('/contentUser/insertCart', params),
	///contentUser/insertCart

	//用户登录
	login: (params) => POST('/user/login', params),
};
