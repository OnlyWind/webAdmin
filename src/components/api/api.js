import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true;

axios.defaults.baseURL = 'http://api.jzit168.com';

//登录
export const loginAjax = params => { return axios.post('/sys/login', qs.stringify(params)).then(res => res.data); };
//注销
export const logoutAjax = params => {return axios.post('/common/api/sys/logout',qs.stringify(params)).then(res=>res.data);};
//修改密码
export const setPasswordAjax = params =>{return axios.post('/common/api/sys/changePassword',qs.stringify(params)).then(res=>res.data)}
//刷新Token
export const refreshTokenAjax = params =>{return axios.post('/sys/refreshToken',qs.stringify(params)).then(res=>res.data)}

// 文件上传
export const uploadAjax = params => { return axios.post('/home/index/upload', qs.stringify(params)).then(res => res.data); };








