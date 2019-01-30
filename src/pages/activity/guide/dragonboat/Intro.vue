<template>
    <div class="dragonboat-boss-intro">
        <activityHeader type="app" title="端午活动"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/boss/dragonboat/intro_bg.jpg" class="main_bg" alt="">
            <div class="main-content">
                <div class="act-time">
                    <p>端午节活动时间：</p>
                    <p>2018年6月6日 — 6月18日</p>
                </div>
                <div class="act-container act-content">
                    <div class="title">活动内容</div>
                    <p><span class="green">消费者在线支付{{this.activityInfo.couponPrice}}元，获得一盒价值80元的设计师独立设计端午粽子一盒以及单张价值{{this.activityInfo.couponMoney}}元的门店代金券三张，消费者到店领取粽子，每件衣服只限使用代金券一张；</span></p>
                    <div class="view-rules" @click="showRules=true;">查看活动规则</div>
                </div>
                <div class="act-container act-product">
                    <div class="title">活动商品</div>
                    <div class="intro-video">
                        <video controls="" name="media" poster="https://img.alicdn.com/imgextra/i3/6000000005918/TB2iWpUfFooBKNjSZFPXXXa2XXa_!!6000000005918-0-tbvideo.jpg_600x600.jpg">
                            <source src="https://static.storeer.com/activity_2018/boss/drangonboat_gift.mp4" type="video/mp4">
                        </video>
                    </div>
                    <img src="/static/images/activity/guide/dragonboat/gift.jpg" alt="" class="product-pic">
                    <div class="product-name">如果似花嘉兴粽子礼盒</div>
                </div>
            </div>
        </div>
        <div class="btn-contain">
            <div class="share-btn btn" @click="getShareImg">会员分享</div>
            <div class="exchange-btn btn" @click="routerLink('/activity_2018/dragonboat_guide_checkprize')">礼品兑换</div>
        </div>
        <div class="rule-contain popWindow" v-if="showRules">
            <div class="mask" @click="showRules=false;" @touchmove="preventBgMove"></div>
            <div class="pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="showRules=false;">
                <div class="rules-contain">
                    <p class="title">活动规则</p>
                    <p>1、每个导购每销售一个名额奖励5元，会员在哪位导购的链接上支付就算哪位导购的提成；</p>
                    <p>2、本次活动销售前100名导购，且销售总数不少于14张每人将会获得200元奖励，；</p>
                </div>
            </div>
        </div>
        <div class="popWindow" v-if="showShare">
            <div class="mask">
                <div class="share-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showShare=false;">
                    <img :src="shareImg" alt="" class="shareImg">
                    <div class="btn-contain">
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
    import dragonboatApi from '../../../../fetch/dragonboat_api'
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
                activityCode: "e7aa087b5e2e11e88e64704d7b87a020",
                showRules: false,
                showShare: false,
                shareContent: {
                    title: "你没见过的粽子！",
                    content: "这样的粽子，第一次见，免费送！这样的福利，第一次见，快来领！",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/dragonboat_index",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                shareBgSrc: "https://static.storeer.com/activity_2018/guide/dragonboat_share_bg.jpg",
                qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/dragonboat_index",
                shareImg: "",
                activityInfo: {},
                loading: false
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                dragonboatApi.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
            },
            //获取分享内容
            getShareImg(){
                this.loading = true;
                if (this.shareImg!=="") {
                    this.showShare = true;
                    return;
                }
                dragonboatApi.activityShareImage("post",{
                    activityCode: this.activityCode,
                    backgroundImgUrl: this.shareBgSrc,
                    startX: 226,
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
                dragonboatApi.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/dragonboat_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0001";
                    }else{
                        alert(res.message);
                    }
                });
            },
            getActivityInfo(){
                dragonboatApi.activityInfo("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                    }else{
                        alert(res.message);
                    }
                })
            }
        },
        mounted(){
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
            this.getShopGuideInfo();
            this.getActivityInfo();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .dragonboat-boss-intro{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            padding-top: px2rem(80px);
            .main_bg{
                position: absolute;
                width: 100%;
                z-index: 1;
            }
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                .act-time{
                    margin-top: px2rem(310px);
                    p{
                        font-size: px2rem(24px);
                        color: #202125;
                        line-height: px2rem(50px);
                        text-align: center;
                    }
                }
                .act-container{
                    position: relative;
                    width: px2rem(635px);
                    &.act-content{
                        background: url(/static/images/activity/guide/dragonboat/bg_border.png) center no-repeat;
                        background-size: 100% 100%;
                        background-color: #fff;
                        margin: px2rem(490px) auto px2rem(100px);
                        padding: px2rem(40px) 0;
                    }
                    &.act-product{
                        margin: 0 auto px2rem(200px);
                    }
                    .title{
                        width: px2rem(260px);
                        height: px2rem(124px);
                        margin: 0 auto;
                        background: url(/static/images/activity/boss/dragonboat/title_bg.png) center no-repeat;
                        background-size: 100% 100%;
                        line-height: px2rem(114px);
                        text-align: center;
                        text-indent: px2rem(-20px);
                        font-size: px2rem(24px);
                        color: #fff;
                    }
                    p{
                        font-size: px2rem(24px);
                        color: #202125;
                        line-height: px2rem(60px);
                        padding: 0 px2rem(40px);
                        .green{
                            color: #0f8157;
                        }
                        .orange{
                            color: #f07511;
                        }
                        .large{
                            font-size: px2rem(36px);
                        }
                    }
                    .view-rules{
                        width: px2rem(308px);
                        height: px2rem(68px);
                        line-height: px2rem(68px);
                        background-color: #e3efe2;
                        border-radius: px2rem(200px);
                        text-align: center;
                        font-size: px2rem(26px);
                        margin: px2rem(80px) auto px2rem(40px);
                        color: #108b10;
                    }
                    .intro-video{
                        width: 100%;
                        height: px2rem(300px);
                        margin: 0 auto;
                        video{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .product-pic{
                        display: block;
                        width: 100%;
                        margin: px2rem(40px) auto;
                    }
                    .product-name{
                        width: 100%;
                        height: px2rem(58px);
                        line-height: px2rem(58px);
                        font-size: px2rem(26px);
                        color: #108b10;
                        background-color: #d1cfc8;
                        text-align: center;
                    }
                }
            }
        }
        .btn-contain{
            position: fixed;
            bottom: px2rem(50px);
            left: 50%;
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
                background: linear-gradient(-90deg, #108b10, #21c839);
                box-shadow: 0 px2rem(16px) px2rem(24px) px2rem(5px) rgba(60,105,114,.3);
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
                            background: url(/static/images/activity/boss/dragonboat/title_bg.png) center no-repeat;
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
                .btn-contain{
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
                        background-color: #4e7a11;
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
