<template>
    <div class="mayday-guide-intro">
        <activityHeader type="app" title="点亮徽章礼品免费领"></activityHeader>
        <div class="mainContent">
            <img src="/static/images/activity/boss/mayday/headpic.jpg" class="main_bg" alt="">
            <div class="act-title"><span v-if="productCode==='001'">养生茶壶五件套</span><span v-if="productCode==='002'">3D美容瘦脸仪</span>免费领</div>
            <div class="activity-time">活动时间：4月25日-5月4日</div>
            <div class="desc">
                <div class="title">------  活动内容  ------</div>
                <div class="detail" style="">五一活动为线上与门店活动相结合形式。线上通过邀请好友帮忙点亮徽章的活动形式，使老会员去邀请身边的亲朋好友成为身边店的新会员。新会员再去拉新，使会员数快速增长，同时通过到店自提精美礼品时配合门店的让利活动，将流量转化变现，带来营业收入。</div>
                <div class="view-rules" @click="showRules=true;">查看报名须知</div>
            </div>
            <div class="product">
                <img src="/static/images/activity/boss/mayday/pot.jpg" alt="" class="product-pic" v-if="productCode==='001'">
                <img src="/static/images/activity/boss/mayday/instrument.jpg" alt="" class="product-pic" v-if="productCode==='002'">
            </div>
            <div class="btn-contain">
                <div class="share-btn btn" @click="doShare">会员分享</div>
                <div class="exchange-btn btn" @click="routerLink('/activity_2018/mayday_guide_checkprize')">礼品兑换</div>
            </div>
        </div>
        <!-- 生成二维码 -->
        <div class="qrCode">
            <qr-code :text="qrCode" :size="256" class="qr_bg" id="qr_bg"></qr-code>
        </div>
        <div class="rule-contain popWindow" v-if="showRules">
            <div class="mask" @click="showRules=false;" @touchmove="preventBgMove">
                <div class="rules-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showRules=false;">
                    <p class="title">活动规则</p>
                    <div class="rules-words">
                        <p>1.导购在活动中心获取活动分享图片或链接转发至朋友圈、群、微信好友等；</p>
                        <p>2.参加活动的会员将活动分享图片或链接转发给亲朋好友帮忙点亮徽章，每个发起活动的会员在24小时内点亮5枚徽章即视为活动成功，TA将获得礼品领取码；</p>
                        <p>3.非会员的顾客接到活动链接也可以参加活动，在活动中会引导顾客关注带有导购信息的公众号，成为新会员；</p>
                        <p>4.导购转发活动图片或链接时，所有通过这条图片和链接参与活动的，都将成为导购名下的新会员；</p>
                        <p>5.礼品的兑换时间是：4月28日-5月4日（逾期不候），会员凭礼品领取码到TA所选择的门店领取礼品；</p>
                        <p>6.导购在门店后台输入领取码，进行礼品兑换；</p>
                        <p>7.礼品领取成功，每人限领一件；</p>
                        <p>8.线上奖品领取成功后，导购可以引导会员在门店购买商品，店内商品均有折扣，同时买满金额还送价值1200元的安吉高山纯手工白茶礼包（每人限领一盒）；</p>
                        <p>9.线上转发活动，每成功兑换一套礼品，导购均有奖励，具体奖励金额看老板端后台的设置而定，转发活动的导购获得奖励，由身边店直接奖励到导购绑定的支付宝账户（费用由门店承担）；</p>
                        <p>10.顾客进店消费满足条件后，每赠送一盒安吉白茶礼盒即可获得20元现金奖励，哪位导购收银就由哪位导购获得奖励，由身边店直接奖励到导购绑定的支付宝账户（费用由身边店承担）。</p>
                    </div>
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
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import api from '../../../../fetch/api'
    import maydayApi from '../../../../fetch/mayday_api'
    import * as _tool from "../../../../util/tool"
    import _urlConfig from "../../../../util/urlConfig"
    import VueQRCodeComponent from 'vue-qrcode-component'
    import loading from '@/components/common/loading'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components: {
            "v-loading": loading,
            'qr-code': VueQRCodeComponent,
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||this.$route.query.token1.replace("null?token=",""),
                type: this.$route.query.type,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                showRules: false,
                signStatus: 0,
                shareContent: {
                    title: "点亮徽章礼品免费领",
                    content: "劳动者最光荣，一起点亮荣耀徽章，精品礼品免费领。",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/mayday_index",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                productCode: "001",
                //分享图片
                showShare: false,
                shareImg: "",
                loading: false,
                // shareImgBg: "https://static.storeer.com/activity_2018/guide/mayday/share.jpg",
                shareImgBg: "/static/images/activity/guide/mayday/share.jpg",
                qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/mayday_index?storeCode=*&storeName=*",
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                api.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
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
            //保存图片到本地
            savePic: function(){
                WebViewJavascriptBridge.callHandler('savePic',this.shareImg,function(response) {

                });
            },
            //生成分享图
            makeImg: function(){
                if (this.shareImg!=="") {
                    this.showShare = true;
                    return;
                }
                this.loading = true;
                try{
                    //绘制贺卡
                    let canvas_card = document.createElement("canvas");
                    canvas_card.width = 750;
                    canvas_card.height = 1334;
                    let ctx_card = canvas_card.getContext("2d");
                    //图片绘制
                    let img_card = new Image();
                    img_card.src = this.shareImgBg;
                    img_card.crossOrigin = 'Anonymous';
                    img_card.onload = ()=>{
                        ctx_card.drawImage(img_card,0,0,750,1334,0,0,750,1334);
                        let img_qrCode = new Image();
                        img_qrCode.src = document.getElementById("qr_bg").children[1].currentSrc;
                        img_qrCode.crossOrigin = 'Anonymous';
                        img_qrCode.onload = ()=>{
                            ctx_card.fillStyle = '#fff';
                            ctx_card.fillRect(227,702,296,296);
                            ctx_card.drawImage(img_qrCode,0,0,256,256,247,722,256,256);
                            this.shareImg = canvas_card.toDataURL("image/jpeg");
                            this.loading = false;
                            this.showShare = true;
                        }
                        return;
                    }
                }catch(error){
                    alert(error)
                }
            },
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            preventBgMove(e){
                // e.preventDefault();
                e.stopPropagation();
            },
            getMayDayActivityGift(){
                maydayApi.getMayDayActivityGift("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.productCode = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            getShopGuideInfo: function(){
                api.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/mayday_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0001";
                    }else{
                        alert(res.message);
                    }
                });
            }
        },
        mounted(){
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
            this.getMayDayActivityGift();
            this.getShopGuideInfo();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .mayday-guide-intro{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            /*height: 100%;*/
            background-color: #d4333a;
            letter-spacing: px2rem(2px);
            overflow: hidden;
            padding-top: px2rem(80px);
            .main_bg{
                display: block;
                width: 100%;
            }
            .act-title{
                position: absolute;
                top: px2rem(366px);
                left: 50%;
                font-size: px2rem(32px);
                color: #c34241;
                transform: translateX(-50%);
                -o-transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                letter-spacing: px2rem(1px);
            }
            .activity-time{
                margin: px2rem(-40px) 0 px2rem(100px);
                font-size: px2rem(36px);
                color: #f3e6b6;
                text-align: center;
            }
            .desc{
                overflow: hidden;
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    text-align: center;
                    letter-spacing: px2rem(2px);
                }
                .detail{
                    width: px2rem(616px);
                    margin: px2rem(50px) auto 0;
                    line-height: px2rem(50px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    text-indent: px2rem(56px);
                    word-break: break-all;
                }
                .view-rules{
                    width: px2rem(308px);
                    height: px2rem(68px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    line-height: px2rem(68px);
                    background-color: #a42e2b;
                    border-radius: 100px;
                    margin: px2rem(80px) auto px2rem(120px);
                    text-align: center;
                }
            }
            .product{
                overflow: hidden;
                padding-bottom: px2rem(150px);
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    text-align: center;
                    letter-spacing: px2rem(2px);
                    margin-bottom: px2rem(54px);
                }
                .product-pic{
                    display: block;
                    width: 100%;
                    margin: 0 auto px2rem(34px);
                }
            }
            .btn-contain{
                position: fixed;
                bottom: px2rem(50px);
                left: 50%;
                overflow: hidden;
                width: px2rem(572px);
                transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                -o-transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                .btn{
                    width: px2rem(260px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    /*margin: px2rem(60px) auto px2rem(114px);*/
                    background-color: #ffd337;
                    font-size: px2rem(32px);
                    color: #a42e2b;
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
        .qrCode{
            position: absolute;
            top: 0;
            left: 10086px;
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
                &.rules-contain{
                    border-radius: px2rem(8px);
                    padding-bottom: px2rem(54px);
                    background: url(/static/images/activity/boss/mayday/pop_bg.jpg) center center no-repeat;
                    background-size: 100% 100%;
                    .rules-words{
                        max-height: px2rem(760px);
                        overflow-x: hidden;
                        overflow-y: auto;
                        margin-bottom: px2rem(50px);
                        p{
                            padding: 0 px2rem(38px);
                            font-size: px2rem(26px);
                            color: #f3e6b6;
                            line-height: px2rem(40px);
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
                        background-color: #ffd337;
                        font-size: px2rem(32px);
                        color: #a42e2b;
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
