<template>
    <div class="midyear-boss-intro">
        <activityHeader type="app" title="超级会员招募季"></activityHeader>
        <div class="main-container">
            <div class="main-content">
                <img src="/static/images/activity/applet/midyear/intro_header.png" alt="" class="header">
                <div class="act-time">
                    <div class="time-contain">
                        <p>巅峰让利招募 超值会员服务</p>
                        <!-- <p><span>2018年7月30日</span>到<span>8月20日</span>正式开启</p> -->
                    </div>
                </div>
                <div class="gift-contain">
                    <img src="/static/images/activity/applet/midyear/content_bg.png" alt="" class="header">
                    <div class="actcontent-box out-box">
                        <img src="/static/images/activity/applet/midyear/content_title.png" alt="" class="title">
                        <div class="box">
                            <p class="" v-if="activityInfo.goodsCode==='001'">消费者在线支付{{activityInfo.couponPrice}}元，获得价值398元韩国原装进口3D瘦脸仪一个以及一张{{activityInfo.couponMoney}}元的门店代金券一张，消费者到店领取美容仪。</p>
                             <p class="detail" v-else>消费者在线支付{{activityInfo.couponPrice}}元，送{{activityInfo.couponMoney}}现金抵用券（每人仅限使用1张）送价值298员健康保健枕；送价值298元私人大礼包；送100%中奖机会一次，最高10倍免单免费领取。</p>
                        </div>
                    </div>
                    <div class="rules-box out-box">
                        <img src="/static/images/activity/applet/midyear/rules_title.png" alt="" class="title">
                        <div class="box">
                            <p>一、每个导购每成交一个会员奖励{{activityInfo.staffShareBonus}}元</p>
                            <p>二、会员通过哪位导购分享的链接加入的会员奖励就给哪位导购</p>
                        </div>
                    </div>
                    <div class="gift-box out-box">
                        <img src="/static/images/activity/applet/midyear/product_title.png" alt="" class="title">
                        <div class="box" v-if="activityInfo.goodsCode==='001'">
                            <img src="/static/images/activity/applet/midyear/functions.jpg" alt="" class="functions">
                            <img src="/static/images/activity/applet/midyear/uses.jpg" alt="" class="uses">
                        </div>
                        <div class="box pillow-box" v-else>
                            <img src="/static/images/activity/applet/midyear/functions_pillow.jpg" alt="" class="functions_pillow">
                            <img src="/static/images/activity/applet/midyear/functions_pillow_2.jpg" alt="" class="functions_pillow">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-contain">
            <div class="share-btn btn" @click="getShareImg">会员分享</div>
            <div class="exchange-btn btn" @click="routerLink('/activity_2018/midyear_guide_checkprize')">礼品兑换</div>
        </div>
        <div class="popWindow" v-if="showShare">
            <div class="mask">
                <div class="share-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showShare=false;">
                    <img :src="shareImg" alt="" class="shareImg">
                    <div class="pop-btn-contain">
                        <div class="share-btn btn" @click="savePic">保存图片</div>
                        <div class="exchange-btn btn" @click="doShare">链接分享</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import midyearApi from '../../../../fetch/midyear_api'
    import * as _tool from "../../../../util/tool"
    import _urlConfig from "../../../../util/urlConfig"
    import activityHeader from "@/components/common/activityHeader"
    import loading from '@/components/common/loading'

    export default {
        components:{
            "v-loading": loading,
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "f2ff673d880511e88e64704d7b87a020",
                showShare: false,
                shareContent: {
                    title: "超级会员巅峰让利",
                    content: "不是所有人都有资格加入超级会员，但是你，被选中了!入会即送女性必备3D瘦脸仪",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/midyear_index",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                shareBgSrc: "https://static.storeer.com/activity_2018/guide/midyear_share_bg.jpg?k=1",
                qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/midyear_index",
                shareImg: "",
                activityInfo: {},
                loading: false
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                midyearApi.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
            },
            //获取分享内容
            getShareImg(){
                this.loading = true;
                if (this.shareImg!=="") {
                    this.loading = false;
                    this.showShare = true;
                    return;
                }
                midyearApi.activityShareImage("post",{
                    activityCode: this.activityCode,
                    backgroundImgUrl: this.shareBgSrc,
                    startX: 228,
                    startY: 429,
                    qrContent: this.qrCode,
                    qrWidth: 296,
                    qrHeight: 296,
                },this.token).then((res)=>{
                    this.loading = false;
                    if(res.returnCode==="0"){
                        this.showShare = true;
                        this.shareImg = res.returnContent;
                    }else{
                        alert(res.message);
                    }
                });
            },
            //保存图片到本地
            savePic: function(){
                WebViewJavascriptBridge.callHandler('savePic',this.shareImg,function(response) {

                });
            },
            //分享
            doShare: function(){
                this.collect({
                    "xdCode": "XD0007",
                    "ydCode": "YD0010",
                    "activityCode": this.activityCode
                });
                WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
                    alert("分享成功");
                });
            },
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            getShopGuideInfo: function(){
                midyearApi.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.shareContent.content = `不是所有人都有资格加入超级会员，但是你，被选中了!入会即送${this.activityInfo.goodsCode==='001'?'女性必备3D瘦脸仪':'健康保健枕'}`;
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/midyear_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0001";
                    }else{
                        alert(res.message);
                    }
                });
            },
            getActivityInfo(){
                midyearApi.activityInfo("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                        this.getShopGuideInfo();
                    }else{
                        alert(res.message);
                    }
                })
            }
        },
        mounted(){
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
            this.getActivityInfo();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midyear-boss-intro{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            padding-top: px2rem(80px);
            background: url(/static/images/activity/applet/midyear/intro_bg.jpg) top center no-repeat;
            background-size: 100% auto;
            background-color: #49efd0;
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                padding-bottom: px2rem(300px);
                .header{
                    display: block;
                    width: px2rem(690px);
                    margin: px2rem(28px) auto 0;
                }
                .act-time{
                    background: linear-gradient(63deg, #ff0a60, #87fede);
                    width: px2rem(678px);
                    padding: px2rem(6px);
                    border-radius: px2rem(60px);
                    margin: px2rem(15px) auto 0;
                    .time-contain{
                        border-radius: px2rem(60px);
                        overflow: hidden;
                        background-color: #6a00e1;
                        p{
                            font-size: px2rem(26px);
                            color: #fff;
                            margin: px2rem(35px) 0;
                            text-align: center;
                            span{
                                color: #7bfec8;
                            }
                        }
                    }
                }
                .gift-contain{
                    position: relative;
                    .header{
                        display: block;
                        width: 100%;
                        max-width: px2rem(750px);
                        margin: 0 auto;
                    }
                    .out-box{
                        position: relative;
                        background: linear-gradient(12deg, #890aff, #e426ba);
                        width: px2rem(632px);
                        padding: px2rem(6px);
                        border-radius: px2rem(20px);
                        margin: px2rem(152px) auto 0;
                        z-index: 9;
                        &.actcontent-box{
                            margin: px2rem(-506px) auto 0;
                        }
                        .title{
                            position: absolute;
                            top: px2rem(-100px);
                            left: px2rem(198px);
                            width: px2rem(250px);
                            z-index: 10;
                        }
                        .box{
                            position: relative;
                            background-color: #fff;
                            border-radius: px2rem(20px);
                            overflow: hidden;
                            padding: px2rem(50px) 0;
                            p{
                                font-size: px2rem(24px);
                                color: #5c00bb;
                                line-height: px2rem(60px);
                                padding: 0 px2rem(50px);
                            }
                            &.pillow-box{
                                padding: px2rem(60px) 0 px2rem(50px);
                            }
                            .functions{
                                width: 100%;
                                margin: px2rem(30px) 0 px2rem(7px);
                            }
                            .uses{
                                width: 100%;
                                margin: px2rem(7px) 0 px2rem(30px);
                            }
                            .functions_pillow{
                                display: block;
                                width: px2rem(595px);
                                margin: 0 auto;
                            }
                        }
                    }
                }
            }
        }
        .btn-contain{
            position: fixed;
            bottom: px2rem(50px);
            left: 50%;
            width: px2rem(632px);
            transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            z-index: 9;
            .btn{
                width: 100%;
                height: px2rem(90px);
                line-height: px2rem(90px);
                box-shadow: 0 px2rem(16px) px2rem(24px) px2rem(5px) rgba(60,105,114,.3);
                font-size: px2rem(32px);
                color: #fff;
                text-align: center;
                border-radius: px2rem(100px);
            }
            .share-btn{
                background: linear-gradient(-90deg, #ed0567, #f9c908);
            }
            .exchange-btn{
                margin-top: px2rem(30px);
                background: linear-gradient(-90deg, #33dbff, #ff3b93);
            }
        }
        .popWindow{
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
            .pop-contain{
                position: absolute;
                top: 50%;
                left: 50%;
                width: px2rem(674px);
                transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
                overflow: hidden;
                background-color: #fff;
                border-radius: px2rem(16px);
                .rules-contain{
                   /* border-radius: px2rem(8px);
                    padding-bottom: px2rem(54px);*/
                    max-height: px2rem(760px);
                    overflow: auto;
                    p{
                        font-size: px2rem(24px);
                        color: #202125;
                        line-height: px2rem(60px);
                        padding: 0 px2rem(40px);
                        margin-bottom: px2rem(75px);
                        .orange{
                            color: #f07511;
                            font-size: px2rem(36px);
                        }
                        &.title{
                            width: px2rem(260px);
                            height: px2rem(124px);
                            margin: px2rem(30px) auto;
                            background: url(/static/images/activity/boss/midyear/title_bg.png) center no-repeat;
                            background-size: 100% 100%;
                            line-height: px2rem(114px);
                            text-align: center;
                            text-indent: px2rem(-20px);
                            font-size: px2rem(24px);
                            color: #fff;
                        }
                    }
                }
                .close{
                    position: absolute;
                    top: px2rem(40px);
                    right: px2rem(30px);
                    width: px2rem(30px);
                    height: px2rem(30px);
                    z-index: 9;
                }
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    line-height: px2rem(116px);
                    text-align: center;
                }
            }
            .share-contain{
                position: absolute;
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                background: transparent;
                .shareImg{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    -o-transform: translate(-50%,-50%);
                    -moz-transform: translate(-50%,-50%);
                    -webkit-transform: translate(-50%,-50%);
                    width: px2rem(426px);
                    height: px2rem(757px);
                    z-index: 8;
                }
                .pop-btn-contain{
                    position: absolute;
                    bottom: px2rem(50px);
                    left: 50%;
                    overflow: hidden;
                    width: px2rem(572px);
                    transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    -o-transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    z-index: 9;
                    .btn{
                        width: px2rem(260px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        /*margin: px2rem(60px) auto px2rem(114px);*/
                        background-color: #f12166;
                        font-size: px2rem(32px);
                        color: #fff;
                        text-align: center;
                        border-radius: px2rem(100px);
                    }
                    .share-btn{
                        float: left;
                    }
                    .exchange-btn{
                        float: right;
                    }
                }
            }
        }
    }
</style>
