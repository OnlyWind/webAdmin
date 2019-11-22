<template>
    <div>
        <div>
            <el-button type="primary" @click="addDeviceType" style="margin-bottom: 25px;margin-right: 40%;">添加设备分类</el-button>
            <span>{{'设备分类数量:'+total}}</span>
        </div>
        <el-table :data="tableData" border style="width:800px" ref="multipleTable">
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="deviceType" label="设备类型"></el-table-column>
            <el-table-column prop="deviceCount" label="设备数"  width="100"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="添加设备分类" :visible.sync="dialogVisible" style="width: 50%;margin: 0 auto;">
            <el-form inline>
                <el-form-item label="设备分类:">
                    <el-input v-model="deviceType" placeholder="输入设备分类" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSend">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑设备分类" :visible.sync="dialogVisible2" style="width: 50%;margin: 0 auto;">
            <el-form inline>
                <el-form-item label="设备分类:">
                    <el-input v-model="EditDeviceType" placeholder="输入设备分类" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="onEdit">确 定</el-button>
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
    import {deviceTypeListAjax,addDeviceTypeAjax,delDeviceTypeAjax,updataDeviceTypeAjax} from "../../api/api";
    export default {
        data(){
            return{
                deviceType:'',
                tableData:[],
                total:0,
                EditDeviceType:'',
                deviceTypeId:0,
                userId:localStorage.getItem('userId'),
                unitId:987654321/*localStorage.getItem('unitId')*/,
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                postData:{
                    unitId:987654321/*localStorage.getItem('unitId')*/,
                    pageSize:10,
                    pageNum:1
                }
            }
        },
        mounted(){
            this.getTypeListAjax()
        },
        methods:{
            addDeviceType(){
                this.dialogVisible = true
            },
            //添加设备分类
            onSend(){
                addDeviceTypeAjax({unitId:this.unitId,deviceType:this.deviceType}).then(res=>{
                    if (res.code==0){
                        this.dialogVisible = false
                        this.$message.success(res.message)
                        this.getTypeListAjax()
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            handleDelete(row){
                this.deviceTypeId = row.deviceTypeId
                this.dialogVisible1 = true
            },
            handleEdit(row){
                this.deviceTypeId = row.deviceTypeId
                this.dialogVisible2 = true
            },
            //删除设备分类
            onDelete(){
                delDeviceTypeAjax({deviceTypeId:this.deviceTypeId}).then(res=>{
                    if (res.code==0){
                        this.$message.success(res.message)
                        this.getTypeListAjax()
                        this.dialogVisible1 = false
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //编辑设备分类
            onEdit(){
                updataDeviceTypeAjax({deviceTypeId:this.deviceTypeId,deviceType:this.EditDeviceType}).then(res=>{
                    if (res.code==0){
                        this.$message.success(res.message)
                        this.getTypeListAjax()
                        this.dialogVisible2 = false
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //获取设备分类数据
            getTypeListAjax(){
                console.log(this.postData)
                deviceTypeListAjax(this.postData).then(res=>{
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
