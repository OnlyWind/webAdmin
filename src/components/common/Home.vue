<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content" >
            <transition name="move" mode="out-in"><router-view v-if="isRouterAlive"></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        provide() {
            return {
                reload: this.reload//调用reload方法
            }
        },
        data(){
            return {
                isRouterAlive: true//一开始router-view为true
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false
                //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
                this.$nextTick(() => {
                    this.isRouterAlive = true
                })
            }
        },
        components:{
            vHead, vSidebar
        }
    }
</script>
