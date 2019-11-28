<template>
    <div>
        <!--<el-button type="primary" @click="add()">添加节目</el-button>-->
        <el-input v-model="searchText" style="width: 220px;margin-left: 50px;" placeholder="请输入节目单名"></el-input>
        <el-button type="primary" @click="search" style="margin-left: 10px;">搜 索</el-button>
        <el-button type="warning" @click="reset">重 置</el-button>
        <!--节目列表-->
        <el-table :data="tableData" border style="width: 100%;margin-top: 30px;" ref="multipleTable">
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="templateInfo.temName" label="模板名"></el-table-column>
            <el-table-column prop="programName" label="节目单"></el-table-column>
            <el-table-column prop="templateInfo.resolution" label="分辨率"></el-table-column>
            <el-table-column prop="addTime" label="添加时间"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="pushTask(scope.row)">发布</el-button>
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination" style="margin-top: 20px;">
            <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <!--添加节目弹窗-->
        <el-dialog title="添加节目" :visible.sync="programDialogVisible" style="width: 1200px;margin: 0 auto;">
            <el-select placeholder="请先选择模板" v-model="temName" @change="changeTemName" style="width:200px;">
                <el-option v-for="(item,index) in temNameList" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
            <span style="margin-left: 20px;">节目单名：</span>
            <el-input style="width: 220px;" placeholder="输入节目单名" v-model="programName"></el-input>

            <el-table :data="programView.viewList" border style="width: 800px;margin-top: 20px;" ref="multipleTable">
                <el-table-column type="index" label=" " width="55"></el-table-column>
                <el-table-column prop="viewName" label="控件名"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button size="small" type="primary"
                                   @click="handle(scope.row)">选择素材</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="programDialogVisible = false;">取 消</el-button>
                <el-button type="primary" @click="sendProgram">添加节目单</el-button>
            </div>
        </el-dialog>

        <!--修改节目弹窗-->
        <el-dialog title="编辑节目单" :visible.sync="editDialogVisible" style="width: 1100px;margin: 0 auto;">
            <el-input style="width: 220px;" placeholder="输入节目单名" v-model="editProgramName"></el-input>
            <el-button type="primary" @click="editProgName">修改节目单名</el-button>

            <el-table :data="updateList" border style="width: 800px;margin-top: 20px;" ref="multipleTable">
                <el-table-column type="index" label=" " width="55"></el-table-column>
                <el-table-column prop="infoTemplateViewInfo.viewName" label="控件名"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button size="small" type="primary"
                                   @click="handleUpdata(scope.row)">选择素材</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false;">取 消</el-button>
                <el-button type="primary" @click="sendUpdata">修改节目单</el-button>
            </div>
        </el-dialog>

        <!--选择素材弹窗-->
        <el-dialog title="选择素材" :visible.sync="materialDialogVisible" style="width: 100%;margin: 0 auto;">
            <el-table :data="resourcesList" border @selection-change="handleSelectionChange"> style="width: 800px;margin-top: 20px;" ref="multipleTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="fileName" label="文件名"></el-table-column>
                <el-table-column prop="resourceType" label="类型"></el-table-column>
                <el-table-column prop="resourceName" label="地址(或文字内容)"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="materialDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choose">选 择</el-button>
            </div>
        </el-dialog>



        <!--发布任务弹窗-->
        <el-dialog title="发布任务" :visible.sync="addTaskDialogVisible" style="width: 100%;margin: 0 auto;">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="任务名称">
                    <el-input placeholder="请输入任务名"  v-model="form.taskName" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-date-picker
                        v-model="form.date1"
                        align="right"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-time-picker
                        v-model="form.date2"
                        value="HH:mm:ss"
                        placeholder="选择时间点">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="播放级别">
                    <el-select placeholder="播放级别" v-model="form.taskLevel" @change="changeLevel" style="width:220px;">
                        <el-option label="常规" value="1"></el-option>
                        <el-option label="插播" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="播放时长">
                    <el-input v-model="form.runTimeLength" style="width: 220px;" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="选择设备">
                    <el-select placeholder="设备名称" v-model="form.deviceIds" @change="changeDevice" style="width:220px;">
                        <el-option v-for="item in deviceNameList" :label="item.name" :value="item.index"></el-option>
                    </el-select>
                </el-form-item>
                <!--runTimeLength-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTaskDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendTask">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        queryProgramAjax,
        addProgramAjax,
        delProgramAjax,
        updateProgramAjax,
        updateProgramListAjax,
        queryTemplateAjax,
        queryresourcesAjax,
        addTaskAjax,
        deviceAjax
    } from "../../api/api";

    export default {
        data(){
            return{
                deviceNameList:[],
                disabled:true,
                form:{
                    date1:null,
                    date2:null,
                    taskName:'',
                    runTime:'',
                    taskLevel:'',
                    runTimeLength:'',
                    programId:'',
                    deviceIds:'',
                    userId:localStorage.getItem('userId'),
                },
                addTaskDialogVisible:false,
                resourceIds:'',
                programListId:0,
                updateList:[],//修改页面的控件列表
                programId:'',//节目单id
                editProgramName:'',
                infoProgramList:[],//添加节目的数组参数
                infoProgramListString:[],//修改节目的数组参数
                resourceIdList:[],//素材id集合
                chooseTemplateId:0,//选择的控件id
                resourcesList:[],
                temName:'',
                temList:[],
                filterList:[],
                temNameList:[],
                programName:'',
                programView:{},
                editDialogVisible:false,
                programDialogVisible:false,
                materialDialogVisible:false,
                dialogVisible:false,
                tableData:[],
                total:0,
                searchText:'',
                userId:localStorage.getItem('userId'),
                currentPage:1,
                pageSize: 10,
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                }
            }
        },
        mounted(){
            this.getTableData()
            deviceAjax({unitId:localStorage.getItem('unitId'),pageNum:1,pageSize:10}).then(res=>{
                for (let i = 0; i <res.data.deviceList.length ; i++) {
                    this.deviceNameList.push({
                        name:res.data.deviceList[i].deviceName,
                        index:res.data.deviceList[i].deviceIdent
                    })
                }
                console.log(this.deviceNameList)
            })
        },
        methods:{
            //改变播放级别
            changeLevel(val){
                this.form.taskLevel = val
                if (val == 1){
                    this.disabled = true
                } else {
                    this.disabled = false
                }
            },
            //改变设备
            changeDevice(val){
                console.log(val)
            },
            //推送任务
            pushTask(row){
                this.form.programId = row.programId
                this.addTaskDialogVisible = true
            },
            sendTask(){
                let year = this.form.date1.getFullYear()
                let month = this.form.date1.getMonth()+1
                let date = this.form.date1.getDate()
                let time = this.form.date2.toString().slice(15,24)
                // console.log(this.form.date2.toString().slice(15,24))
                this.form.runTime = year+'/'+month+'/'+date+time
                delete  this.form.date1
                delete  this.form.date2
                addTaskAjax(this.form).then(res=>{
                    if (res.code==0){
                        this.form.taskName = '',
                        this.$message.success(res.message)
                        this.addTaskDialogVisible = false
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //调起编辑节目弹窗
            handleEdit(res){
                this.infoProgramList = []
                this.editProgramName = ''
                this.programId = res.programId
                this.updateList = res.infoProgramList
                this.editDialogVisible = true
            },
            //修改节目单名
            editProgName(){
                if (this.editProgramName){
                    updateProgramAjax({programId:this.programId,programName:this.editProgramName}).then(res=>{
                        if (res.code==0){
                            this.$message.success(res.message)
                            this.getTableData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.$message.error('请输入节目单名')
                }
            },
            //提交修改节目单
            sendUpdata(){
                updateProgramListAjax({infoProgramListString:JSON.stringify(this.infoProgramListString)}).then(res=>{
                    if (res.code==0){
                        this.editDialogVisible = false
                        this.$message.success(res.message)
                        this.getTableData()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //调起添加节目弹窗
            add(){
                this.temNameList = []
                queryTemplateAjax({userId:this.userId,pageSize:10,pageNum:1}).then(res=>{//先获取模板信息
                    if (res.code == 0){
                        this.temList = res.data.templateList
                        for (let i = 0; i <this.temList.length ; i++) {
                            this.temNameList.push(this.temList[i].temName)
                        }
                        this.templateName = ''
                        this.programDialogVisible = true
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //添加节目选择素材按钮
            handle(row){
                this.chooseTemplateId = row.temviewId//选择的控件id
                let queryParams = {
                    userId:this.userId,
                    pageSize:100,
                    pageNum:1,
                    resourceType:''
                }
                if (row.viewId==1){
                    queryParams.resourceType = '视频'
                } else if (row.viewId==2){
                    queryParams.resourceType = '图片'
                } else if (row.viewId==3){
                    queryParams.resourceType = '文字'
                }
                queryresourcesAjax(queryParams).then(res=>{
                    if (res.code==0){
                        this.resourcesList = res.data.resourcesList
                    } else {
                        this.$message.error(res.message)
                    }
                })
                this.materialDialogVisible = true
            },
            //修改页面选择素材
            handleUpdata(row){
                this.programListId = row.programListId
                console.log(row)
                let queryParams = {
                    userId:this.userId,
                    pageSize:100,
                    pageNum:1,
                    resourceType:''
                }
                if (row.infoTemplateViewInfo.viewId==1){
                    queryParams.resourceType = '视频'
                } else if (row.infoTemplateViewInfo.viewId==2){
                    queryParams.resourceType = '图片'
                } else if (row.infoTemplateViewInfo.viewId==3){
                    queryParams.resourceType = '文字'
                }
                queryresourcesAjax(queryParams).then(res=>{
                    if (res.code==0){
                        this.resourcesList = res.data.resourcesList
                    } else {
                        this.$message.error(res.message)
                    }
                })
                this.materialDialogVisible = true
            },
            //选择模板名
            changeTemName(val){
                this.filterList = this.temList.filter(item=>item.temName===val)
                this.programView = this.filterList[0]
            },
            //提交节目单
            sendProgram(){
                if (this.programName && this.temName) {
                    if (this.infoProgramList.length) {
                        let sendParams = {
                            userId:this.userId,
                            programName:this.programName,
                            templateId:this.programView.templateId,
                            infoProgramListString:JSON.stringify(this.infoProgramList)
                        }
                        addProgramAjax(sendParams).then(res=>{
                            if (res.code == 0){
                                this.programName = ''
                                this.programDialogVisible = false
                                this.infoProgramList = []//提交成功后清空素材集合
                                this.$message.success(res.message)
                                this.getTableData()
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }else{
                        this.$message.error('请选择素材!')
                    }
                }else{
                    this.$message.error('请选择模板名和输入节目名')
                }
            },
            //多选素材改变时
            handleSelectionChange(val){
                this.resourceIdList = []
                for (let j = 0; j < val.length; j++) {
                    this.resourceIdList.push(val[j].resourceId)
                }
            },
            //确认素材按钮
            choose(){
                this.resourceIds = ''
                let length = 0
                let num = 0
                let length1 = 0
                let num1 = 0
                if (this.resourceIdList.length){
                        for (let j = 0; j <this.resourceIdList.length ; j++) {
                            this.infoProgramList.push({
                                temviewId:this.chooseTemplateId,
                                resourceIds:this.resourceIdList[j]
                            })
                            this.infoProgramListString.push({
                                resourceIds:this.resourceIdList[j],
                                programListId:this.programListId
                            })
                        }
                        this.resourceIdList = []
                        this.materialDialogVisible = false
                        this.$message.success('选择成功！')
                        console.log(this.infoProgramList)
                        console.log(this.infoProgramListString)
                    } else {
                        this.$message.error('请选择素材')
                    }
                // if (this.resourceIdList.length){
                //     for (let j = 0; j <this.resourceIdList.length ; j++) {
                //         this.resourceIds += this.resourceIdList[j]+','  //素材文件名集合
                //     }
                //     if (this.infoProgramList.length) {
                //         length = this.infoProgramList.length
                //         for (let n = 0; n <length ; n++) {
                //             if (this.infoProgramList[n].temviewId*1 == this.chooseTemplateId*1){//先判断有无相同控件
                //                 num = 1
                //                 this.infoProgramList[n] = {//有相同控件就覆盖
                //                     temviewId:this.chooseTemplateId,
                //                     resourceIds:this.resourceIds.slice(0,-1)
                //                 }
                //             }
                //         }
                //         for (let n = 0; n <length ; n++) {
                //             if (this.infoProgramList[n].temviewId*1 != this.chooseTemplateId*1){
                //                 if (num==0) {
                //                     num = 1
                //                     this.infoProgramList.push({
                //                         temviewId:this.chooseTemplateId    ,
                //                         resourceIds:this.resourceIds.slice(0,-1)
                //                     })
                //                 }
                //             }
                //         }
                //     } else {
                //         this.infoProgramList.push({
                //             temviewId:this.chooseTemplateId,
                //             resourceIds:this.resourceIds.slice(0,-1)
                //         })
                //     }
                //
                //     if (this.infoProgramListString.length) {
                //         length1 = this.infoProgramListString.length
                //         for (let n = 0; n <length1 ; n++) {
                //             if (this.infoProgramListString[n].temviewId*1 == this.chooseTemplateId*1){//先判断有无相同控件
                //                 num1 = 1
                //                 console.log('覆盖')
                //                 this.infoProgramListString[n] = {//有相同控件就覆盖
                //                     programListId:this.programListId,
                //                     resourceIds:this.resourceIds.slice(0,-1)
                //                 }
                //             }
                //         }
                //         for (let n = 0; n <length ; n++) {
                //             if (this.infoProgramListString[n].temviewId*1 != this.chooseTemplateId*1){
                //                 if (num1==0) {
                //                     console.log('添加')
                //                     num1 = 1
                //                     this.infoProgramListString.push({
                //                         programListId:this.programListId    ,
                //                         resourceIds:this.resourceIds.slice(0,-1)
                //                     })
                //                 }
                //             }
                //         }
                //     } else {
                //         console.log(1)
                //         this.infoProgramListString.push({
                //             programListId:this.programListId,
                //             resourceIds:this.resourceIds.slice(0,-1)
                //         })
                //     }
                //
                //
                //
                //     // for (let j = 0; j <this.resourceIdList.length ; j++) {
                //     //     this.infoProgramList.push({
                //     //         temviewId:this.chooseTemplateId,
                //     //         resourceIds:this.resourceIdList[j]
                //     //     })
                //     //     this.infoProgramListString.push({
                //     //         resourceIds:this.resourceIdList[j],
                //     //         programListId:this.programListId
                //     //     })
                //     // }
                //     this.resourceIdList = []
                //     this.materialDialogVisible = false
                //     this.$message.success('选择成功！')
                //     // console.log(this.infoProgramList)
                //     console.log(this.infoProgramListString)
                // } else {
                //     this.$message.error('请选择素材')
                // }
            },
            //删除节目
            handleDelete(res){
                let programId = res.programId
                delProgramAjax({programId}).then(res=>{
                    if (res.code==0){
                        this.$message.success(res.message)
                        this.getTableData()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //获取节目表格数据
            getTableData(){
                let params = {
                    userId:localStorage.getItem('userId'),
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    programName:this.searchText
                }
                queryProgramAjax(params).then(res=>{//查询节目
                    if (res.code == 0){
                        this.total = res.data.total
                        this.tableData = res.data.programInfo
                    }
                })
            },
            //搜索节目
            search(){
                this.getTableData()
            },
            //重置搜索
            reset(){
                this.searchText = null
                this.getTableData()
            },
            //改变页数
            handleCurrentChange(val){
                this.currentPage = val
                this.getTableData()
            }
        }
    }
</script>

<style scoped>

</style>
