<template>
    <div class="sbTemplate-box">
        <div class="header">
            <div class="header-icon" @click="goBack"><i class="iconfont icon-fanhui"></i></div>
            <div class="header-cont"><p>选择模板</p></div>
            <div class="complete" @click="skip">完成</div>
        </div>
        <div class="templateList">
            <div class="template-item" v-for="(item,index) in templateList.slice(0,2)" @click="edit(item)">
                <div class="img-contain">
                    <img :src="item.templatePicUrl" alt="">
                    <div class="using" v-if="item.isUse===1">正在使用</div>
                </div>
                <div class="name">{{item.templateName}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../../fetch/api'
    export default {
        data() {
            return {
                id: this.$route.query.id,
                productCode: this.$route.query.productCode,
                token: this.$route.query.token,
                templateList: []
            }
        },
        methods: {
            goBack: function(){
                this.$router.replace("/v2/editGoods_n?id=" + this.id + "&token=" + this.token);
            },
            skip: function(){
                WebViewJavascriptBridge.callHandler('backToList',null,function() {});
            },
            getTemplates: function () {
                //获取模板
                api.getPenTemplateListByProductCode("get",{productCode: this.productCode},this.token).then((res) => {
                    if(res.returnCode==="0"){
                        this.templateList = res.returnContent;
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
            },
            edit: function(item){
                // WebViewJavascriptBridge.callHandler('selectTemplate',{tpCode: item.templateCode},function() {});
                this.$router.replace('/sbTemplate/' + item.templateCode + "?productCode=" + this.productCode + "&token=" + this.token + "&id=" + this.id);
            },
            //wkwebviewBridge
            setupWebViewJavascriptBridge: function(callback) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
            },
            //webviewBridge
            connectWebViewJavascriptBridge: function(callback) {
                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge)
                } else {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady'
                        , function() {
                            callback(WebViewJavascriptBridge)
                        },
                        false
                    );
                }
            }
        },
        mounted(){
            //获取详情
            this.getTemplates();
            //初始化webViewJavascriptBridge
            if (this.type==='android') {
                this.connectWebViewJavascriptBridge(function(bridge) {
                    bridge.init(function(message, responseCallback) {
                        console.log('JS got a message', message);
                        var data = {
                            'Javascript Responds': '测试中文!'
                        };
                        console.log('JS responding with', data);
                        responseCallback(data);
                    });
                })
            }else{
                this.setupWebViewJavascriptBridge();
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .sbTemplate-box{
        padding-top: px2rem(80px);
        .header{
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
            .complete{
                position: absolute;
                top: 0;
                right: 0;
                width: px2rem(80px);
                line-height: px2rem(80px);
            }
            i{
                color: #c0c0c0;
            }
            p{
                font-size: px2rem(28px);
                color: #292929;
            }
        }
        .templateList{
            .template-item{
                display: inline-block;
                border: 1px solid #bbb;
                width: px2rem(345px);
                margin: px2rem(20px) 0 0 px2rem(20px);
                .img-contain{
                    position: relative;
                    width: px2rem(345px);
                    height: px2rem(460px);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .using{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: px2rem(345px);
                        height: px2rem(60px);
                        line-height: px2rem(60px);
                        text-align: center;
                        background-color: rgba(0,0,0,.6);
                        font-size: px2rem(24px);
                        color: #fff;
                    }
                }
                .name{
                    width: 100%;
                    height: px2rem(80px);
                    line-height: px2rem(80px);
                    text-align: center;
                    font-size: px2rem(24px);
                    border-top: 1px solid #bbb;
                }
            }
        }
    }
</style>
