<template>
    <div>
        <el-button type="primary" @click="query">更换二维码</el-button>

        <div style="margin-top: 30px;">
            <el-col>
                <el-card shadow="hover">
                    <img :src="src">
                </el-card>
            </el-col>
        </div>

        <!--更换二维码弹窗-->
        <el-dialog title="更换二维码" :visible.sync="dialogFormQM">
            <el-form :model="form">
                <el-upload
                    ref="upload"
                    :data="qiniuData"
                    :before-upload="beforeUpFile"
                    :on-success="onsuccess"
                    :show-file-list="false"
                    :file-list="fileList"
                    class="upload-demo"
                    action="http://upload-z2.qiniup.com"
                    list-type="picture">
                    <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
                <img :src="upSrc" style="width: 300px;margin-top: 20px;">
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormQM = false">取 消</el-button>
                <el-button type="primary" @click="queryCode">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getUpTokenAjax,selectQuickMarkAjax,addresourcesAjax} from "../../api/api";

    export default {
        data(){
            return {
                fileList:[],
                dialogFormQM:false,
                qiniuData:{
                    token:'',
                    key:''
                },
                form:{
                    userId:localStorage.getItem('userId'),
                    infoResourcesListString:[{
                        resourceName:'',
                        resourceType:'二维码',
                        fileName:''
                    }]
                },
                src:'',
                upSrc:''
            }
        },
        mounted() {
            this.getQuickMark()
            //获取七牛token
            getUpTokenAjax().then(res=>{
                this.qiniuData.token = res
            })
        },
        methods:{
            //获取二维码
            getQuickMark(){
                selectQuickMarkAjax({
                    userId:localStorage.getItem('userId'),
                }).then(res=>{
                    if (res.code == 0){
                        this.src = res.data.resourceName
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            //弹窗
            query(){
                this.dialogFormQM = true
                this.upSrc = ''
            },
            //更换二维码
            queryCode(){
                this.form.infoResourcesListString = JSON.stringify(this.form.infoResourcesListString)
                addresourcesAjax(this.form).then(res=>{
                    if (res.code == 0){
                        this.dialogFormQM = false
                        this.getQuickMark()
                        this.$message.success(res.message)
                        this.form.infoResourcesListString = JSON.parse(this.form.infoResourcesListString)
                        console.log(this.form.infoResourcesListString)
                        this.form.infoResourcesListString = [{//清空二维码
                            resourceName:'',
                            resourceType:'二维码',
                            fileName:''
                        }]
                        this.$refs.upload.clearFiles() //清空上传组件的文件列表

                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //二维码上传前
            beforeUpFile(file){
                this.qiniuData.key = file.name;
            },
            //二维码上传成功后
            onsuccess(res){
                this.form.infoResourcesListString[0].resourceName = 'http://resource.jzit168.com/'+res.key
                this.upSrc = 'http://resource.jzit168.com/'+res.key
                this.form.infoResourcesListString[0].fileName = res.key
            },
        }
    }
</script>

<style scoped>

</style>
