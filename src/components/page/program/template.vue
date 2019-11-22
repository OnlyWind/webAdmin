<template>
    <div>
        <el-button type="primary" @click="onaddTem">添加模板</el-button>
        <el-dialog title="编辑模板" :visible.sync="dialogVisible" style="width: 125%;margin-left: -100px;">
            <div class="top">
                <el-button type="primary" @click="onVideo">添加视频</el-button>
                <el-button type="primary" @click="onImg">添加图片</el-button>
                <el-button type="primary" @click="onText">添加文字</el-button>
                <el-button type="danger" @click="onDel">删除</el-button>
                <el-button type="success" @click="onTop">置顶</el-button>
                <el-button type="info" @click="onBtm">置底</el-button>
                <el-button type="primary" style="float: right;" @click="onSave">保存</el-button>
                <el-input placeholder="请输入模板名" v-model="params.temName" style="width: 220px; float: right;"></el-input>
            </div>

            <!--模板编辑界面-->
            <div class="tembox">
                <div id="test" ref="test">
                    <vue-draggable-resizable :parent="true" v-for="(item,index) in dragArr" :key="index"
                                             :w="item.width" :h="item.height" :x="item.x" :y="item.y" :minw="50" :minh="50"
                                             @activated="onclick(index)"
                                             @dragstop="onDragstop(index)"
                                             @resizestop="onResizstop(index)"
                                             @resizing="onResizing"
                                             @dragging="onDragging"
                                             @deactivated="onDeactivated"
                                             :z="item.zIndex"
                                             :style="item.text=='video'?'background: skyblue':item.text=='img'?'background: greenyellow':'background: darkgrey'">
                        <p>{{item.text}}</p>
                    </vue-draggable-resizable>
                </div>
            </div>

            <!--选择分辨率-->
            <div style="margin-top: 20px; overflow: hidden">
                <span style="margin-left: 20px;">选择分辨率</span>
            </div>
            <el-select v-model="value" placeholder="请选择分辨率" style="margin-left: 20px;" @change="Resolution">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                </el-option>
            </el-select>
            <!--控件信息-->
            <el-card class="box-card">
                <p>
                    <span class="a">x:{{x}}</span>
                    <span class="a">y:{{y}}</span>
                    <span class="a">width:{{width}}</span>
                    <span class="a">height:{{height}}</span></p>
            </el-card>
            <div class="tem-info">
            </div>



            <div style="width: 160px;height: 90px; margin:20px 0 0 20px;float:left;">
                <img :src="src" id="img">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';
    let i=0
    import {queryTemplateAjax,addTemplateAjax,editTemplateAjax,delteTemplateAjax} from "../../api/api";
    export default {
        data(){
            return{
                dialogVisible:false,
                dragArr:[],
                dragArrs:[],
                x:0,
                y:0,
                width:100,
                height:100,
                flag:true,
                obj:{
                    name:'',
                    src:'',
                    width:0,
                    height:0,
                    img:[],
                    video:[],
                    text:[]
                },
                params:{
                    userId:localStorage.getItem('userId'),
                    temName:'',
                    src:'',
                    resolution:'1920x1080',
                    viewList:[]
                },
                src:'',
                options:[{
                    value:'1',
                    label:'1920x1080'
                },{
                    value:'2',
                    label:'1280x720'
                },{
                    value:'3',
                    label:'640x360'
                },
                {
                    value:'4',
                    label:'1080x1920'
                },],
                value:'',
                fArr:[]
            }
        },
        methods:{
            //打开添加模板弹窗
            onaddTem(){
               this.dialogVisible = true
            },
            //添加组件
            onVideo(){
                if (this.flag){
                    this.flag = false
                    this.dragArr.push(this.copyObj(this.module('video',1,'video1')))
                } else {
                    this.$message.warning('video控件只能添加一个')
                }
            },
            onImg(){
                i++
                this.dragArr.push(this.copyObj(this.module('img',2,'img'+i)))
            },
            onText(){
                i++
                this.dragArr.push(this.copyObj(this.module('text',3,'text'+i)))
            },
            //选择分辨率
            Resolution(){
                sessionStorage.removeItem('Idx')
                this.flag = true;
                this.$message.warning("修改分辨率会清空屏幕！")
                //在选择分辨率的时候重置控件数组
                this.dragArr = []
                this.fArr = this.value.split("x")
                if (this.fArr[0]<=640 || this.fArr[1]<=360){
                    this.$refs.test.style.width = this.fArr[0]*3/4+'px';
                    this.$refs.test.style.height = this.fArr[1]*3/4+'px'
                }else if (this.fArr[0]<=1280 || this.fArr[1]<=720) {
                    this.$refs.test.style.width = this.fArr[0]*3/8+'px';
                    this.$refs.test.style.height = this.fArr[1]*3/8+'px'
                }else if (this.fArr[0]<=1920 || this.fArr[1]<=1080){
                    this.$refs.test.style.width = this.fArr[0]/4+'px';
                    this.$refs.test.style.height = this.fArr[1]/4+'px'
                }
            },
            //点击组件
            onclick(index){
                this.unAssignment(index);
                sessionStorage.setItem('Idx',index)
            },
            //组件失去焦点
            onDeactivated(){
                // sessionStorage.removeItem('Idx')
            },
            //删除按钮
            onDel(){
                var idx = sessionStorage.getItem('Idx');
                if (idx || this.dragArr[idx]){
                    if (this.dragArr[idx].text == 'video'){
                        this.flag = true
                    }
                    this.dragArr.splice(idx,1)
                    sessionStorage.removeItem('Idx')
                    this.$message.success('删除成功')
                }else{
                    this.$message.warning('请选择组件')
                }
            },
            //放大缩小时
            onResizing(x,y,w,h){
                this.x = x;
                this.y = y;
                this.width = w;
                this.height = h;
            },
            //放大缩小结束时
            onResizstop(index){
                this.Assignment(index)
            },
            //拖动时
            onDragging(x,y){
                this.x = x
                this.y = y
            },
            //拖动结束
            onDragstop(index){
                this.Assignment(index)
            },
            //置顶
            onTop(){
                var idx = sessionStorage.getItem('Idx')
                if (idx){
                    for (var i = 0; i <this.dragArr.length ; i++) {
                        this.dragArr[i].zIndex = 0
                    }
                    this.dragArr[idx].zIndex = 1
                }
            },
            //置底
            onBtm(){
                var idx = sessionStorage.getItem('Idx')
                if (idx){
                    for (var i = 0; i <this.dragArr.length ; i++) {
                        this.dragArr[i].zIndex = 1
                    }
                    this.dragArr[idx].zIndex = 0
                }
            },
            //保存
            onSave(){
                this.dragArrs = JSON.parse(JSON.stringify(this.dragArr));
                for (let j = 0; j <this.dragArrs.length ; j++) {
                    this.dragArrs[j].locationX = this.dragArrs[j].x
                    this.dragArrs[j].locationY = this.dragArrs[j].y
                    delete this.dragArrs[j].x
                    delete this.dragArrs[j].y
                    delete this.dragArrs[j].text
                }
                console.log(this.dragArrs)
                this.params.viewList = this.dragArrs
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                var opts = {
                    logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
                    allowTaint: true, // 否允许跨源图像污染画布
                    backgroundColor: null, // 解决生成的图片有白边
                    useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
                }
                html2canvas(this.$refs.test,opts).then((canvas)=>{
                    var url = canvas.toDataURL('image/png')
                    this.src = url
                    this.params.src = url
                    document.getElementById('img').style.display='block'
                })
                console.log(this.params)
            },
            //页面信息赋值给dragArr组件
            Assignment(index){
                this.dragArr[index].x = this.x;
                this.dragArr[index].y = this.y;
                this.dragArr[index].width = this.width;
                this.dragArr[index].height = this.height;
            },
            //dragArr组件信息赋值给页面信息
            unAssignment(index){
                this.x = this.dragArr[index].x;
                this.y = this.dragArr[index].y;
                this.width = this.dragArr[index].width;
                this.height = this.dragArr[index].height;
            },
            //复制对象方法
            copyObj(obj){
                // return Object.assign({}, obj) IE不兼容
                return JSON.parse(JSON.stringify(obj))
            },
            //基础组件模块
            module(obj,type,name){
                return {
                    viewName:name,
                    width:100,
                    height:100,
                    x:100,
                    y:100,
                    text:obj,
                    viewId:type,
                    zIndex:1
                }
            }
        }
    }
</script>

<style scoped>
    .tembox{
        width: 600px;
        height: 600px;
        border: 1px solid darkgray;
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
        float: left;
    }
    #test{
        width: 270px;
        height: 480px;
        background: black;
        margin: 0 auto;
        position: relative;
        text-align: center;
    }
    .box-card{
        width: 220px;
        height: 200px;
        float: left;
        margin-left: 20px;
        margin-top: 20px;
    }
    span.a{
        margin-left:10px;
        display: block;
        line-height: 40px;
    }
    #img{
        width: 160px;
        /*height: 90px;*/
        display: none;
    }
</style>
