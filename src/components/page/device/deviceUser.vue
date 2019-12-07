<template>
    <div>
        <el-button type="primary" @click="generate">生成设备账号</el-button>
        <!--设备账号列表-->
        <el-table :data="userTable" border style="margin-top: 20px;width: 500px" stripe
                  :header-cell-style="{
                    'background-color': '#fafafa',
                    'color': 'black'
                    }"
        >
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="username" label="账号"  width="150"></el-table-column>
            <el-table-column prop="password" label="密码"  ></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {generateUAndPAjax} from "../../api/api";

    export default {
        data(){
            return{
                userTable:[]
            }
        },
        methods:{
            //生成设备账号
            generate(){
                generateUAndPAjax({amount:2}).then(res=>{
                    if (res.code == 0){
                        this.userTable = res.data
                        this.$message.success(res.message)
                    }  else {
                        this.$message.error(res.message)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
