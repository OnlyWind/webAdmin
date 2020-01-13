<template>
    <div>
        <div>
            <el-button type="primary" @click="addVersion" style="margin-bottom: 25px;margin-right: 40%;">上传新版本</el-button>
            <el-select v-model="postData.versionType" placeholder="请选择设备分类">
                <el-option :value="1" label="广告机"></el-option>
                <el-option :value="2" label="慧选未来"></el-option>
            </el-select>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <!--版本信息表格-->
        <el-table stripe :data="tableData" border  ref="multipleTable"
                  :header-cell-style="{
                    'background-color': '#fafafa',
                    'color': 'black'
                    }"
        >
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="version" label="版本号" width="100"></el-table-column>
            <el-table-column prop="versionDescript" label="版本说明" ></el-table-column>
            <el-table-column prop="versionPath" label="版本连接"></el-table-column>
            <el-table-column prop="versionType" label="设备类型">
                <template scope = 'scope'>
                    {{scope.row.versionType == 1?'广告机':'慧选未来'}}
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination">
            <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :page-size="postData.pageSize"
                           @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!--添加新版本弹窗-->
        <el-dialog :visible.sync="dialogVisible" title="提示" style="width: 70%; margin: 0 auto;">
            <el-form :model="formData">
                <el-form-item label="设备分类">
                    <el-select v-model="formData.versionType" placeholder="请选择设备分类">
                        <el-option :value="1" label="广告机"></el-option>
                        <el-option :value="2" label="慧选未来"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版 本 号">
                    <el-input v-model="formData.version1" oninput ="value=value.replace(/[^\d]/g,'')" :maxlength="1" style="width: 50px;margin-left: 5px;"></el-input>.
                    <el-input v-model="formData.version2" oninput ="value=value.replace(/[^\d]/g,'')" :maxlength="1" style="width: 50px;"></el-input>.
                    <el-input v-model="formData.version3" oninput ="value=value.replace(/[^\d]/g,'')" :maxlength="2" style="width: 50px;"></el-input>
                </el-form-item>
                <el-form-item label="说明备注">
                    <el-input v-model="formData.versionDescript" style="width: 300px;" placeholder="说明备注"></el-input>
                </el-form-item>
                <el-form-item label="上传链接">
                    <el-input v-model="formData.versionPath" style="width: 300px;" placeholder="上传链接"></el-input>
                </el-form-item>

                <el-upload
                    :data="qiniuData"
                    :before-upload="beforeUpFile"
                    :on-success="onsuccess"
                    class="upload-demo"
                    action="http://upload-z2.qiniup.com"
                    :file-list="fileList"
                    list-type>
                    <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewVersion">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {newVersionAjax,queryVersionAjax,getUpTokenAjax} from "../../api/api";
    export default {
        data(){
            return{
                fileList:[],
                tableData:[],
                total:0,
                dialogVisible:false,
                postData:{
                    pageNum:1,
                    pageSize:10,

                },
                formData:{//上传表单数据
                    version1:'',
                    version2:'',
                    version3:'',
                    versionType:null,//设备类型
                    versionDescript:'',//版本说明
                    versionPath:'',//上传链接
                },
                qiniuData: {//七牛上传的参数
                    key: "",
                    token: ""
                },
            }
        },
        mounted(){
            this.getVersionList()
            this.getQiniuToken()
        },
        methods:{
            //获取七牛token
            getQiniuToken(){
                getUpTokenAjax().then(res=>{
                    this.qiniuData.token = res
                })
            },
            //获取版本列表数据
            getVersionList(){
                queryVersionAjax(this.postData).then(res=>{
                    if (res.code==0){
                        this.tableData = res.data.VersionList
                        this.total = res.data.total
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //分页
            handleCurrentChange(val){
                this.postData.pageNum = val
                this.getVersionList()
            },
            //上传前
            beforeUpFile(file){
                this.qiniuData.key = file.name;
            },
            //上传成功后
            onsuccess(res){
                this.formData.versionPath = 'http://resource.jzit168.com/'+res.key
            },
            search(){
                this.getVersionList()
            },
            //启用弹窗
            addVersion(){
                this.dialogVisible = true
            },
            //提交上传版本
            addNewVersion(){
                //表单验证
                if (this.formData.versionType==null) {
                    this.$message.error('请选择设备分类!')
                } else if (this.formData.version1=='' || this.formData.version2=='') {
                    this.$message.error('请输入版本号!')
                } else if (this.formData.version3==''){
                    this.$message.error('请输入版本号!')
                } else if (this.formData.versionPath == ''){
                    this.$message.error('请选择文件或输入上传链接!')
                }else{
                    this.formData.version = this.formData.version1+'.'+this.formData.version2+'.'+this.formData.version3
                    //复制表单元素，不影响表单
                    let params = JSON.parse(JSON.stringify(this.formData))
                    delete params.version1
                    delete params.version2
                    delete params.version3
                    newVersionAjax(params).then(res=>{
                        if (res.code==0){
                            this.$message.success(res.message)
                            //上传成功后刷新表格
                            this.getVersionList()
                            this.dialogVisible = false
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>
