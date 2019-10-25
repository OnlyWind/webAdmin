<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="header-router">
            <ul>
                <li class="hearders active" @click="c1">广告信息发布系统</li>
                <li class="hearders" @click="c2">鹰智荟</li>
                <li class="hearders" @click="c3">长鹿家园</li>
            </ul>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'linxin',
                value:'',
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
                if (command == 'loginout') {
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            c1(){
                for (var i = 0; i <this.dom.length ; i++) {
                    this.dom[i].classList.remove('active')
                }
                this.dom[0].classList.add('active')
                this.value = '广告信息发布系统'
                localStorage.setItem('value',this.value)
            },
            c2(){
                for (var i = 0; i <this.dom.length ; i++) {
                    this.dom[i].classList.remove('active')
                }
                this.dom[1].classList.add('active')
                this.value = '鹰智荟'
                localStorage.setItem('value',this.value)
            },
            c3(){
                for (var i = 0; i <this.dom.length ; i++) {
                    this.dom[i].classList.remove('active')
                }
                this.dom[2].classList.add('active')
                this.value = '长鹿家园'
                localStorage.setItem('value',this.value)
            }
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
