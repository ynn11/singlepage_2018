<template>
    <div class="tp_003" @click="mark">
        <div class="page-header">
            <div class="header-icon" @click="goBack"><i class="iconfont icon-fanhui"></i></div>
            <div class="header-cont"><p>详情编辑</p></div>
        </div>
        <div class="handle">
            <div class="item" @click="addPic">
                <i class="iconfont icon-tupian"></i>
            </div>
            <div class="item" @click="addWords">
                <i class="iconfont icon-wenzi"></i>
            </div>
            <div class="item" @click="saveTemplate">
                <i class="iconfont icon-save"></i>
            </div>
            <div class="item" @click="savePic">
                <i class="iconfont icon-fabu"></i>
            </div>
        </div>
        <div class="handle second" v-show="handleIndex!==-1">
            <div class="item" @click="moveDown">
                <i class="iconfont icon-xiajiantou"></i>
            </div>
            <div class="item" @click="moveUp">
                <i class="iconfont icon-shangjiantou"></i>
            </div>
            <div class="item" @click="deleteModule">
                <i class="iconfont icon-delete"></i>
            </div>
        </div>
        <div :class="'editArea ' + [handleIndex!==-1?'handling  ':'']">
            <div :class="'item ' + item.type + [handleIndex===index?' border':'']" v-for="(item,index) in pageData">
                <div v-if="item.type==='img'" class="img-box">
                    <img :src="item.url" alt="" :data-index="index">
                </div>
                <div v-else-if="item.type==='words'" class="words-box">
                    <textarea name="" class="" placeholder="请输入内容" v-model="item.content" :data-index="index" :style="'height:' + [item.height?item.height:36]*htmlHeight/75 + 'px'" @blur="blur(item,$event)" @focus="focus(index,$event)"></textarea>
                </div>
            </div>
        </div>

        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import loading from '@/components/common/loading'

    import api from '../../../../fetch/api'
    import * as _tool from '../../../../util/tool'
    export default {
        components: {
            "v-loading": loading
        },
        data() {
            return {
                templateCode: "tp_003",
                id: this.$route.query.id,
                productCode: this.$route.query.productCode,
                token: this.$route.query.token,
                //页面来源 ios/android
                type: this.$route.query.type,
                //页面内容数据
                pageData: [],
                //图片地址前缀
                imgBaseUrl: 'http://static.storeer.com/',
                //操作定位
                handleIndex: -1,
                //loading
                loading: false,
                //页面基准尺寸
                htmlHeight: 75
            }
        },
        methods: {
            //二级操作
            moveDown: function(e){
                if (this.handleIndex===-1) {
                    alert('操作有误，请刷新重试');
                    return;
                }
                if (this.handleIndex>=this.pageData.length-1) {
                    alert('该模块已移动到最后');
                    return;
                }
                let currentData = this.pageData[this.handleIndex];
                let afterData = this.pageData[this.handleIndex+1];
                this.pageData.splice(this.handleIndex+1,1,currentData);
                this.pageData.splice(this.handleIndex,1,afterData);
                this.handleIndex++;
                e.stopPropagation();
            },
            moveUp: function(e){
                if (this.handleIndex===-1) {
                    alert('操作有误，请刷新重试');
                    return;
                }
                if (this.handleIndex===0) {
                    alert('该模块已移动到最前');
                    return;
                }
                let currentData = this.pageData[this.handleIndex];
                let beforeData = this.pageData[this.handleIndex-1];
                this.pageData.splice(this.handleIndex-1,1,currentData);
                this.pageData.splice(this.handleIndex,1,beforeData);
                this.handleIndex--;
                e.stopPropagation();
            },
            deleteModule: function(e){
                if (this.handleIndex===-1) {
                    alert('操作有误，请刷新重试');
                    return;
                }
                this.pageData.splice(this.handleIndex,1)
                e.stopPropagation();
            },
            //添加图片
            addPic: function(e){
                var that = this;
                e.stopPropagation();
                WebViewJavascriptBridge.callHandler('selectPictureNoCrop',null,function(response) {
                    that.handleIndex++;
                    that.pageData.splice(
                        that.handleIndex===-1?0:that.handleIndex,
                        0,
                        {
                            type: "img",
                            url: response
                        }
                    );
                });
            },
            //选中编辑
            mark: function(e){
                let markIndex = e.target.dataset.index===undefined?-9:~~e.target.dataset.index;
                if (markIndex===-9) {
                    this.handleIndex = -1;
                    return;
                }
                if (this.pageData[markIndex].type==="words") {
                    this.handleIndex = markIndex;
                    return;
                }
                if (this.pageData[markIndex].type==="img"&&this.handleIndex===markIndex) {
                    this.handleIndex = -1;
                    return;
                }
                this.handleIndex = markIndex;
            },
            //添加文字
            addWords: function(e){
                this.handleIndex++;
                this.pageData.splice(
                    this.handleIndex===-1?0:this.handleIndex,
                    0,
                    {
                        type: "words",
                        content: ""
                    }
                );
                setTimeout(()=>{
                    this.autoHeight();
                },500);
                e.stopPropagation();
            },
            //离开时保存样式
            blur: function(item,$event){
                let height = $event.target.style.height;
                item.height =  height.substring(0,height.length-2)/this.htmlHeight*75;
                console.log(this.pageData);
            },
            focus: function(index,$event){
                this.handleIndex = index;
            },
            //文本框高度自适应
            autoHeight: function(){
                let eles = document.getElementsByTagName('textarea');
                for (var i = 0; i < eles.length; i++) {
                    _tool.autoTextarea(eles[i]);
                }
                // _tool.autoTextarea(ele);
            },
            //保存模板信息
            saveTemplate: function(){
                api.saveProductTemplate("post",{templateCode: this.templateCode,productCode: this.productCode,templateEditContent: JSON.stringify(this.pageData)},this.token).then((res) => {
                    if(res.returnCode==="0"){
                        alert('编辑信息保存成功，下次可继续编辑');
                        if(exit===true){
                            this.$router.back();
                        }
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
            },
            //发布
            savePic: function(){
                var prefix = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1\"><title>商品详情</title><style type=\"text/css\" media=\"screen\">html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,menu,nav,output,ruby,section,summary,time,mark,audio,video,input{margin:0;padding:0;border:0;font-weight:400;vertical-align:baseline}html,body{width:100%}a{text-decoration:none;color:#333}a:hover{text-decoration:none;color:#333}a:hover img{border:none}.contain{width:100%;overflow-x:hidden;overflow-y:auto;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.contain .item{display:block;width:100%}.contain .item .words-box{display:block;width:100%}.contain .item .words-box textarea{display:block;resize:none;font-size:.28rem;line-height:.3566rem;color:#1b1b1b;width:100%}.contain .item .img-box{display:block;width:100%}.contain .item .img-box img{display:block;width:100%}textarea{outline:0;resize:none;background:0 0;border:none;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;-o-appearance:none;appearance:none}</style></head><body><div class=\"contain\">";
                var profix = '</div></body></html>';
                var htmlStr =  '';
                htmlStr += prefix;
                for (var i = 0; i < this.pageData.length; i++) {
                    if (this.pageData[i].type==="img") {
                        htmlStr += '<div class="item img">';
                        htmlStr += '<div class="img-box">';
                        htmlStr += '<img src="' + this.pageData[i].url + '" alt="">';
                        htmlStr += '</div>';
                        htmlStr += '</div>';
                    }
                    if (this.pageData[i].type==="words") {
                        htmlStr += '<div class="item words">';
                        htmlStr += '<div class="words-box">';
                        htmlStr += '<textarea name="" class="" style="height:' + (this.pageData[i].height?this.pageData[i].height:36)/75 + 'rem" readonly="readonly">' + this.pageData[i].content + '</textarea>';
                        htmlStr += '</div>';
                        htmlStr += '</div>';
                    }
                }
                htmlStr += profix;
                var jsonData = this.pageData;
                //保存信息
                api.saveProductTemplate("post",{templateCode: this.templateCode,productCode: this.productCode,templateEditContent: JSON.stringify(this.pageData)},this.token).then((res) => {
                    if(res.returnCode==="0"){

                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
                //发布详情
                api.publishProduct("post",{
                    templateCode: this.templateCode,
                    productCode: this.productCode,
                    productDetailHtml: htmlStr,
                    productDetailJson: JSON.stringify(jsonData)
                },this.token).then((res) => {
                    if(res.returnCode==="0"){
                        alert("发布完成");
                        WebViewJavascriptBridge.callHandler('backToList',null,function() {});
                        this.fullscreenLoading = false;
                    }else{
                        //错误处理
                        this.fullscreenLoading = false;
                        alert(res.message);
                    }
                });
            },
            //返回上一级
            goBack: function(){
                this.$router.replace("/selectTemplate?productCode=" + this.productCode + "&id=" +  + this.id + "&token=" + this.token);
            },
            //拉取已编辑信息
            getPenTemplateInfo: function () {
                api.getPenTemplateInfo("get",{templateCode: this.templateCode,productCode: this.productCode},this.token).then((res) => {
                    if(res.returnCode==="0"){
                        if (res.returnContent!==null) {
                            this.pageData = JSON.parse(res.returnContent.templateEditContent);
                            setTimeout(()=>{
                                this.autoHeight();
                            },1000);
                        }
                    }else{
                        //错误处理
                        alert(res.message);
                    }
                });
            },
            //显示操作框
            setHandleLine(name){
                this.showHandleLine = name;
            },
            cancleHandleLine(){
                this.showHandleLine = "";
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
            let fontSize = document.getElementsByTagName('html')[0].style.fontSize;
            this.htmlHeight = fontSize.substring(0,fontSize.length-2);
            //获取详情
            this.getPenTemplateInfo();
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
    @import '../../../../assets/css/function';
    .tp_003{
        height: 101%;
        padding-top: px2rem(80px);
        .page-header{
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
                color: #c0c0c0;
            }
            p{
                font-size: px2rem(28px);
                color: #292929;
            }
        }
        .handle{
            position: fixed;
            top: px2rem(80px);
            left: 0;
            width: px2rem(750px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            background-color: #2f2f2f;
            z-index: 3;
            &.second{
                top: px2rem(160px);
                background-color: #7e8c8d;
                .item{
                    width: px2rem(210px);
                    margin: px2rem(5px) 0 0 px2rem(25px);
                }
            }
            .item{
                display: inline-block;
                width: px2rem(160px);
                height: px2rem(80px);
                margin: px2rem(5px) 0 0 px2rem(22px);
                font-size: px2rem(46px);
                line-height: px2rem(80px);
                color: #FFF;
                text-align: center;
            }
        }
        .editArea{
            position: relative;
            padding-top: px2rem(100px);
            &.handling{
                padding-top: px2rem(180px);
            }
            //通用定义
            .border{
                outline: 1px dashed #3089dc;
            }
            .img {
                width: 100%;
                .img-box {
                    width: 100%;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }
            .words {
                width: 100%;
                .words-box {
                    width: 100%;
                    textarea{
                        display: block;
                        width: 100%;
                        resize: none;
                        font-size: px2rem(21px);
                        line-height: px2rem(26px);
                        height: px2rem(26px);
                        color:#1b1b1b;
                    }
                }
            }
        }
    }
</style>
