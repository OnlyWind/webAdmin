<template>
    <div class="form-box">
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="公司名称">
                <el-input v-model="form.company" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="说明">
                <el-input v-model="form.explain"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-input v-model="form.state"></el-input>
            </el-form-item>
            <el-form-item label="地区">
                {{form.diqu}}
            </el-form-item>
            <el-form-item  label="修改地区" prop="city" class="form-left">
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
            <el-form-item label="添加时间">
                <el-input v-model="form.addTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
                <el-input v-model="form.changeTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onadd">添加</el-button>
                <el-button type="primary" @click="onSubmit">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <span style="color: red;font-size: 20px">*</span>   <span style="font-size: 12px;color: darkgray">一个账号只能添加一个企业</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {addcompanyInfoAjax,querycomInfoAjax,upcompanyInfoAjax} from '../../api/api'
    import data from '../../../assets/city'
    export default {
        data: function(){
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
                form: {
                    unitId:0,
                    address:'',
                    diqu:'',
                    company:'',
                    explain:'',
                    state:0,
                    province:'',
                    city:'',
                    area:'',
                    addTime:'',
                    changeTime:'',
                }
            }
        },
        mounted(){
            this.getFormData()
        },
        methods: {
            getFormData(){
                querycomInfoAjax({userId:localStorage.getItem('userId')}).then(res=>{
                    if (res.code==0){
                        this.s = res.data.province
                        this.sh = res.data.city
                        this.x = res.data.area
                        this.form.company = res.data.company
                        this.form.explain = res.data.explain
                        this.form.state = res.data.state
                        this.form.addTime = res.data.addTime
                        this.form.changeTime = res.data.changeTime
                        this.form.unitId = res.data.unitId
                        this.form.diqu = res.data.province+res.data.city+res.data.area
                        this.form.address = res.data.address
                        localStorage.setItem("unitId",res.data.unitId)
                    }
                })
            },
            //添加企业
            onadd(){
                console.log(this.form)
                if (this.form.province==''){
                    this.form.province = this.s
                    this.form.city = this.sh
                    this.form.area = this.x
                }
                delete this.form.diqu
                delete this.form.addTime
                delete this.form.changeTime
                delete this.form.unitId
                this.form.userId = localStorage.getItem('userId')
                addcompanyInfoAjax(this.form).then(res=>{
                    if (res.code==0){
                        this.$message.success(res.message)
                        this.getFormData()
                    } else {
                        this.$message.warning(res.message)
                        this.getFormData()
                    }
                })
            },
            //编辑企业信息
            onSubmit() {
                console.log(this.form)
                if (this.form.province==''){
                    this.form.province = this.s
                    this.form.city = this.sh
                    this.form.area = this.x
                }
                delete this.form.diqu
                delete this.form.addTime
                delete this.form.changeTime
                delete this.form.userId
                upcompanyInfoAjax(this.form).then(res=>{
                    if (res.code == 0){
                        this.$message.success(res.message)
                        this.getFormData()
                    } else {
                        this.$message.warning(res.message)
                    }
                })
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
