<template>
    <div>
        <el-button type="primary" @click="addTask">添加任务</el-button>
        <el-input v-model="taskSearch" placeholder="输入任务名搜索" style="width: 220px;margin-left: 20px;"></el-input>
        <el-button type="primary" @click="searchTask">搜 索</el-button>
        <el-button type="warning"style="margin-left: 20px;" @click="resetTask">重 置</el-button>
        <el-table :data="tableData" border style="width:100%;margin-top: 20px;" ref="multipleTable" stripe
                  :header-cell-style="{
                    'background-color': '#fafafa',
                    'color': 'black'
                    }"
        >
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="programInfo.programName" label="节目名称"></el-table-column>
            <el-table-column prop="taskLevel" label="任务类型">
                <template scope="scope">
                    {{scope.row.taskLevel==2?'插播':'常规' }}
                </template>
            </el-table-column>
            <el-table-column prop="addTime" label="发布时间"></el-table-column>
            <el-table-column prop="runTime" label="播放时间"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination" style="margin-top: 20px;">
            <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!--发布任务弹窗-->
        <el-dialog title="添加任务" :visible.sync="addTaskDialogVisible" style="width: 100%;margin: 0 auto;">
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
                        placeholder="选择日期">
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
                    <el-select placeholder="设备名称" v-model="form.deviceIds"  style="width:220px;">
                        <el-option v-for="item in deviceNameList" :label="item.name" :value="item.index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择节目">
                    <el-select placeholder="节目名称" v-model="form.programId" @change="changeProgram" style="width:220px;">
                        <el-option v-for="item in programNameList"  :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTaskDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushTask">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {queryTaskAjax,addTaskAjax,deviceAjax,queryProgramAjax} from "../../api/api";

    export default {
        data(){
            return{
                deviceNameList:[],//选择设备的设备集合
                programNameList:[],//选择设备的设备集合
                addTaskDialogVisible:false,
                form:{
                    date1:null,
                    date2:null,
                    taskName:'',
                    runTime:'',
                    taskLevel:'',
                    runTimeLength:0,
                    programId:'',
                    deviceIds:'',
                    userId:localStorage.getItem('userId'),
                    realResolution:'270x480'  //先固定，后面会改动
                },
                disabled:true,
                tableData:[],
                total:0,
                currentPage:1,
                pageSize:10,
                taskSearch:''
            }
        },
        mounted(){
            this.getTask()
            //获取设备列表
            deviceAjax({unitId:localStorage.getItem('unitId'),pageNum:1,pageSize:10}).then(res=>{
                for (let i = 0; i <res.data.deviceList.length ; i++) {
                    this.deviceNameList.push({
                        name:res.data.deviceList[i].deviceName,
                        index:res.data.deviceList[i].deviceIdent
                    })
                }
            })
            //获取节目列表
            queryProgramAjax({userId:localStorage.getItem('userId'),pageNum:1,pageSize:100}).then(res=>{
                // this.programNameList
                if (res.data.programInfo.length){
                    for (let i = 0; i <res.data.programInfo.length ; i++) {
                        this.programNameList.push({
                            name:res.data.programInfo[i].programName,
                            id:res.data.programInfo[i].programId,
                            resolution:res.data.programInfo[i].templateInfo.resolution
                        })
                    }
                }
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
            //获取任务数据
            getTask(){
                let params = {
                    userId:localStorage.getItem('userId'),
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    taskName:this.taskSearch
                }
                queryTaskAjax(params).then(res=>{
                    if (res.code == 0){
                        this.total = res.data.total
                        this.tableData = res.data.taskList
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //分页页数改变时
            handleCurrentChange(val){
                this.currentPage = val
                console.log(this.currentPage)
                this.getTask()
            },
            //搜索任务
            searchTask(){
                this.getTask()
            },
            //重置搜索
            resetTask(){
                this.taskSearch = ''
                this.getTask()
            },
            //添加任务
            addTask(){
                this.addTaskDialogVisible = true
            },
            //选择节目时
            changeProgram(val){
                for (let i = 0; i < this.programNameList.length; i++) {
                    if (val == this.programNameList[i].id){
                        if ((this.programNameList[i].resolution)=='1080x1920') {
                            this.form.realResolution = '270x480'
                        }else if ((this.programNameList[i].resolution)=='1920x1080') {
                            this.form.realResolution = '480x270'
                        }
                    }
                }
            },
            //推送任务
            pushTask(){
                if (this.form.taskName == ''){
                    this.$message.error('请输入任务名')
                } else if (this.form.date1 ==null || this.form.date2 ==null){
                    this.$message.error('请选择播放日期和时间')
                } else if (this.form.taskLevel == ''){
                    this.$message.error('请选择播放级别')
                } else if (this.form.deviceIds == '') {
                    this.$message.error('请选择播放设备')
                } else if (this.form.programId == ''){
                    this.$message.error('请选择播放节目')
                } else {
                    let year = this.form.date1.slice(0,4)
                    let month = this.form.date2.getMonth()+1
                    let date = this.form.date2.getDate()
                    let time = this.form.date2.toString().slice(15,24)
                    this.form.runTime = year+'/'+month+'/'+date+time //获取正确时间格式
                    console.log(this.form.runTime)
                    let params = JSON.parse(JSON.stringify(this.form))
                    delete  params.date1 //删除多余属性
                    delete  params.date2 //删除多余属性
                    console.log(params)
                    addTaskAjax(params).then(res=>{
                        if (res.code==0){
                            this.form.taskName = '',
                            this.$message.success(res.message)
                            this.addTaskDialogVisible = false
                            this.getTask()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
