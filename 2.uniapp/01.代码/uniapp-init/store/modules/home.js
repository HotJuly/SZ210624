import axios from '../../utils/axios';
import {SETINDEXDATAMUTATION} from '../mutation-types';
const state = {
	initData:"我是home模块的初始化数据",
	indexData:{}
}

const mutations = {
	[SETINDEXDATAMUTATION](state,indexData){
		state.indexData = indexData;
	}
}


const actions = {
	async getIndexData({commit}){
		const result = await axios('/getIndexData');
		commit(SETINDEXDATAMUTATION,result)
		// console.log('context',context)
		// context.state.indexData = result
	}
}


const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
