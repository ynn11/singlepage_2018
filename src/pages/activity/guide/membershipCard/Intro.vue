<template>
    <div :class="'membershipCard-guide-intro ' + [showProduct?'static':'']">
        <activityHeader type="app" title="优享会员卡"></activityHeader>
        <div class="main-container">
            <div class="main-content">
                <img src="/static/images/activity/boss/membershipCard/header_bg.png" class="header_bg" alt="">
                <img src="/static/images/activity/boss/membershipCard/card.png" alt="" class="card">
                <div class="intro">
                    <p>优享会员卡<br/>亲爱的身边店合作商户导购，恭喜你，你的老板已经为你开启了会员卡优享活动，这是一个长期的活动，会员卡有效期一年，可以使用门店范围是你老板旗下所有参加本次活动的门店，如果你的会员帮助你介绍会员，那么他也将得到奖励。</p>
                </div>
                <div class="product-contain" @click="showProduct=true;">
                    <h6>点击图片，查看活动商品组合</h6>
                    <div class="product-info">
                        <img :src="activityInfo.productPicUrls[0]" alt="" class="product-pic">
                        <p class="product-name">{{activityInfo.productName}}</p>
                    </div>
                </div>
                <div class="btn-contain">
                    <div class="clear">
                        <div class="share-btn btn" @click="getShareImg">马上告诉会员</div>
                        <div class="exchange-btn btn" @click="routerLink('/activity_2018/mscard_guide_checkprize')">会员进店领取</div>
                    </div>
                    <div class="viewdata-btn btn large" @click="routerLink('/activity_2018/mscard_guide_data')">查看我的数据</div>
                </div>
            </div>
        </div>
        <div class="popWindow" v-if="showProduct">
            <div class="mask" @click="showProduct=false;"></div>
            <div class="pop-header">
                <div class="header-icon" @click="showProduct=false;"><i class="iconfont icon-fanhui"></i></div>
                <div class="header-cont"><p>商品详情</p></div>
            </div>
            <div class="product-contain pop-contain">
                <img :src="activityInfo.productDetailJson" alt="" class="product-detail-pic">
            </div>
        </div>
        <div class="popWindow" v-if="showShare">
            <div class="mask"></div>
            <div class="share-contain pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="showShare=false;">
                <img :src="shareImg" alt="" class="shareImg">
                <div class="btn-contain">
                    <div class="share-btn btn" @click="savePic">保存图片</div>
                    <div class="exchange-btn btn" @click="doShare">链接分享</div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import * as _tool from "../../../../util/tool"
    import membershipCardApi from '../../../../fetch/membershipCard_api'
    import activityHeader from "@/components/common/activityHeader"
    import _urlConfig from "../../../../util/urlConfig"
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
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                showProduct: false,
                showShare: false,
                loading: false,
                shareContent: {
                    title: "你被卡了",
                    content: "神奇的卡住了你，别点开，真的会卡住你！",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/mscard_index",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                shareBgSrc: "https://static.storeer.com/activity_2018/guide/membershipcard_share_bg.jpg",
                qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/mscard_index",
                shareImg: "",
                activityInfo: {
                    productPicUrls: []
                }
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                membershipCardApi.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
            },
            //获取分享内容
            getShareImg(){
                this.loading = true;
                if (this.shareImg!=="") {
                    this.showShare = true;
                    this.loading = false;
                    return;
                }
                membershipCardApi.activityShareImage("post",{
                    activityCode: this.activityCode,
                    backgroundImgUrl: this.shareBgSrc,
                    startX: 178,
                    startY: 760,
                    qrContent: this.qrCode,
                    qrWidth: 390,
                    qrHeight: 390,
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
                membershipCardApi.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/mscard_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0001";
                    }else{
                        alert(res.message);
                    }
                });
            },
            getActivityInfo(){
                membershipCardApi.activityInfo("post",{
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
        created(){
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
            this.getShopGuideInfo();
            this.getActivityInfo();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membershipCard-guide-intro{
        position: relative;
        &.static{
            overflow: hidden !important;
        }
        .main-container{
            position: relative;
            letter-spacing: px2rem(2px);
            background: url(/static/images/activity/boss/membershipCard/zebracrossing.jpg) center repeat-y;
            background-size: 100% auto;
            padding-top: px2rem(80px);
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                .header_bg{
                    display: block;
                    width: 100%;
                }
                .card{
                    display: block;
                    width: px2rem(693px);
                    margin: px2rem(40px) auto;
                }
                .intro{
                    background-color: #fe2b56;
                    padding: px2rem(32px);
                    width: px2rem(650px);
                    margin: 0 auto;
                    box-sizing: border-box;
                    border-radius: px2rem(12px);
                    p{
                        line-height: px2rem(46px);
                        font-size: px2rem(26px);
                        color: #fff;
                    }
                }
                .product-contain{
                    width: px2rem(650px);
                    margin: px2rem(40px) auto;
                    border-radius: px2rem(12px);
                    overflow: hidden;
                    background-color: #fe2b56;
                    h6{
                        line-height: px2rem(70px);
                        font-size: px2rem(26px);
                        color: #fff;
                        background-color: #d50d36;
                        padding: 0 px2rem(20px);
                    }
                    .product-info{
                        background-color: #fe2b56;
                        display: table;
                        width: 100%;
                        .product-pic{
                            display: block;
                            width: px2rem(216px);
                            height: px2rem(180px);
                            margin: px2rem(20px);
                            background-color: #fff;
                            border-radius: px2rem(12px);
                        }
                        .product-name{
                            display: table-cell;
                            line-height: px2rem(46px);
                            font-size: px2rem(26px);
                            color: #fff;
                            padding: 0 px2rem(40px);
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        .btn-contain{
            overflow: hidden;
            width: px2rem(650px);
            margin: px2rem(100px) auto;
            .btn{
                width: px2rem(305px);
                height: px2rem(88px);
                line-height: px2rem(88px);
                /*margin: px2rem(60px) auto px2rem(114px);*/
                background-color: #fe2b56;
                font-size: px2rem(32px);
                color: #fff;
                text-align: center;
                border-radius: px2rem(100px);
            }
            .clear{
                overflow: hidden;
            }
            .share-btn{
                float: left;
            }
            .exchange-btn{
                float: right;
            }
            .viewdata-btn{
                width: 100%;
                margin-top: px2rem(60px);
                overflow: hidden;
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
            //假顶栏
            .pop-header{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: px2rem(80px);
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
            .product-contain{
                width: 100%;
                height: 100%;
                overflow-y: auto;
                border-radius: 0;
                padding-top: px2rem(80px);
                box-sizing: border-box;
                .product-detail-pic{
                    display: block;
                    width: 100%;
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
                        background-color: #fe2b56;
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
