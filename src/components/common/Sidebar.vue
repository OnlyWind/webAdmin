<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"
                 background-color="#324157"
                 text-color="#bfcbd9"
                 unique-opened router>
            <template v-for="item in itemss">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '0',
                        title: '企业管理',
                        subs: [
                            {
                                index: 'companyInfo',
                                title: '企业信息管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '5',
                        title: '系统设置',
                        subs: [
                            {
                                index: 'resolutionInfo',
                                title: '分辨率管理'
                            },
                            {
                                index: 'version',
                                title: '版本管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '1',
                        title: '设备管理',
                        subs: [
                            {
                                index: 'device',
                                title: '设备管理'
                            },
                            {
                                index: 'deviceClass',
                                title: '设备分类管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '节目管理',
                        subs: [
                            {
                                index: 'template',
                                title: '模板管理'
                            },
                            {
                                index: 'material',
                                title: '素材管理'
                            },
                            {
                                index: 'program',
                                title: '节目管理'
                            },
                            {
                                index: 'mission',
                                title: '任务管理'
                            },
                            {
                                index: 'subTask',
                                title: '附加任务'
                            },
                            {
                                index:'qrcode',
                                title:'二维码'
                            }
                        ]
                    }
                ],
                item1:[
                    {
                        icon: 'el-icon-menu',
                        index: '4',
                        title: 'item',
                        subs: [
                            {
                                index: 'inform',
                                title: 'inform'
                            },
                            {
                                index: 'ying',
                                title: 'ying'
                            },
                            {
                                index: 'changlu',
                                title: 'changlu'
                            },
                        ]

                    }
                ],
                itemss:[],
                value:''
            }
        },
        mounted(){
            setInterval(res=>{
                this.value = localStorage.getItem('value')
            },0)
        },
        created(){
            localStorage.setItem('value','广告信息发布系统')
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        watch:{
            value(curVal,oldVal){
                if (curVal=="广告信息发布系统") {
                    this.itemss = this.items
                    this.$router.push('/readme')
                }else{
                    this.itemss = this.item1
                    this.$router.push('/readme')
                }
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
