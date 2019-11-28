<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="header-router">
            <ul>
                <li class="hearders active" @click="c1">信发系统</li>
                <!--<li class="hearders" @click="c2">鹰智荟</li>-->
                <!--<li class="hearders" @click="c3">长鹿家园</li>-->
            </ul>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">注    销</el-dropdown-item>
                    <el-dropdown-item command="updatapw">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="width: 70%;margin: 0 auto">
            <el-form :model="forms" label-width="120px" style="margin-left: -50px;" :rules="setFormRules" ref="setPassword">
                <el-form-item label="旧密码" prop='oldPassword'>
                    <el-input v-model="forms.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop='newPassword'>
                    <el-input v-model="forms.newPassword" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="send">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {logoutAjax,setPasswordAjax} from '../api/api'
    export default {
        data() {
            return {
                dialogFormVisible:false,
                name: '',
                value:'',
                forms:{
                    oldPassword:'',
                    newPassword:'',
                    type:1,
                    platformType:1
                },
                setFormRules:{
                    oldPassword: [{required: true,message: '旧密码不能为空',trigger: 'blur'}],
                    newPassword: [{required: true,message: '新密码不能为空',trigger: 'blur'}]
                },
                dom:document.getElementsByClassName('hearders')
            }
        },
        computed: {
            username() {
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods: {
            handleCommand(command) {
                //注销
                if (command == 'loginout') {
                    localStorage.removeItem('ms_username');
                    logoutAjax().then(res=>{
                       if(res.code == 0) {
                           this.$message.success(res.message)
                           this.$router.push('/')
                           localStorage.removeItem('access_token')
                       }else{
                           this.$message.warning(res.message)
                       }
                    }).catch(res=>{
                        if (res){
                            this.$message.success('注销成功')
                            this.$router.push('/')
                            localStorage.removeItem('access_token')
                        }
                    });
                }else if (command == 'updatapw') {
                    this.dialogFormVisible = true
                }
            },

            //修改密码
            send(){
                setPasswordAjax(this.forms).then(res=>{
                    if (res.code == 0){
                        this.$message.success(res.message)
                        this.dialogFormVisible = false
                    }else{
                        this.$message.warning(res.message)
                    }
                }).catch(res=>{
                    this.$message.error('登录超时，重新登录！')
                    this.$router.push('/')
                    localStorage.removeItem('access_token')
                })
            },

            c1(){
                for (var i = 0; i <this.dom.length ; i++) {
                    this.dom[i].classList.remove('active')
                }
                this.dom[0].classList.add('active')
                this.value = '广告信息发布系统'
                localStorage.setItem('value',this.value)
            },
            // c2(){
            //     for (var i = 0; i <this.dom.length ; i++) {
            //         this.dom[i].classList.remove('active')
            //     }
            //     this.dom[1].classList.add('active')
            //     this.value = '鹰智荟'
            //     localStorage.setItem('value',this.value)
            // },
            // c3(){
            //     for (var i = 0; i <this.dom.length ; i++) {
            //         this.dom[i].classList.remove('active')
            //     }
            //     this.dom[2].classList.add('active')
            //     this.value = '长鹿家园'
            //     localStorage.setItem('value',this.value)
            // }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }

    .header-router {
        margin-left: 100px;
        display: inline-block;
    }
    .header-router ul{
        list-style: none;
    }
    .header-router li{
        float: left;
        margin-left:20px;
        cursor: pointer;
    }

    .active {
        margin-left: 20px;
        color: #20a0ff;
    }

    .header .logo {
        float: left;
        width: 250px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
