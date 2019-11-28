<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    // if (this.resourceIdList.length){
    //     for (let j = 0; j <this.resourceIdList.length ; j++) {
    //         this.infoProgramList.push({
    //             temviewId:this.chooseTemplateId,
    //             resourceIds:this.resourceIdList[j]
    //         })
    //         this.infoProgramListString.push({
    //             resourceIds:this.resourceIdList[j],
    //             programListId:this.programListId
    //         })
    //     }
    //     this.resourceIdList = []
    //     this.materialDialogVisible = false
    //     this.$message.success('选择成功！')
    //     console.log(this.infoProgramList)
    //     console.log(this.infoProgramListString)
    // } else {
    //     this.$message.error('请选择素材')
    // }
</script>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/

    .el-table__body-wrapper{
        overflow-y: hidden !important;
    }
    .el-button [class*=el-icon-]+span{
        margin-left: 0;
    }
</style>
