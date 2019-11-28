import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
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
    vm.$confirm('登录信息已失效请重新登录', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
    }).then(() => {
        router.push({ path: '/' })
    })
    return Promise.reject(error);
});



//登录拦截器
axios.interceptors.response.use( (response) => {
    if(response.data.code=='401'||response.data.code==401){
        vm.$confirm('登录信息已失效请重新登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
            router.push({ path: '/' })
        })
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
