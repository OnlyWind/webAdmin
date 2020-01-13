<template>
    <div>
        <el-form ref="postData" inline :model="postData" label-width="100px">
            <el-button type="primary" @click="addPropaganda">添加宣传任务</el-button>
            <el-button type="primary" @click="addVoice">添加语音任务</el-button>

            <el-form-item label="任务名称" style="margin-left: 100px;">
                <el-input v-model="postData.subTaskName" placeholder="输入任务名称"></el-input>
            </el-form-item>

            <el-form-item label="任务类型">
                <el-select v-model="postData.subTaskType"  placeholder="请选择任务类型">
                    <el-option  label="全部" value=" "></el-option>
                    <el-option  label="宣传画面" :value="1"></el-option>
                    <el-option  label="开仓语音" :value="2"></el-option>
                    <el-option  label="溢满语音" :value="3"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="margin-left: 20px;">
                <el-button type="primary" @click="onSearch">搜 索</el-button>
            </el-form-item>
        </el-form>
        <!--附加任务表格-->
        <el-table :data="tableData" border
                  :header-cell-style="{
                    'background-color': '#fafafa',
                    'color': 'black'
                  }">
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="subTaskName" label="任务名称" width="180"></el-table-column>
            <el-table-column prop="addTime" label="添加时间" width="180"></el-table-column>
            <el-table-column prop="resourceType" label="素材类型" width="180">
                <template scope="scope">
                    {{scope.row.resourceType == 1?'视频':scope.row.resourceType == 2?'图片':'语音'}}
                </template>
            </el-table-column>
            <el-table-column prop="resources" label="素材内容"></el-table-column>
            <el-table-column prop="subTaskType" label="任务分类">
                <template scope="scope">
                    {{scope.row.subTaskType == 1?'宣传画面':scope.row.subTaskType == 2?'开仓语音':'溢满语音'}}
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination">
            <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :page-size="postData.pageSize"
                           @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!--添加宣传任务弹窗-->
        <el-dialog title="添加宣传任务" :visible.sync="dialogFormPG">
            <el-form :model="form">
                <el-form-item label="任务名称">
                    <el-input v-model="form.subTaskName" style="width: 450px;" autocomplete="off" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item label="素材类型">
                    <el-select v-model="form.resourceType" placeholder="请选择任务类型" style="width: 450px;">
                        <el-option  label="图片" :value="2" selected></el-option>
                        <el-option  label="视频" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="素材连接">
                    <el-input v-model="form.resources" style="width: 450px;" autocomplete="off" placeholder="请输入素材链接或上传文件"></el-input>
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
                <el-button @click="dialogFormPG = false">取 消</el-button>
                <el-button type="primary" @click="upPropaganda">确 定</el-button>
            </div>
        </el-dialog>
        <!--添加语音任务-->
        <el-dialog title="添加语音任务" :visible.sync="dialogFormVC">
            <el-form :model="formVC">
                <el-form-item label="任务名称">
                    <el-input v-model="formVC.subTaskName" style="width: 450px;" autocomplete="off" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item label="任务类型">
                    <el-select v-model="formVC.subTaskType" placeholder="请选择任务类型" style="width: 450px;">
                        <el-option  label="开仓时语言播报" :value="2"></el-option>
                        <el-option  label="垃圾满溢语音播报" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语音内容">
                    <el-input v-model="formVC.resources" style="width: 450px;" autocomplete="off" placeholder="请输入语音内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVC = false">取 消</el-button>
                <el-button type="primary" @click="upVoice">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {querySubTaskAjax,addSubTaskAjax,getUpTokenAjax} from '../../api/api'
    export default {
        data(){
            return {
                fileList:[],
                dialogFormPG:false,
                dialogFormVC:false,
                tableData:[],
                total:0,
                postData:{
                    pageSize:10,
                    pageNum:1,
                    userId:localStorage.getItem('userId'),
                    subTaskName:null,
                    subTaskType:null
                },
                form:{
                    resources:'',
                    userId:localStorage.getItem('userId'),
                    subTaskName:'',
                    resourceType:2,
                    subTaskType:1
                },
                formVC:{
                    resources:'',
                    userId:localStorage.getItem('userId'),
                    subTaskName:'',
                    resourceType:3,
                    subTaskType:''
                },
                qiniuData: {//七牛上传的参数
                    key: "",
                    token: ""
                },
            }
        },
        mounted(){
            this.getSubTaskData()
            //获取七牛token
            getUpTokenAjax().then(res=>{
                this.qiniuData.token = res
            })
        },
        methods:{
            //获取附加任务列表
            getSubTaskData(){
                querySubTaskAjax(this.postData).then(res=>{
                    this.total = res.data.total
                    this.tableData = res.data.subTaskList
                })
            },
            //分页
            handleCurrentChange(val){
                this.postData.pageNum = val
                this.getSubTaskData()
            },
            //搜索
            onSearch(){
                this.getSubTaskData()
            },
            //添加宣传任务
            upPropaganda(){
                if (!this.form.subTaskName){
                    this.$message.error('请输入任务名称')
                }else if (!this.form.resourceType) {
                    this.$message.error('请选择素材类型')
                }else if (!this.form.resources) {
                    this.$message.error('请输入素材链接或上传素材')
                }else {
                    addSubTaskAjax(this.form).then(res=>{
                        if (res.code == 0){
                            this.dialogFormPG = false
                            this.getSubTaskData()
                            this.$message.success(res.message)
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }

            },
            addPropaganda(){
                this.dialogFormPG = true
            },
            //添加语音任务
            upVoice(){
                if (!this.formVC.subTaskName){
                    this.$message.error('请输入任务名称')
                }else if (!this.formVC.subTaskType) {
                    this.$message.error('请选择任务类型')
                }else if (!this.formVC.resources) {
                    this.$message.error('请输入语音内容')
                }else{
                    addSubTaskAjax(this.formVC).then(res=>{
                        if (res.code == 0){
                            this.dialogFormVC = false
                            this.getSubTaskData()
                            this.$message.success(res.message)
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }

            },
            addVoice(){
                this.dialogFormVC = true
            },
            //上传前
            beforeUpFile(file){
                this.qiniuData.key = file.name;
            },
            //上传成功后
            onsuccess(res){
                this.form.resources = 'http://resource.jzit168.com/'+res.key
            },
        }
    }
</script>

<style scoped>

</style>
