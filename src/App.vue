<template>
    <div id="app">
        <router-view ></router-view>
    </div>
</template>
<script>
    // export default {
    //     name: 'App',
    //     provide() {
    //         return {
    //             reload: this.reload//调用reload方法
    //         }
    //     },
    //     data() {
    //         return {
    //             isRouterAlive: true//一开始router-view为true
    //         }
    //     },
    //
    //     methods: {
    //         reload() {
    //             this.isRouterAlive = false
    //             //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
    //             this.$nextTick(() => {
    //                 this.isRouterAlive = true
    //             })
    //         }
    //     }
    // }
</script>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/

    .el-table__body-wrapper{
        overflow-y: hidden !important;
    }
    .el-dialog__wrapper::-webkit-scrollbar {
        display: none;
    }
    .el-button [class*=el-icon-]+span{
        margin-left: 0;
    }
    .el-dialog {
        position: relative;
        margin: 0 auto 50px;
        border-radius: 2px;
        -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        box-sizing: border-box;
        width: 50%;
        overflow: auto;
        overflow-y:hidden !important;
    }
</style>
