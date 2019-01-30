<template>
    <div class="activity-header">
        <div class="header-icon" @click="backToApp"><i class="iconfont icon-fanhui"></i></div>
        <div class="header-cont"><p>{{title}}</p></div>
    </div>
</template>
<script>
    import * as _tool from "../../util/tool"
    export default {
        props:{
            title: String,
            type: String
        },
        methods: {
            backToApp: function(){
                //app,perpage
                if (this.type==="app") {
                    WebViewJavascriptBridge.callHandler('backToActivityList',null,function() {});
                }else{
                    this.$router.go(-1);
                }
            },
        },
        created(){
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.$parent.type);
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/function';
    .activity-header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(80px);
        // display: flex;
        text-align: center;
        border-bottom: 1px solid #e4e4e4;
        background-color: #FFF;
        z-index: 999;
        .header-icon{
            position: absolute;
            left: 0;
            width: px2rem(80px);
            line-height: px2rem(80px);
        }
        .header-cont{
            width: 100%;
            line-height: px2rem(80px);
        }
        i{
            color: #595959;
        }
        p{
            font-size: px2rem(28px);
            color: #292929;
        }
    }
</style>
