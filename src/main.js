import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import qs from 'qs'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

import "babel-polyfill";

import VueDraggableResizable from 'vue-draggable-resizable'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

//路由守卫
router.beforeEach((to,from,next)=>{
   let access_token = localStorage.getItem('access_token');
   if (access_token){
       next()
   } else {
       next('/login')
   }
});


// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem("access_token")
    if(config.method==='post'){
        let data = qs.parse(config.data)
            config.data= qs.stringify({
                access_token:token,
                ...data
            })
    }else if(config.method==='get'){
        config.params={
            access_token:token,
            ...config.params
        }
    }
    return config
}, function (error) {
    // Do something with request error
    ElementUI.Message({
        message: '登录信息已失效请重新登录',
        type: 'error'
    });
    // router.push({ path: '/' })
    return Promise.reject(error);
});


let flag=true //只弹出报错一次
//登录拦截器
axios.interceptors.response.use( (response) => {
    flag = true
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    if (error.toString().search('402') != -1) {
        if (flag == true){
            ElementUI.Message({
                message: '登录信息已失效请重新登录',
                type: 'error'
            });
            router.push({ path: '/' })
        }
        flag = false
    } else if (error.toString().search('500') != -1){
        ElementUI.Message({
            message: '服务器错误或网络延迟',
            type: 'error'
        });
    } else if (localStorage.getItem('unitId') == false || localStorage.getItem('unitId') == undefined){
        //如果没有绑定企业，先跳转企业管理页面
        if (localStorage.getItem('unitId') == false || localStorage.getItem('unitId') == undefined) {
            ElementUI.Message({
                message: '请先绑定企业',
                type: 'error'
            });
            router.push({ path: '/companyInfo' })
        }
    } else {
        ElementUI.Message({
            message: '系统错误，联系管理员',
            type: 'error'
        });
    }
    return Promise.reject(error);
});
