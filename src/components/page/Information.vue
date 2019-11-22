<template>
    <div>
        <div>
            <span style="display: block">element 上传</span>
            <el-upload
                class="upload-demo"
                drag
                action="https://up-z2.qiniup.com"
                :on-progress="uploadProgress"
                :on-success="uploadSuccess"
                :data="postData"
                ref="upload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传avi、mp4、mov、m4v文件</div>
            </el-upload>

            <br/>
            <br/>
            <br/>
            <span style="display: block">js原生上传</span>
            <input @change="upImage($event)" type="file" title />
            <el-progress   :percentage="percent"></el-progress>
        </div>

    </div>
</template>

<script>
    import * as qiniu from "qiniu-js";
    import {getUpTokenAjax} from '../api/api'
    export default {
        data() {
            return {
                percent:0,
                postData:{token:''},
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl:[],
                src:'resource.jzit168.com',
                Token:''
            };
        },
        mounted(){
            this.getToken()
        },
        methods: {
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
                        region: qiniu.region.z2, // 当前地区， 华东区域
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
                        error: errResult => {}, // 上传失败
                        complete: res => {
                            console.log(res)
                            this.src = "http://resource.jzit168.com/" + res.key;
                            console.log(this.src)
                        }});
                }
            },





            //element自带上传组件方法
            uploadProgress(event, file, fileList){
                //因为上传进度条与上传请求不同步，所以把上传进度减一
                event.percent = event.percent-1
                // console.log(event.percent)
                // console.log(event, file, fileList)
            },
            uploadSuccess(response, file, fileList) {
                this.src = 'http://resource.jzit168.com/'+response.key
                console.log(this.src,file,fileList)
            },
            getToken(){
                getUpTokenAjax({file:'aaa'}).then(res=>{
                    this.postData.token = res
                    this.Token = res
                })
            }
        }
    }
</script>

<style scoped>
</style>
