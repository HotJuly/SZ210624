import Vue from 'vue';
export default {
    name:"RouterLink",
    functional:true,
    props:{
        to:String,
        tag:{
            type:String,
            default:"a"
        },
        replace:{
            type:Boolean,
            default:false
        }
    },
    render:(createElement, {data,prop,props,children})=>{
        console.log(props,prop)
        data.on={
            click:(event)=>{
                // 此处防止a标签的默认行为导致页面跳转
                event.preventDefault();
                if(props.replace){
                    Vue.prototype.$router.replace(props.to)
                }else{
                    Vue.prototype.$router.push(props.to)
                }
            }
        }

        data.attrs.href=props.to;


        return createElement(props.tag,data,children)
    }
}