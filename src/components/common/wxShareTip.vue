<template>
    <div class="shareTip-contain" v-show="shareTipShow" @click="closeTip">
        <div class="mask"></div>
        <div class="contain">
            <img src="/static/images/activity/share_tip.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            shareTipShow: Boolean
        },
        methods: {
            closeTip: function(){
                console.log(1);
                this.$parent.shareTipShow = false;
            }
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/function';
    .shareTip-contain{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling : touch;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        z-index:999;
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
        }
        .contain{
            position: relative;
            img{
                width: 100%;
            }
        }
    }
</style>
