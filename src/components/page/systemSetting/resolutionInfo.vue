<template>
    <div>
        <div>
            <el-button type="primary" @click="addResolution" style="margin-bottom: 25px;margin-right: 40%;">添加分辨率</el-button>
            <span>{{'分辨率数量:'+total}}</span>
        </div>
        <el-table :data="tableData" border style="width: 800px" ref="multipleTable">
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="resolution" label="分辨率"></el-table-column>
            <el-table-column prop="devicesAmount" label="设备数"  width="100"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="提示" :visible.sync="dialogVisible" style="width: 50%;margin: 0 auto;">
            <el-form inline>
                <el-form-item label="分辨率：">
                    <el-input v-model="resolution" placeholder="格式:宽x高" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSend">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible1" style="width: 40%;margin: 0 auto;">
            <div>
                <span>确定删除吗</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="onDelete">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {screenListAjax,addScreenAjax,delScreenAjax} from "../../api/api";
    export default {
        data(){
            return{
                resolution:'',
                tableData:[],
                total:0,
                screenId:0,
                userId:localStorage.getItem('userId'),
                dialogVisible:false,
                dialogVisible1:false,
                postData:{
                    userId:localStorage.getItem('userId'),
                    pageSize:10,
                    pageNum:1
                }
            }
        },
        mounted(){
            this.getScreenList()
        },
        methods:{
            addResolution(){
                this.dialogVisible = true
            },
            //添加分辨率
            onSend(){
                addScreenAjax({userId:this.userId,resolution:this.resolution}).then(res=>{
                    if (res.code==0){
                        this.dialogVisible = false
                        this.$message.success(res.message)
                        this.getScreenList()
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            handleDelete(row){
                this.screenId = row.screenId
                this.dialogVisible1 = true
            },
            //删除分辨率
            onDelete(){
                delScreenAjax({screenId:this.screenId}).then(res=>{
                    if (res.code==0){
                        this.$message.success(res.message)
                        this.getScreenList()
                        this.dialogVisible1 = false
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //获取分辨率数据
            getScreenList(){
                console.log(this.postData)
                screenListAjax(this.postData).then(res=>{
                    if (res.code==0){
                        this.tableData = res.data.deviceList
                        this.total = res.data.total
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
