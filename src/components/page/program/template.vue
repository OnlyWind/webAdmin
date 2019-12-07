<template>
    <div>
        <el-button type="primary" @click="onaddTem">添加模板</el-button>
        <el-select v-model="temResolution"  placeholder="请选择分辨率" style="margin-left: 50px;">
            <el-option v-for="(item,index) in temResolutionArr" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-input v-model="templateName" placeholder="请输入模板名" style="width: 220px;margin-left: 20px;"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="warning" @click="clear">重置</el-button>
        <!--模板展示-->
        <div class="tem-box">
            <div class="img-wrap" style="width: 280px; display: inline-block;margin-top: 20px;" v-for="(item,index) in templateData">
                <template>
                    <div class="img-wrap2" style="margin: 0 auto;text-align: center">
                        <img :src="item.src" style="height: 150px;display: block;margin: 0 auto;"  class="img-box">
                        <span style="display: block;text-align: center;font-size: 12px">{{item.temName}}</span>
                        <span style="display: block;text-align: center;font-size: 12px">{{item.resolution}}</span>
                        <span style="display: block;text-align: center;font-size: 12px">{{item.addTime}}</span>
                        <el-button @click="deleTem(item.templateId)" style="display: inline-block;" size="mini" type="danger" round>删除</el-button>
                        <el-button @click="editTem(item.src,item.temName,item.templateId,item.viewList,item)" style="display: inline-block;" size="mini" type="primary" round>编辑</el-button>
                        <el-button @click="addProgram(item)" style="display: inline-block;" size="mini" type="primary" round>添加节目单</el-button>
                    </div>
                </template>
            </div>
            <!-- 分页 -->
            <div class="pagination" style="margin-top: 20px;">
                <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page.sync="currentPage" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
        <!--添加节目-->
        <el-dialog title="添加节目" :visible.sync="programDialogVisible" style="width: 1100px;margin: 0 auto;">
            <span>节目单名：</span>
            <el-input style="width: 220px;" placeholder="输入节目单名" v-model="programName"></el-input>
            <el-table stripe :data="programView.viewList" border style="width: 800px;margin-top: 20px;" ref="multipleTable"
                      :header-cell-style="{
                    'background-color': '#fafafa',
                    'color': 'black'
                    }"
            >
                <el-table-column type="index" label=" " width="55"></el-table-column>
                <el-table-column prop="viewName" label="控件名"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button size="small" type="primary" :disabled="scope.row.viewId==4?true:false"
                                   @click="handle(scope.row)">选择素材</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="programDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendProgram">添加节目单</el-button>
            </div>
        </el-dialog>

        <!--选择素材-->
        <el-dialog title="选择素材" :visible.sync="materialDialogVisible" style="width: 100%;margin: 0 auto;">
            <el-table stripe :data="resourcesList" border @selection-change="handleSelectionChange" style="width: 800px;margin-top: 20px;" ref="multipleTable"
                      :header-cell-style="{
                    'background-color': '#fafafa',
                    'color': 'black'
                    }"
            >
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

        <!--删除模板提示-->
        <el-dialog title="删除模板" :visible.sync="deleteDialogVisible" style="width: 50%;margin: 0 auto;">
            <span style="display: block;">确定删除这个模板吗?</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteTem">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑模板-->
        <el-dialog title="编辑模板"  :visible.sync="dialogVisible" style="width: 170%;" class="el-dialog-tem">
            <!--控件按钮-->
            <el-card class="box-card-left">
                <div class="top">
                    <el-button type="primary" class="topBtn" @click="onVideo" style="margin-left: 10px;">添加视频</el-button>
                    <el-button type="primary" class="topBtn" @click="onImg">添加图片</el-button>
                    <el-button type="primary" class="topBtn" @click="onText">添加文字</el-button>
                    <el-button type="primary" class="topBtn" @click="onTime">添加时间</el-button>
                </div>
            </el-card>
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
                        <p>{{item.viewName}}</p>
                    </vue-draggable-resizable>
                </div>
            </div>
            <!--控件信息-->
            <div style="float:left;">
                <!--选择分辨率-->
                <div style="overflow: hidden">
                    <span style="margin-left: 20px;">选择分辨率</span>
                    <el-select v-model="value" placeholder="请选择分辨率" style="margin-left: 20px;" @change="Resolution" :disabled="edITFlag==true?true:false">
                        <el-option
                            v-for="item in temResolutionArr"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </div>
                <!--控件信息-->
                <el-card class="box-card">
                    <p>
                        <span class="a">x:{{x}}</span>
                        <span class="a">y:{{y}}</span>
                        <span class="a">width:{{width}}</span>
                        <span class="a">height:{{height}}</span>
                    </p>

                </el-card>
                <div class="tem-info">
                    <el-button type="success" @click="onTop">置顶</el-button>
                    <el-button type="info" @click="onBtm">置底</el-button>
                    <el-button type="danger" @click="onDel">删除</el-button>
                </div>
                <div class="save">
                    <el-input placeholder="请输入模板名" style="width:200px" v-model="params.temName"></el-input>
                    <el-button type="primary" @click="onSave">保存模板</el-button>
                </div>
                <!--缩略图-->
                <!--<div style="width: 160px;height: 90px; margin:20px 0 0 20px;float:left;">-->
                    <!--<img :src="src" id="img">-->
                <!--</div>-->
            </div>


        </el-dialog>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';
    let numTem=0
    import {queryTemplateAjax,addTemplateAjax,editTemplateAjax,delteTemplateAjax,allresolutionAjax,queryresourcesAjax,addProgramAjax} from "../../api/api";
    export default {
        data(){
            return{
                realResolution:'',//真实分辨率
                infoProgramLists:[],
                resourceIds:'',//素材id集合的字符串
                chooseTemplateId:0,//选择的控件id
                resourceIdList:[],//素材id集合
                resourcesList:[],//素材集合
                infoProgramList:[],//素材和控件对象的集合
                programName:'',
                sendTemId:0,
                programView:{},
                viewList:{},
                edITFlag:false,
                templateName:'',
                templateData:[],
                templateId:0,
                templateParams:{
                },
                temResolution:'',
                temResolutionArr:[],//分辨率集合
                dialogVisible:false,//控制编辑模板弹窗的显隐
                deleteDialogVisible:false,
                programDialogVisible:false,
                materialDialogVisible:false,
                dragArr:[],
                dragArrs:[],
                x:0,
                y:0,
                width:100,
                height:100,
                flagVideo:true,//控制视频控件数量的依据
                params:{//添加模板api参数
                    userId:localStorage.getItem('userId'),
                    temName:'',
                    src:'',
                    resolution:'1080x1920',
                    viewListString:[]
                },
                src:'',
                options:[
                    {
                        value:'1',
                        label:'1080x1920'
                    },
                ],
                value:'1080x1920',
                fArr:[],
                pageSize:10,
                currentPage:1,
                total:0,
                k:0.25//模板缩放比例
            }
        },
        mounted(){
            this.getTemData()
        },
        methods:{
            //添加节目
            addProgram(res){

                this.infoProgramList = []
                this.templateName = ''
                this.programDialogVisible = true
                this.programView = res
                this.sendTemId = res.templateId
                for (let j = 0; j <this.programView.viewList.length ; j++) {
                    //如果有时间控件，直接添加素材id为0的节目
                    if (this.programView.viewList[j].viewId==4) {
                        this.infoProgramList.push({"temviewId":this.programView.viewList[j].temviewId,"resourceIds":"0"})
                    }
                }
            },
            //选择素材
            handle(row){
                this.chooseTemplateId = row.temviewId
                let queryParams = {
                    userId:this.params.userId,
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
                queryresourcesAjax(queryParams).then(res=>{//获取素材列表
                    if (res.code==0){
                        this.resourcesList = res.data.resourcesList
                    } else {
                        this.$message.error(res.message)
                    }
                });
                this.materialDialogVisible = true
            },
            //多选素材列表
            handleSelectionChange(val){
                this.resourceIdList = []
                for (let j = 0; j < val.length; j++) {
                    this.resourceIdList.push(val[j].resourceId)
                }
            },
            //确认选择素材
            choose(){
                this.resourceIds = ''
                let length = 0
                let num = 0
                if (this.resourceIdList.length){//判断素材集合有没有元素，有就进行下一次判断
                    for (let j = 0; j <this.resourceIdList.length ; j++) {
                        this.resourceIds += this.resourceIdList[j]+','//获取素材id集合的字符串
                    }
                    if (this.infoProgramList.length) {//判断参数集合有没有元素
                        length = this.infoProgramList.length
                        //第一次遍历检查有没有姓相同控件，有就覆盖相同控件和素材
                        for (let n = 0; n <length ; n++) {
                            if (this.infoProgramList[n].temviewId*1 == this.chooseTemplateId*1){
                                num = 1
                                this.infoProgramList[n] = {
                                    temviewId:this.chooseTemplateId,
                                    resourceIds:this.resourceIds.slice(0,-1)
                                }
                            }
                        }
                        // 第二次遍历，如果没有相同控件，就添加参数到控件素材集合
                        for (let n = 0; n <length ; n++) {
                            if (this.infoProgramList[n].temviewId*1 != this.chooseTemplateId*1){
                                if (num==0) {
                                    num = 1
                                    this.infoProgramList.push({
                                        temviewId:this.chooseTemplateId    ,
                                        resourceIds:this.resourceIds.slice(0,-1)
                                    })
                                }
                            }
                        }
                    } else {//没有元素就添加控件素材对象
                        this.infoProgramList.push({
                            temviewId:this.chooseTemplateId,
                            resourceIds:this.resourceIds.slice(0,-1)
                        })
                    }

                    // this.infoProgramList = this.infoProgramList.concat(this.infoProgramLists)
                    this.resourceIdList = []
                    this.materialDialogVisible = false
                    this.$message.success('选择成功！')
                    console.log(this.infoProgramList)
                } else {
                    this.$message.error('请选择素材')
                }
            },
            //提交节目单
            sendProgram(){
                if (this.programName) {
                    let sendParams = {
                        userId:this.params.userId,
                        programName:this.programName,
                        templateId:this.sendTemId,
                        infoProgramListString:JSON.stringify(this.infoProgramList)
                    }
                    addProgramAjax(sendParams).then(res=>{
                        if (res.code == 0){
                            this.programName = ''
                            this.programDialogVisible = false
                            this.infoProgramList = []//提交成功后清空素材集合
                            this.$message.success(res.message)
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }else{
                    this.$message.error('请输入节目名')
                }
            },
            //获取模板列表数据
            getTemData(){
                this.templateParams = {//查询参数
                    userId:this.params.userId,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    temName:this.templateName,
                    resolution:this.temResolution
                }
                //查询模板数据
                queryTemplateAjax(this.templateParams).then(res=>{
                    if (res.code == 0){
                        this.total = res.data.total
                        this.templateData = res.data.templateList
                    } else {
                        this.$message.error(res.message)
                    }
                })
                //查询分辨率
                allresolutionAjax({userId:this.params.userId}).then(res=>{
                    if (res.code==0){
                        this.temResolutionArr = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //搜索模板
            search(){
                this.getTemData()
            },
            //删除模板
            deleTem(id){
                this.templateId = id
                this.deleteDialogVisible = true
            },
            //编辑模板
            editTem(src,name,id,view,item){
                this.edITFlag = true
                numTem = 0
                let str = []
                queryTemplateAjax({
                    userId:localStorage.getItem('userId'),
                    pageSize:1,
                    pageNum:1,
                    temName:item.temName}).then(res=>{
                    view = res.data.templateList[0].viewList
                    //点击编辑把模板复现
                    for (let j = 0; j <view.length ; j++) {
                        view[j].x = view[j].locationX*1
                        view[j].y = view[j].locationY*1
                        //把控件信息字符串转成数字
                        view[j].width = parseInt(view[j].width)
                        view[j].height = parseInt(view[j].height)
                        view[j].zIndex = parseInt(view[j].zIndex)
                        //区别控件类型
                        if (view[j].viewId == 1) {
                            view[j].text = 'video'
                            str.push(view[j].viewName.slice(5)*1)
                        } else if (view[j].viewId == 2){
                            view[j].text = 'img'
                            str.push(view[j].viewName.slice(3)*1)
                        } else if (view[j].viewId == 3){
                            view[j].text = 'text'
                            str.push(view[j].viewName.slice(4)*1)
                        } else if (view[j].viewId == 4) {
                            view[j].text = 'time'
                            str.push(view[j].viewName.slice(4)*1)
                        }
                    }
                    //防止编辑时控件出现重名情况
                    numTem = Math.max.apply(null,str)
                    this.dialogVisible = true
                    //控制模板画布大小
                    this.value = item.resolution
                    this.fArr = this.value.split("x")
                    console.log(this.templateData)
                    setTimeout(res=>{
                        this.$refs.test.style.width = Math.round(this.fArr[0]*this.k)+'px';
                        this.$refs.test.style.height = Math.round(this.fArr[1]*this.k)+'px'
                    },0)

                    //模板复现
                    this.params.temName = name
                    this.params.resolution = this.value
                    setTimeout(res=>{
                        this.dragArr = view
                        this.flagVideo = true
                        //遍历控件集合查找有没有视频控件,只能添加一个视频控件
                        for (let j = 0; j <this.dragArr.length ; j++) {
                            if (this.dragArr[j].viewId==1){
                                this.flagVideo = false
                            }
                        }
                    },0)
                    this.templateId = id
                    this.src = src
                })
            },
            //执行删除模板
            deleteTem(){
                delteTemplateAjax({templateId:this.templateId}).then(res=>{
                    if (res.code == 0){
                        this.$message.success(res.message)
                        this.getTemData()
                        this.deleteDialogVisible = false
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //清空搜索信息
            clear(){
                this.temResolution = ''
                this.templateName = ''
                this.getTemData()
            },
            //分页页数改变时
            handleCurrentChange(val){
                this.currentPage = val
                this.getTemData()
            },
            //打开添加模板弹窗
            onaddTem(){
               numTem=0
               this.value = '1080x1920'
               this.flagVideo = true
               this.dialogVisible = true
               this.params.src = ''
               this.params.temName = ''
               this.edITFlag = false
               this.dragArr = []
            },
            //添加组件
            onVideo(){//添加视频控件
                if (this.flagVideo){
                    this.flagVideo = false
                    this.dragArr.push(this.copyObj(this.module('video',1,'video1')))
                } else {
                    this.$message.warning('video控件只能添加一个')
                }
            },
            onImg(){//添加图片控件
                numTem++
                this.dragArr.push(this.copyObj(this.module('img',2,'img'+numTem)))
            },
            onText(){//添加文字控件
                numTem++
                this.dragArr.push(this.copyObj(this.module('text',3,'text'+numTem)))
            },
            onTime(){//添加时间控件
                numTem++
                this.dragArr.push(this.copyObj(this.module('time',4,'time'+numTem)))
            },
            //选择分辨率
            Resolution(){
                sessionStorage.removeItem('Idx')
                //在添加模板时选择分辨率的时候重置控件数组
                if (this.edITFlag==false){
                    this.$message.warning("修改分辨率会清空屏幕！")
                    this.dragArr = []
                    this.flagVideo = true;
                    this.params.resolution = this.value //获取选择的分辨率
                    this.fArr = this.value.split("x")
                    this.$refs.test.style.width = Math.round(this.fArr[0]*this.k)+'px';
                    this.$refs.test.style.height = Math.round(this.fArr[1]*this.k)+'px'
                    console.log('pass')
                }

                // if (this.fArr[0]<=360 || this.fArr[1]<=640){
                //     this.$refs.test.style.width = this.fArr[0]*3/4+'px';
                //     this.$refs.test.style.height = this.fArr[1]*3/4+'px'
                // }else if (this.fArr[0]<=768 || this.fArr[1]<=1280) {
                //     this.$refs.test.style.width = this.fArr[0]*3/8+'px';
                //     this.$refs.test.style.height = this.fArr[1]*3/8+'px'
                // }else if (this.fArr[0]<=1080 || this.fArr[1]<=1920){
                //     this.$refs.test.style.width = this.fArr[0]/4+'px';
                //     this.$refs.test.style.height = this.fArr[1]/4+'px'
                // }
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
                if (idx && this.dragArr[idx]){
                    if (this.dragArr[idx].text == 'video'){
                        this.flagVideo = true
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
                        this.dragArr[i].zIndex = 1
                    }
                    this.dragArr[idx].zIndex = 2
                }
            },
            //置底
            onBtm(){
                var idx = sessionStorage.getItem('Idx')
                if (idx){
                    for (var i = 0; i <this.dragArr.length ; i++) {
                        this.dragArr[i].zIndex = 2
                    }
                    this.dragArr[idx].zIndex = 1
                }
            },
            //保存
            onSave(){
                //编辑时显示的模板宽高
                this.realResolution = this.$refs.test.offsetWidth+'x'+this.$refs.test.offsetHeight
                localStorage.setItem('realResolution',this.realResolution)//存到缓存，以便添加任务时调用
                this.dragArrs = JSON.parse(JSON.stringify(this.dragArr));//复制模板控件集合
                for (let j = 0; j <this.dragArrs.length ; j++) {
                    this.dragArrs[j].locationX = this.dragArrs[j].x
                    this.dragArrs[j].locationY = this.dragArrs[j].y
                    //删除多余属性
                    delete this.dragArrs[j].x
                    delete this.dragArrs[j].y
                    delete this.dragArrs[j].text
                }
                this.params.viewListString = this.dragArrs
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                var opts = {
                    logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
                    allowTaint: true, // 否允许跨源图像污染画布
                    backgroundColor: null, // 解决生成的图片有白边
                    useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
                }
                //生成缩略图的方法
                html2canvas(this.$refs.test,opts).then((canvas)=>{
                    var url = canvas.toDataURL('image/png')
                    this.src = url
                    this.params.src = url
                    if (this.params.temName){
                        this.params.viewListString = JSON.stringify(this.params.viewListString)
                        if (this.edITFlag == true){//this.edITFlag为true是修改模板,false是编辑模板
                            this.params.templateId = this.templateId
                            //修改模板
                            editTemplateAjax(this.params).then(res=>{
                                if (res.code == 0){
                                    this.$message.success(res.message)
                                    this.dialogVisible = false
                                    this.edITFlag = false
                                    this.getTemData()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }else{
                            //添加模板
                            addTemplateAjax(this.params).then(res=>{
                                if (res.code == 0){
                                    this.$message.success(res.message)
                                    this.dialogVisible = false
                                    this.getTemData()
                                } else {
                                    this.$message.error(res.message)
                                }
                            }).catch(res=>{
                                this.$message.error(res)
                            })
                        }
                    } else {
                        this.$message.error('请输入模板名！')
                    }
                    // document.getElementById('img').style.display='block'
                })
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
    .box-card-left{
        width: 200px;
        height: 600px;
        margin-right: 20px;
        float: left;
    }
    .topBtn{
        margin-bottom: 20px;
    }
    .el-dialog-tem{
        margin-left: -35%;
    }
    .tem-info{
        margin-left: 20px;
        margin-top: 20px;
    }
    .save{
        margin-left: 20px;
        margin-top: 20px;
    }
</style>
