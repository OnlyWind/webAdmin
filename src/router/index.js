import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },

                //企业信息
                {
                    path: '/companyInfo',
                    component: resolve => require(['../components/page/companyInfo/companyInfo.vue'], resolve)
                },

                //系统设置
                {
                    path:'/resolutionInfo',
                    component: resolve => require(['../components/page/systemSetting/resolutionInfo.vue'], resolve)
                },

                //设备管理
                {
                    path: '/boot',
                    component: resolve => require(['../components/page/device/boot.vue'], resolve)
                },
                {
                    path: '/deviceClass',
                    component: resolve => require(['../components/page/device/deviceClass.vue'], resolve)
                },
                {
                    path: '/device',
                    component: resolve => require(['../components/page/device/device.vue'], resolve)
                },
                {
                    path: '/resolution',
                    component: resolve => require(['../components/page/device/resolution.vue'], resolve)
                },



                // 节目管理
                {
                    path: '/material',
                    component: resolve => require(['../components/page/program/material.vue'], resolve)
                },
                {
                    path: '/mission',
                    component: resolve => require(['../components/page/program/mission.vue'], resolve)
                },
                {
                    path: '/program',
                    component: resolve => require(['../components/page/program/program.vue'], resolve)
                },
                {
                    path: '/template',
                    component: resolve => require(['../components/page/program/template.vue'], resolve)
                },


                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },

                {
                    path: '/inform',
                    component: resolve => require(['../components/page/information.vue'], resolve)
                },
                {
                    path: '/ying',
                    component: resolve => require(['../components/page/ying.vue'], resolve)
                },
                {
                    path: '/changlu',
                    component: resolve => require(['../components/page/changlu.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
