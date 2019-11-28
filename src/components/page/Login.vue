<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.phoneNumber" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {loginAjax,refreshTokenAjax} from "../api/api";

    export default {
        data: function(){
            return {
                ruleForm: {
                    phoneNumber: 'admin1',
                    password: '123456',
                    type:1,
                    deviceType:2,
                    applicationType:2
                },
                rules: {
                    phoneNumber: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        //发送登录请求
                        loginAjax(that.ruleForm).then(res=>{
                            if (res.code==0){
                                localStorage.setItem('ms_username',that.ruleForm.phoneNumber);
                                localStorage.setItem('userId',res.data.id);
                                this.$message.success('登录成功');

                                //登录成功后刷新token
                                // refreshTokenAjax({refresh_token:res.data.refresh_token}).then(res=>{
                                //     localStorage.setItem('access_token',res.data.access_token);
                                //     this.$router.push('/readme');
                                // });

                                //test
                                localStorage.setItem('access_token',res.data.access_token);
                                this.$router.push('/readme');

                            } else {
                                this.$message.error(res.message)
                            }
                        }).catch(res=>{
                            let str = res.toString()
                            this.$message.error(str)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url("/static/img/Frostedglass.jpg");
        background-size: cover;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
