import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://api.jzit168.com';

//登录
export const loginAjax = params => { return axios.post('/sys/mobileLogin-password', qs.stringify(params)).then(res => res.data); };
//注销
export const logoutAjax = params => {return axios.post('/common/api/sys/logout',qs.stringify(params)).then(res=>res.data);};
//修改密码
export const setPasswordAjax = params =>{return axios.post('/common/api/sys/changePassword',qs.stringify(params)).then(res=>res.data)}
//刷新Token
export const refreshTokenAjax = params =>{return axios.post('/sys/refreshToken',qs.stringify(params)).then(res=>res.data)}

/**企业信息**/
//查询企业信息
export const querycomInfoAjax = params => {return axios.post('/info/api/company/queryInfo',qs.stringify(params)).then(res=>res.data);};
//编辑企业信息
export const upcompanyInfoAjax = params => {return axios.post('/info/api/company/upInfo',qs.stringify(params)).then(res=>res.data);};
//添加企业信息
export const addcompanyInfoAjax = params => {return axios.post('/info/api/company/addInfo',qs.stringify(params)).then(res=>res.data);};

/**系统设置**/
//查询分辨率
export const screenListAjax = params => {return axios.post('/info/api/system/screenList',qs.stringify(params)).then(res=>res.data);};
//添加分辨率
export const addScreenAjax = params => {return axios.post('/info/api/system/addScreen',qs.stringify(params)).then(res=>res.data);};
//删除分辨率
export const delScreenAjax = params => {return axios.post('/info/api/system/delScreen',qs.stringify(params)).then(res=>res.data);};
//查询版本列表
export const queryVersionAjax = params => {return axios.post('/info/api/system/queryVersionList',qs.stringify(params)).then(res=>res.data);};
//发布新版本
export const newVersionAjax = params => {return axios.post('/info/api/system/releaseVersion',qs.stringify(params)).then(res=>res.data);};

/**设备管理**/
//设备列表
export const deviceAjax = params =>{return axios.post('/info/api/devices/deviceList',qs.stringify(params)).then(res=>res.data)}
//编辑设备信息
export const updataDeviceAjax = params =>{return axios.post('/info/api/devices/updataDevice',qs.stringify(params)).then(res=>res.data)}
//设备分类列表
export const deviceTypeListAjax = params =>{return axios.post('/info/api/devices/deviceTypeList',qs.stringify(params)).then(res=>res.data)}
//添加设备分类
export const addDeviceTypeAjax = params =>{return axios.post('/info/api/devices/addDeviceType',qs.stringify(params)).then(res=>res.data)}
//删除设备分类
export const delDeviceTypeAjax = params =>{return axios.post('/info/api/devices/delDeviceType',qs.stringify(params)).then(res=>res.data)}
//编辑设备分类
export const updataDeviceTypeAjax = params =>{return axios.post('/info/api/devices/updataDeviceType',qs.stringify(params)).then(res=>res.data)}
//所有设备分类名
export const alldeviceTypeAjax = params =>{return axios.get('/info/api/devices/alldeviceType',{params: params}).then(res=>res.data)}
//所有设备分辨率
export const allScreenAjax = params =>{return axios.get('/info/api/devices/alldeviceScreen',{params: params}).then(res=>res.data)}
//生成设备账号
export const generateUAndPAjax = params =>{return axios.post('/info/api/devices/generateUAndP',qs.stringify(params)).then(res=>res.data)}

/**节目管理**/
//获取七牛token
export const getUpTokenAjax = params => { return axios.post('/info/api/resources/resToken', qs.stringify(params)).then(res => res.data); };
//添加素材
export const addresourcesAjax = params => { return axios.post('/info/api/resources/addresources', qs.stringify(params)).then(res => res.data); };
//查询素材
export const queryresourcesAjax = params => { return axios.post('/info/api/resources/queryresources', qs.stringify(params)).then(res => res.data); };
//删除素材
export const delresourcesAjax = params => { return axios.post('/info/api/resources/delresources', qs.stringify(params)).then(res => res.data); };
//查询二维码
export const selectQuickMarkAjax = params =>{return axios.get('/info/api/resources/selectQuickMark',{params: params}).then(res=>res.data)}


/**模板管理**/
//查询模板
export const queryTemplateAjax = params => { return axios.post('/info/api/sjabloonbeheer/queryTemplate', qs.stringify(params)).then(res => res.data); };
//查询所有模板分辨率
export const allresolutionAjax = params => { return axios.get('/info/api/sjabloonbeheer/allresolution', {params: params}).then(res => res.data); };
//添加模板
export const addTemplateAjax = params => { return axios.post('/info/api/sjabloonbeheer/addtemplate', qs.stringify(params)).then(res => res.data); };
//编辑模板
export const editTemplateAjax = params => { return axios.post('/info/api/sjabloonbeheer/uptemplate', qs.stringify(params)).then(res => res.data); };
//删除模板
export const delteTemplateAjax = params => { return axios.post('/info/api/sjabloonbeheer/deltemplate', qs.stringify(params)).then(res => res.data); };

/**节目管理**/
//查询节目
export const queryProgramAjax = params => { return axios.post('/info/api/programs/queryProgram', qs.stringify(params)).then(res => res.data); };
//添加节目
export const addProgramAjax = params => { return axios.post('/info/api/programs/addProgram', qs.stringify(params)).then(res => res.data); };
//编辑节目名
export const updateProgramAjax = params => { return axios.post('/info/api/programs/updateProgram', qs.stringify(params)).then(res => res.data); };
//编辑节目单
export const updateProgramListAjax = params => { return axios.post('/info/api/programs/updateProgramList', qs.stringify(params)).then(res => res.data); };
//删除节目
export const delProgramAjax = params => { return axios.post('/info/api/programs/delProgram', qs.stringify(params)).then(res => res.data); };

/**任务管理**/
//查询任务
export const queryTaskAjax = params => { return axios.post('/info/api/tasks/queryTask', qs.stringify(params)).then(res => res.data); };
//添加任务
export const addTaskAjax = params => { return axios.post('/info/api/tasks/addTask', qs.stringify(params)).then(res => res.data); };
//推送任务(已停用)
// export const pushTaskAjax = params => { return axios.post('/info/api/tasks/pushTask', qs.stringify(params)).then(res => res.data); };

/**附加任务**/
//附加任务列表
export const querySubTaskAjax = params => { return axios.post('/info/api/subjoinTasks/querySubTask', qs.stringify(params)).then(res => res.data); };
//添加附加任务
export const addSubTaskAjax = params => { return axios.post('/info/api/subjoinTasks/addSubTask', qs.stringify(params)).then(res => res.data); };




