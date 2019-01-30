<template>
    <div class="goddess-rules-box">
        <div class="mainContent">
            <div class="time">2018/3/7 - 2018/3/11</div>
            <div class="rules">
                <img src="/static/images/activity/guide/goddess/rule-1.png" alt="" class="rule rule1">
                <img src="/static/images/activity/guide/goddess/rule-2.png" alt="" class="rule rule2">
            </div>
            <div class="btns">
                <div class="share-btn btn" @click="back">返回主页</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {

            }
        },
        methods: {
            back: function(){
                this.$router.back();
            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .goddess-rules-box{
        position: relative;
        height: 101%;
        background-color: #ffa1d6;
        overflow-x: hidden;
        overflow-y: scroll;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling : touch;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        .mainContent{
            position: relative;
            background: url(/static/images/activity/applet/goddess/bg.jpg) top center no-repeat;
            background-size: 100% auto;
            overflow: hidden;
            .time{
                width: px2rem(475px);
                height: px2rem(49px);
                line-height: px2rem(49px);
                font-size: px2rem(34px);
                color: #fff;
                margin: px2rem(685px) auto px2rem(60px);
                background-color: #fd7094;
                text-align: center;
            }
            .rules{
                overflow: hidden;
                .rule1{
                    display: block;
                    width: px2rem(618px);
                    margin: 0 auto px2rem(80px);
                }
                .rule2{
                    display: block;
                    width: px2rem(618px);
                    margin: 0 auto px2rem(224px);
                }
            }
            .btns{
                position: fixed;
                left: 50%;
                bottom: px2rem(60px);
                width: px2rem(594px);
                text-align: center;
                margin-left: px2rem(-297px);
                .btn{
                    display: inline-block;
                    width: 100%;
                    height: px2rem(108px);
                    line-height: px2rem(108px);
                    background-color: #fd7094;
                    border-radius: px2rem(60px);
                    font-size: px2rem(36px);
                    color: #fff;
                }
            }
        }
    }
</style>
