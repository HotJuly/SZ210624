import {createStore} from 'vuex';


export default createStore({
    state:{
        msg:"我是Vuex的数据"
    },
    mutations:{
        CHANGEMSG(state,text){
            state.msg = text;
        }
    }
})