<template>
    <div>
        <!--<el-button type="primary" @click="addTask">添加任务</el-button>-->
        <el-input v-model="taskSearch" placeholder="输入任务名搜索" style="width: 220px;margin-left: 20px;"></el-input>
        <el-button type="primary" @click="searchTask">搜 索</el-button>
        <el-button type="warning"style="margin-left: 20px;" @click="resetTask">重 置</el-button>
        <el-table :data="tableData" border style="width:100%;margin-top: 20px;" ref="multipleTable">
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="addTime" label="发布时间"></el-table-column>
            <el-table-column prop="programInfo.programName" label="节目名称"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination" style="margin-top: 20px;">
            <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!--发布任务弹窗-->
        <el-dialog title="选择素材" :visible.sync="addTaskDialogVisible" style="width: 100%;margin: 0 auto;">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="任务名称">
                    <el-input v-model="form.taskName" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="播放时间">
                    <el-input v-model="form.runTime" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="播放级别">
                    <el-input v-model="form.taskLevel" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="播放时长">
                    <el-input v-model="form.runTimeLength" style="width: 220px;"></el-input>
                </el-form-item>
                <!--runTimeLength-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTaskDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushTask">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {queryTaskAjax,addTaskAjax,pushTaskAjax,deviceAjax} from "../../api/api";

    export default {
        data(){
            return{
                addTaskDialogVisible:false,
                form:{
                    taskName:'',
                    runTime:'',
                    taskLevel:'',
                    runTimeLength:'',
                    programId:'',
                    deviceIds:'',
                    userId:localStorage.getItem('userId'),
                },
                tableData:[],
                total:0,
                currentPage:1,
                pageSize:10,
                taskSearch:''
            }
        },
        mounted(){
            this.getTask()
        },
        methods:{
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
                deviceAjax({unitId:localStorage.getItem('unitId'),pageNum:1,pageSize:10}).then(res=>{

                })
                this.addTaskDialogVisible = true
            },
            //推送任务
            pushTask(){

            }
        }
    }
</script>

<style scoped>

</style>
