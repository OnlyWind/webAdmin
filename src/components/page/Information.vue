<template>
    <div>
        信息发布系统
        <div>
            <el-upload
                action="http://www.changlujia.com:3012/home/index/upload"
                :on-success="uploadSuccess"
                :key="'index'"
                name="files"
                limit="10"
                multiple
                ref="upload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl:[],
                src:'http://resources.changlujia.com/'
            };
        },
        methods: {
            uploadSuccess(response, file, fileList) {
                this.src = 'http://resources.changlujia.com/'+response.data.path
                console.log(this.src)
            },
        }
    }
</script>

<style scoped>
</style>
