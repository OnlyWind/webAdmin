<template>
    <div>
        <!--查询表单-->
        <el-form ref="form" inline="" :model="form" label-width="100px">
            <el-form-item label="设备名称">
                <el-input v-model="postData.deviceName" placeholder="输入设备名"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
                <el-select v-model="postData.deviceType"  placeholder="请选择设备类型">
                    <el-option v-for="(item,index) in deviceTypeArr" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分辨率">
                <el-select v-model="postData.deviceScreen"  placeholder="请选择分辨率">
                    <el-option v-for="(item,index) in allScreen" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 20px;">
                <el-button type="primary" @click="onSearch">搜 索</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据-->
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column type="index" label=" " width="55"></el-table-column>
            <el-table-column prop="deviceName" label="设备名称"  width="150"></el-table-column>
            <el-table-column prop="deviceType" label="设备分类"  width="150"></el-table-column>
            <el-table-column prop="deviceScreen" label="分辨率"  width="150"></el-table-column>
            <el-table-column  label="定时开关机"  width="150">
                <template  slot-scope="scope">
                    {{scope.row.openTime?scope.row.openTime+'-'+scope.row.closeTime:''}}
                </template>
            </el-table-column>
            <el-table-column  label="地址">
                <template  slot-scope="scope">
                    {{scope.row.province+scope.row.city+scope.row.area}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label='详细地址'  width="150"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" type="primary"
                               @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination">
            <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :page-size="postData.pageSize"
                           @current-change="handleCurrentChange"></el-pagination>
        </div>
        <!--编辑弹窗-->
        <el-dialog title="编辑设备信息" :visible.sync="dialogVisible" style="width: 60%;margin: 0 auto;">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="设备名称">
                    <el-input v-model="form.deviceName"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="form.deviceType"  placeholder="请选择设备类型">
                        <el-option v-for="(item,index) in deviceTypeArr" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="地区" prop="city" class="form-left">
                    <el-select placeholder="省" v-model="sheng" @change="sheng1" prop="city"  style="width:102px">
                        <el-option v-for="(item,index) in data" :key="index" :label="item.city_name" :value="index + item.city_id">
                        </el-option>
                    </el-select>
                    <el-select v-model="shi" @change="shi1" placeholder="市" prop="city" style="width:102px">
                        <el-option v-for="(item,index2) in dataShi" :key="index2" :label="item.city_name" :value="index2 + item.city_id">
                        </el-option>
                    </el-select>
                    <el-select v-model="xian" @change="xian1" placeholder="县" style="width:102px" prop="city">
                        <el-option v-for="(item,index3) in dataXian" :key="index3" :label="item.city_name" :value="index3 + item.city_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="开机时间">
                    <el-input @keyup.native="changeAmount" v-model="openTime[0]" style="width: 50px;" :maxlength="2"></el-input>:
                    <el-input @keyup.native="changeAmount" v-model="openTime[1]" style="width: 50px;" :maxlength="2"></el-input>:
                    <el-input @keyup.native="changeAmount" v-model="openTime[2]" style="width: 50px;" :maxlength="2"></el-input>
                </el-form-item>
                <el-form-item label="关机时间">
                    <el-input v-model="closeTime[0]" style="width: 50px;" :maxlength="2"></el-input>:
                    <el-input v-model="closeTime[1]" style="width: 50px;" :maxlength="2"></el-input>:
                    <el-input v-model="closeTime[2]" style="width: 50px;" :maxlength="2"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSend">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {deviceAjax,querycomInfoAjax,updataDeviceAjax,alldeviceTypeAjax,allScreenAjax} from "../../api/api";
    import data from '../../../assets/city'
    export default {
        data(){
            return {
                s:'',
                sh:'',
                x:'',
                sheng:"",//省
                shi:"",//市
                xian:"",//县
                data:data.data,//省数据
                dataShi:{},//市数据
                dataXian:{},//县数据
                total:0,
                address:'',
                tableData:[],
                dialogVisible:false,
                deviceTypeArr:[],
                allScreen:[],
                openTime:[],
                closeTime:[],
                postData: {
                    unitId:987654321,
                    deviceType:'',
                    deviceScreen:'',
                    deviceName:'',
                    pageNum:1,
                    pageSize:10
                },
                form:{
                    deviceName:'',
                    deviceType:'',
                    address:'',
                    deviceId:0,
                    province:'',
                    city:'',
                    area:'',
                    openTime:'',
                    closeTime:'',
                    deviceIdent:0
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            changeAmount(e){
                console.log(e)
                // this.formInline.money = this.formInline.money.replace(/[^\d.]/g, '')
            },
            //获取设备数据
            getData(){
                querycomInfoAjax({userId:localStorage.getItem('userId')}).then(res=>{
                    if (res.code==0){
                        // 正式版调用
                        // this.postData.unitId = res.data.unitId
                    }
                })
                //设备信息
                deviceAjax(this.postData).then((res)=>{
                    if (res.code=="0") {
                        this.tableData = res.data.deviceList
                        this.total = res.data.total
                    }
                })
                //分辨率信息
                allScreenAjax({unitId:this.postData.unitId}).then(res=>{
                    if (res.code==0){
                        this.allScreen =res.data
                    }
                })
                //设备分类信息
                alldeviceTypeAjax({unitId:this.postData.unitId}).then(res=>{
                    if (res.code == 0){
                        this.deviceTypeArr = res.data
                    }
                })
            },
            //搜索设备信息
            onSearch(){
                this.getData()
            },
            //提交编辑
            onSend(){

                    this.form.openTime = '2019/11/21 '+ this.openTime[0]+':'+this.openTime[1]+':'+this.openTime[2]
                    this.form.closeTime = '2019/11/21 '+ this.closeTime[0]+':'+this.closeTime[1]+':'+this.closeTime[2]
                    console.log(this.form)
                    updataDeviceAjax(this.form).then(res=>{
                    if (res.code==0){
                        this.$message.success(res.message)
                        this.getData()
                        this.dialogVisible = false
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //点击编辑按钮
            handleEdit(row){
                alldeviceTypeAjax({unitId:this.postData.unitId}).then(res=>{
                    if (res.code == 0){
                        this.deviceTypeArr = res.data
                    }
                })
                this.form.deviceName = row.deviceName
                this.form.deviceType = row.deviceType
                this.form.address = row.address
                this.sheng = row.province
                this.shi = row.city
                this.xian = row.area
                this.form.deviceId = row.deviceId
                this.form.province = row.province
                this.form.city = row.city
                this.form.area = row.area
                this.form.openTime =row.openTime
                this.form.closeTime =row.closeTime
                this.form.deviceIdent = row.deviceIdent
                this.dialogVisible = true
                this.openTime[0] = row.openTime.split(':')[0]
                this.openTime[1] = row.openTime.split(':')[1]
                this.openTime[2] = row.openTime.split(':')[2]
                this.closeTime[0] = row.closeTime.split(':')[0]
                this.closeTime[1] = row.closeTime.split(':')[1]
                this.closeTime[2] = row.closeTime.split(':')[2]
            },
            //分页页数改变时
            handleCurrentChange(val){
                this.postData.pageNum = val
                this.getData()
            },




            //选择省
            sheng1(){
                let that = this
                let str=that.sheng.substring(that.sheng.length-6)
                let str1=that.sheng.substring(0,that.sheng.length-6);
                that.dataShi = that.data[str1].cityArr
                that.dataXian = that.xian = that.dataShi[0].areaArr
                that.shi = ''
                that.xian =''
                this.form.province = that.data[str1].city_name
                console.log(this.form.province)
                // that.xian = that.dataShi[0].areaArr[0].city_name
                // that.sheng = that.data[str1].city_name
            },

            //选择市
            shi1(){
                let that = this
                let str=that.shi.substring(that.shi.length-6)
                let str1=that.shi.substring(0,that.shi.length-6);
                setTimeout(res=>{that.dataXian = that.dataShi[str1].areaArr},0)
                // that.xian = that.dataXian[0].city_name
                setTimeout(res=>{
                    this.form.city = that.dataShi[str1].city_name
                    console.log(this.form.city)
                },0)

            },

            //选择县
            xian1(){
                let that = this
                let str=that.xian.substring(that.xian.length-6)
                let str1=that.xian.substring(0,that.shi.length-6);
                setTimeout(res=>{
                    this.form.area = that.dataXian[str1].city_name
                    console.log(this.form.area)
                },0)
                // that.form.area_id = str;
            },
        }
    }
</script>

<style scoped>

</style>
