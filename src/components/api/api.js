import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://www.changlujia.com:3112';//测试端口
axios.defaults.baseURL = 'http://www.changlujia.com:3012';// 发布端口

//登录
export const loginAjax = params => { return axios.post('/school/login/login', qs.stringify(params),).then(res => res.data); };
//获取省
export const provinceAjax = params => { return axios.post('/index/region', qs.stringify(params)).then(res => res.data); };
// 文件上传
export const uploadAjax = params => { return axios.post('/home/index/upload', qs.stringify(params)).then(res => res.data); };
//获取token
export const tokenAjax = params => { return axios.post('/school/index/get_token', qs.stringify(params)).then(res => res.data); };
//修改密码
export const setPasswordAjax = params => { return axios.post('/school/login/update_p_w', qs.stringify(params)).then(res => res.data); };
//一键升班
//旧
// export const upgradeAjax = params => { return axios.post('/school/grade/update_grade', qs.stringify(params)).then(res => res.data); };
//新
export const newUpgradeAjax = params => {console.log(params); return axios.post('/school/grade/testupdategrades', qs.stringify(params)).then(res => res.data); };



/**
 * 反馈
 */
//反馈列表
export const feedbacklistAjax = params => { return axios.post('/school/feedback/list', qs.stringify(params)).then(res => res.data); };
//详情
export const DetailsAjax = params => { return axios.post('/school/feedback/detail', qs.stringify(params)).then(res => res.data); };
//学校回复
export const replyAjax = params => { return axios.post('/school/feedback/reply', qs.stringify(params)).then(res => res.data); };
//学校处理完成
export const endAjax = params => { return axios.post('/school/feedback/end', qs.stringify(params)).then(res => res.data); };
//学校提交反馈
export const addFeedbackAjax = params => { return axios.post('/school/feedback/add', qs.stringify(params)).then(res => res.data); };

/**
 * 班级年级的增删改查
 */
//年级
export const addGradeAjax = params => { return axios.post('/school/grade/add', qs.stringify(params)).then(res => res.data); };

export const deleteGradeAjax = params => { return axios.post('/school/grade/del', qs.stringify(params)).then(res => res.data); };

export const editGradeAjax = params => { return axios.post('/school/grade/update', qs.stringify(params)).then(res => res.data); };

export const getGradeAjax = params => { return axios.post('/school/grade/list', qs.stringify(params)).then(res => res.data); };
//班级
export const addClassAjax = params => { return axios.post('/school/classes/add_class', qs.stringify(params)).then(res => res.data); };

export const deleteClassAjax = params => { return axios.post('/school/classes/del', qs.stringify(params)).then(res => res.data); };

export const editClassAjax = params => { return axios.post('/school/classes/update', qs.stringify(params)).then(res => res.data); };
//获取全部班级
//export const getClassAjax = params => { return axios.post('/school/classes/query_class', qs.stringify(params)).then(res => res.data); };
//在读班级
export const getClassAjax = params => { return axios.post('/school/classes/now_class', qs.stringify(params)).then(res => res.data); };

//获取毕业班级
export const getGraduateClassAjax = params => { return axios.get('/school/classes/graduation_class', qs.stringify(params)).then(res => res.data); };
//获取年级
export const getGradesAjax = params => { return axios.get('/school/grade/get_grade', qs.stringify(params)).then(res => res.data); };
/**
 * 人员管理
 */
//宝宝
export const addBabyAjax = params => { return axios.post('/school/student/add', qs.stringify(params)).then(res => res.data); };

export const deleteBabyAjax = params => { return axios.post('/school/student/del', qs.stringify(params)).then(res => res.data); };

export const editBabyAjax = params => { return axios.post('/school/student/update', qs.stringify(params)).then(res => res.data); };

export const getBabyAjax = params => { return axios.post('/school/student/list', qs.stringify(params)).then(res => res.data); };

export const allDeleteBabyAjax = params => { return axios.post('/school/student/del_many', qs.stringify(params)).then(res => res.data); };

export const outBabyAjax = params => { return axios.post('/school/index/output_student', qs.stringify(params)).then(res => res.data); };
//老师
export const addTeacherAjax = params => { return axios.post('/school/teacher/add_teacher', qs.stringify(params)).then(res => res.data); };

export const deleteTeacherAjax = params => { return axios.post('/school/teacher/del', qs.stringify(params)).then(res => res.data); };

export const editTeacherAjax = params => { return axios.post('/school/teacher/update', qs.stringify(params)).then(res => res.data); };

export const getTeacherAjax = params => { return axios.post('/school/teacher/list', qs.stringify(params)).then(res => res.data); };

export const allDeleteTeacherAjax = params => { return axios.post('/school/teacher/del_many', qs.stringify(params)).then(res => res.data); };
//园长
export const addPresidentAjax = params => { return axios.post('/school/account/add', qs.stringify(params)).then(res => res.data); };

export const deletePresidentAjax = params => { return axios.post('/school/account/del', qs.stringify(params)).then(res => res.data); };

export const editPresidentAjax = params => { return axios.post('/school/account/update', qs.stringify(params)).then(res => res.data); };

export const getPresidentAjax = params => { return axios.post('/school/account/list', qs.stringify(params)).then(res => res.data); };
//家长信息
export const addParentAjax = params => { return axios.post('/school/student/add_parent', qs.stringify(params)).then(res => res.data); };

export const deleteParentAjax = params => { return axios.post('/school/student/del_parent', qs.stringify(params)).then(res => res.data); };

export const editParentAjax = params => { return axios.post('/school/student/update_parent_info', qs.stringify(params)).then(res => res.data); };

export const getParentAjax = params => { return axios.post('/school/student/parent_info', qs.stringify(params)).then(res => res.data); };
//卡号信息
export const addCardAjax = params => { return axios.post('/school/student/add_card', qs.stringify(params)).then(res => res.data); };

export const deleteCardAjax = params => { return axios.post('/school/student/del_card', qs.stringify(params)).then(res => res.data); };

export const editCardAjax = params => { return axios.post('/school/student/update_card', qs.stringify(params)).then(res => res.data); };

export const getCardAjax = params => { return axios.post('/school/student/card_list', qs.stringify(params)).then(res => res.data); };

/**
 * 班级公告
 */
export const addNoticeAjax = params => { return axios.post('/school/class_info/add', qs.stringify(params)).then(res => res.data); };

export const deleteNoticeAjax = params => { return axios.post('/school/class_info/del', qs.stringify(params)).then(res => res.data); };

export const editNoticeAjax = params => { return axios.post('/school/class_info/update', qs.stringify(params)).then(res => res.data); };

export const getNoticeAjax = params => { return axios.post('/school/class_info/list', qs.stringify(params)).then(res => res.data); };

/**
 * 公共区域
 */
export const addAreaAjax = params => { return axios.post('/school/area/add', qs.stringify(params)).then(res => res.data); };

export const deleteAreaAjax = params => { return axios.post('/school/area/del', qs.stringify(params)).then(res => res.data); };

export const editAreaAjax = params => { return axios.post('/school/area/update', qs.stringify(params)).then(res => res.data); };

export const getAreaAjax = params => { return axios.post('/school/area/list', qs.stringify(params)).then(res => res.data); };

/**
 * 设备管理
 */
export const getEquipmentAjax = params => { return axios.post('/school/device/list', qs.stringify(params)).then(res => res.data); };

export const editEquipmentAjax = params => { return axios.post('/school/device/update', qs.stringify(params)).then(res => res.data); };

/**
 * 相册管理
 */
export const addAlbumAjax = params => { return axios.post('/school/photo_album/add', qs.stringify(params)).then(res => res.data); };

export const deleteAlbumAjax = params => { return axios.post('/school/photo_album/del', qs.stringify(params)).then(res => res.data); };

export const editAlbumAjax = params => { return axios.post('/school/photo_album/update', qs.stringify(params)).then(res => res.data); };

export const getAlbumAjax = params => { return axios.post('/school/photo_album/list', qs.stringify(params)).then(res => res.data); };

/**
 * 相片管理
 */
export const addPhotoAjax = params => { return axios.post('/school/photos/add', qs.stringify(params)).then(res => res.data); };

export const deletePhotoAjax = params => { return axios.post('/school/photos/del', qs.stringify(params)).then(res => res.data); };

export const getPhotoAjax = params => { return axios.post('/school/photos/list', qs.stringify(params)).then(res => res.data); };

/**
 * 视频管理
 */
export const addVideoAjax = params => { return axios.post('/school/video/add', qs.stringify(params)).then(res => res.data); };

export const deleteVideoAjax = params => { return axios.post('/school/video/del', qs.stringify(params)).then(res => res.data); };

export const getVideoAjax = params => { return axios.post('/school/video/list', qs.stringify(params)).then(res => res.data); };

export const setVideoAjax = params => { return axios.post('/school/video/update', qs.stringify(params)).then(res => res.data); };

/**
 * banner图管理
 */
export const addBannerAjax = params => { return axios.post('/school/banner/add', qs.stringify(params)).then(res => res.data); };

export const getBannerAjax = params => { return axios.post('/school/banner/list', qs.stringify(params)).then(res => res.data); };

export const delBannerAjax = params => { return axios.post('/school/banner/del', qs.stringify(params)).then(res => res.data); };

/**
 * 学星管理
 */
export const addStarNameAjax = params => { return axios.post('/school/star/add_star', qs.stringify(params)).then(res => res.data); };

export const getStarNameAjax = params => { return axios.post('/school/star/star_list', qs.stringify(params)).then(res => res.data); };

export const deleteStarNameAjax = params => { return axios.post('/school/star/del_star', qs.stringify(params)).then(res => res.data); };

export const addStarAjax = params => { return axios.post('/school/star/add', qs.stringify(params)).then(res => res.data); };

export const getStarAjax = params => { return axios.post('/school/star/list', qs.stringify(params)).then(res => res.data); };

export const deleteStarAjax = params => { return axios.post('/school/star/del', qs.stringify(params)).then(res => res.data); };

/**
 * 校园公告管理
 */
export const addDynamicAjax = params => { return axios.post('/school/school_info/add', qs.stringify(params)).then(res => res.data); };

export const deleteDynamicAjax = params => { return axios.post('/school/school_info/del', qs.stringify(params)).then(res => res.data); };

export const editDynamicAjax = params => { return axios.post('/school/school_info/update', qs.stringify(params)).then(res => res.data); };

export const getDynamicAjax = params => { return axios.post('/school/school_info/list', qs.stringify(params)).then(res => res.data); };

/**
 * 食谱
 */
export const editMenuAjax = params => { return axios.post('/school/menu/add', qs.stringify(params)).then(res => res.data); };

export const getMenuAjax = params => { return axios.post('/school/menu/list', qs.stringify(params)).then(res => res.data); };

/**
 * 考勤管理
 */
export const getClockAjax = params => { return axios.post('/school/sign_info/sign_info', qs.stringify(params)).then(res => res.data); };

export const exportClockAjax = params => { return axios.post('/school/sign_info/out_put', qs.stringify(params)).then(res => res.data); };

export const setTimeClockAjax = params => { return axios.post('/school/school_info/sign_time', qs.stringify(params)).then(res => res.data); };

export const getTimeClockAjax = params => { return axios.post('/school/school_info/select_sign_time', qs.stringify(params)).then(res => res.data); };

/**
 * 图书借阅榜管理
 */
export const getBookBorrowAjax = params => { return axios.post('/school/corner/rank_borrow_book', qs.stringify(params)).then(res => res.data); };

export const getBookCornerBorrowAjax = params => { return axios.post('/school/corner/rank_borrow_corner', qs.stringify(params)).then(res => res.data); };

export const getStudentBorrowAjax = params => { return axios.post('/school/corner/rank_borrow_student', qs.stringify(params)).then(res => res.data); };

/**
 * 图书角管理
 */
export const getBookCornerAjax = params => { return axios.post('/school/corner/list', qs.stringify(params)).then(res => res.data); };

export const allotBookCornerAjax = params => { return axios.post('/school/corner/allot_class', qs.stringify(params)).then(res => res.data); };

export const getClassBorrowAjax = params => { return axios.post('/school/corner/class_corner', qs.stringify(params)).then(res => res.data); };

export const getBookDetailAjax = params => { return axios.post('/school/corner/corner_detail', qs.stringify(params)).then(res => res.data); };

//教程
export const getCourseAjax = params => { return axios.post('/school/instructions/list', qs.stringify(params)).then(res => res.data); };











