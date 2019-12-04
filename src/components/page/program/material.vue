<template>
    <div>
        <el-button @click="onadd" type="primary">新增素材</el-button>
        <el-input v-model="fileName" style="width:250px;margin-left: 50px;" placeholder="请输入文件名"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <!--添加素材弹窗-->
        <el-dialog title="新增素材" :visible.sync="dialogVisible" :before-close='closeDialog' style="margin: 0 auto;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="上传图片" name="first">
                    <div>
                        <input @change="upImage($event)" ref="upfile1" style="display:none;" type="file" title />
                        <el-button type="primary" @click="upImg">选择文件</el-button>
                        <el-progress   :percentage="percent"></el-progress>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="上传视频" name="second">
                    <div>
                        <input @change="upImage($event)" type="file" title ref="upfile2" style="display:none;"/>
                        <el-button type="primary" @click="upVideo">选择文件</el-button>
                        <el-progress   :percentage="percent"></el-progress>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="添加文字" name="third">
                    <el-input v-model="text" style="width: 80%;" placeholder="请输入文字"></el-input>
                    <el-button type="primary" @click="addText">添加</el-button>
                </el-tab-pane>
            </el-tabs>
            <h3  style="margin-top: 25px;">待上传列表</h3>
            <el-table :data="infoResourcesListString"  border ref="multipleTable">
                <el-table-column type="index" label=" " width="55"></el-table-column>
                <el-table-column prop="fileName" label="文件名"  width="200"></el-table-column>
                <el-table-column prop="resourceType" label="文件类型"  width="100"></el-table-column>
                <el-table-column prop="resourceName" label="地址(或文字内容)"></el-table-column>
                <!--<el-table-column label="操作" width="180">-->
                    <!--<template scope="scope">-->
                        <!--<el-button size="small" type="danger"-->
                                   <!--@click="handleDelete(scope.row)">删除</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="onclick">上 传</el-button>
            </div>
        </el-dialog>
        <el-tabs v-model="navigation" @tab-click="headClick">
            <el-tab-pane label="图片" name="图片">
                <div class="img-wrap" style="width: 210px; display: inline-block;margin-top: 20px;" v-for="(item,index) in materialData">
                    <template>
                        <div class="img-wrap2" style="display: inline-block">
                            <img :src="item.resourceName" style="width: 200px;"  class="img-box">
                            <!--<a :href="item.resourceName" download=""  >下载</a>-->
                            <span style="display: block;text-align: center;font-size: 12px">{{item.fileName}}</span>
                            <el-button @click="deleImg(item.resourceId)" style="display: block;margin: 5px auto" size="mini" type="danger" icon="el-icon-delete" circle>删 除</el-button>
                        </div>
                    </template>
                </div>
                <!-- 分页 -->
                <div class="pagination" style="margin-top: 20px;">
                    <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page.sync="imgPage" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="视频" name="视频">
                <div class="img-wrap" style="width: 210px; display: inline-block;margin-top: 20px;" v-for="(item,index) in materialData">
                    <template>
                        <div class="img-wrap2" style="display: inline-block">
                            <video :src="item.resourceName"  controls style="width: 200px"></video>
                            <span style="display: block;text-align: center;font-size: 12px">{{item.fileName}}</span>
                            <el-button @click="deleVideo(item.resourceId)" style="display: block;margin: 5px auto" size="mini" type="danger" icon="el-icon-delete" circle>删 除</el-button>
                        </div>
                    </template>
                </div>
                <!-- 分页 -->
                <div class="pagination" style="margin-top: 20px;">
                    <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page="videoPage" :page-size="pageSize" @current-change="handleCurrentChangevideo"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="文字" name="文字">
                <el-table :data="materialData" border style="width: 100%" ref="multipleTable">
                    <el-table-column type="index" label=" " width="55"></el-table-column>
                    <el-table-column prop="resourceName" label="文字内容"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template scope="scope">
                            <el-button size="small" type="danger"
                                       @click="handleTextDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination" style="margin-top: 20px;">
                    <el-pagination background layout="total,jumper,prev, pager, next" :total="total" :current-page="textPage" :page-size="pageSize" @current-change="handleCurrentChangeText"></el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import * as qiniu from "qiniu-js";
    import {addresourcesAjax,getUpTokenAjax,queryresourcesAjax,delresourcesAjax} from "../../api/api";
    export default {
        data(){
            return{
                currentPage:1,
                text:'',
                activeName:'first',
                navigation:'图片',
                infoResourcesListString:[],
                percent:0,
                imgPage:1,
                videoPage:1,
                textPage:1,
                postData:{token:''},
                dialogImageUrl: '',
                src:'resource.jzit168.com',
                Token:'',
                dialogVisible:false,
                materialData:[],
                total:0,
                pageSize:10,
                pageNum:1,
                fileName:''
            }
        },
        mounted(){
            this.getToken()
            this.getMaterialData()
        },
        methods:{
            //获取素材
            getMaterialData(){
                queryresourcesAjax({
                    userId:localStorage.getItem('userId'),
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    resourceType:this.navigation,
                    fileName:this.fileName
                }).then(res=>{
                    if (res.code==0){
                        this.materialData = res.data.resourcesList
                        this.total = res.data.total
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //按文件名搜索素材
            search(){
                this.getMaterialData()
            },

            /*分页*/
            handleCurrentChange(val){
                this.currentPage = val
                this.getMaterialData()
            },
            handleCurrentChangevideo(val){
                this.currentPage = val
                this.getMaterialData()
            },
            handleCurrentChangeText(val){
                this.currentPage = val
                this.getMaterialData()
            },

            handleClick(tab, event){
                // console.log(this.activeName)
            },
            //素材首页导航点击事件
            headClick(tab, event){
                this.currentPage = 1
                this.imgPage = this.currentPage
                this.videoPage = this.currentPage
                this.textPage = this.currentPage
                this.fileName = ''
                this.getMaterialData()
            },
            //获取七牛token
            getToken(){
                getUpTokenAjax({file:'aaa'}).then(res=>{
                    this.postData.token = res
                    this.Token = res
                })
            },
            //删除素材方法
            deleteSC(id){
                delresourcesAjax({resourcesIdString:id}).then(res=>{
                    if (res.code == 0){
                        this.getMaterialData()
                        this.$message.success(res.message)
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //删除文字素材
            handleTextDelete(row){
                this.deleteSC(row.resourceId)
            },
            //删除图片素材
            deleImg(id){
                this.deleteSC(id)
            },
            //删除视频素材
            deleVideo(id){
                this.deleteSC(id)
            },
            //上传图片按钮
            upImg(){
                this.$refs.upfile1.click()
            },
            //上传视频按钮
            upVideo(){
                this.$refs.upfile2.click()
            },
            //添加文字
            addText(){
                this.infoResourcesListString.push({resourceName:this.text,resourceType:'文字',fileName:''})
            },

            //js上传标签上传方法
            upImage(e) {
                this.qiniuFiles(e.target.files[0]);
            },
            qiniuFiles(file){
                if (file){
                    let f = file; // 上传的文件，
                    let key = f.name
                    let config = {
                        useCdnDomain: true, // 表示是否为CDN加速，true加速；false不加速
                        region: qiniu.region.z2, // 当前地区，华南区域
                        domain: "http://resource.jzit168.com" // 七牛云注册的空间域名
                    };
                    let putExtra = {
                        fname: f.name, // 文件原文件名
                        params: {}, // 放置自定义变量
                        mimeType: null // 上传文件限制，null为不限制；限制类型放在数组中['image/png',"image/gif"]
                    };

                    let observable = qiniu.upload(f, key, this.Token, putExtra, config);  // this.Token 为上面向后台请求token 保存字段
                    observable.subscribe({
                        next: resProgress => {this.percent=parseInt(resProgress.total.percent)}, // 查看上传进度条
                        error: errResult => {this.$message.warning(errResult)}, // 上传失败
                        complete: res => {//上传成功
                            this.src = "http://resource.jzit168.com/" + res.key;
                            if (this.activeName=='first') {
                                this.infoResourcesListString.push({resourceName:this.src,resourceType:'图片',fileName:f.name})
                            } else if (this.activeName=='second') {
                                this.infoResourcesListString.push({resourceName:this.src,resourceType:'视频',fileName:f.name})
                            }
                        }});
                }
            },

            onadd(){
                this.dialogVisible = true
            },
            closeDialog(){//关闭添加素材窗口前事件
                this.infoResourcesListString=[] //关闭弹窗直接清空数组
                this.percent = 0
                this.dialogVisible = false
                this.text = ''
            },
            cancel(){//取消按钮
                this.dialogVisible = false
                this.infoResourcesListString=[] //取消直接清空数组
                this.percent = 0
            },
            onclick(){//提交素材到后端服务器
                if (this.infoResourcesListString.length){
                    addresourcesAjax({
                        userId:localStorage.getItem('userId'),
                        infoResourcesListString:JSON.stringify(this.infoResourcesListString)
                    }).then(res=>{
                        if (res.code == 0){
                            this.$message.success(res.message)
                            this.infoResourcesListString=[] //提交成功后清空数组
                            this.percent = 0
                            this.dialogVisible = false
                            this.getMaterialData()
                        } else {
                            this.$message.warning(res.message)
                        }
                    })
                } else {
                    this.$message.warning('上传文件为空！')
                }
            },
        },
    }
</script>

<style scoped>

</style>
