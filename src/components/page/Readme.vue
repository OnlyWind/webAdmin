<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>首页</h3>
            <article>
                <h1>信发系统使用说明</h1>
                <h2>前言</h2>
                <p>信发系统是一个可以添加修改模板的后台网站，你可以编辑和发布自己的节目任务</p>
                <p>主要功能：添加编辑模板、添加素材、添加编辑节目、发布编辑任务、版本升级</p>
                <h2>使用过程</h2>
                <el-checkbox disabled checked>新用户先绑定企业，一个账号只能绑定一个企业</el-checkbox>
                <br>
                <el-checkbox disabled checked>绑定企业后，根据企业绑定的设备，你可以修改设备信息，分辨率等</el-checkbox>
                <br>
                <el-checkbox disabled checked>绑定企业后，可以进行节目管理（模板管理、素材管理、节目管理、任务管理、附加任务、二维码）</el-checkbox>
                <br>
                <el-checkbox disabled checked>模板管理：添加模板，可以自定义各种图片，视频，文字控件，也可以编辑模板的内容</el-checkbox>
                <br>
                <el-checkbox disabled checked>素材管理：可添加图片、视频、文字素材，可删除素材</el-checkbox>
                <br>
                <el-checkbox disabled checked>节目管理：可编辑节目，可以发布任务</el-checkbox>
                <br>
                <el-checkbox disabled checked>任务管理：可直接发布任务，可查看发布的任务信息</el-checkbox>
                <br>
                <el-checkbox disabled checked>附加任务、二维码：红外任务的添加、二维码的更换</el-checkbox>
                <br>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
