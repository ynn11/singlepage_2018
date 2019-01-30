<template>
    <div class="guide-october-box">
        <div class="mainContent">
            <img src="/static/images/activity/applet/buyCoupons/bought_bg.jpg" class="main_bg" alt="">
            <div class="success-content">
                <p class="store-info">
                    亲，您已成功购买<span class="yellow">{{activityInfo.storeName}}</span>
                    <span v-if="activityInfo.voucherCode==='e47605d8d3514fa09c2b30e55c55f915'">30抵<span class="yellow">100</span></span>
                    <span v-if="activityInfo.voucherCode==='3740359ecdce11e78c93704d7b87a020'">60抵<span class="yellow">200</span></span>
                    元代金券, <br>快去门店消费吧！<br>门店地址：{{activityInfo.connectAddress}}
                </p>
                <img src="/static/images/activity/applet/buyCoupons/mygifts_tit.png" alt="" class="mygifts-tit">
                <img src="/static/images/activity/applet/buyCoupons/select_tip.png" alt="" class="select-tip" v-if="activityInfo.voucherCode==='e47605d8d3514fa09c2b30e55c55f915'">
                <img src="/static/images/activity/applet/buyCoupons/both_tip.png" alt="" class="select-tip" v-if="activityInfo.voucherCode==='3740359ecdce11e78c93704d7b87a020'">
                <div class="gitfts-box">
                    <div class="item item1">
                        <img src="/static/images/activity/applet/buyCoupons/gift1.jpg" alt="">
                        <p>198元脸部按摩器</p>
                    </div>
                    <div class="item item2">
                        <img src="/static/images/activity/applet/buyCoupons/gift2.jpg" alt="">
                        <p>218元超声波电动牙刷</p>
                    </div>
                </div>
                <p class="share-tip">把这个好消息分享给你的朋友，就能获得精美大礼哦！</p>
                <div class="share-btn" @click="shareTipShow=true;" v-if="activityInfo.isAlreadyShare===0">分享有惊喜</div>
                <div class="share-btn" @click="rebateRouter" v-else>查看我的返利</div>
            </div>
        </div>
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
        <div :class="'rebateList-box ' + transform" v-if="showRebateList">
            <div class="mask"></div>
            <div class="content-contain">
                <div class="rebateList">
                    <div :class="'list-wrap ' + transform">
                        <div v-for="(item,index) in activityInfo.activityInfo.invitedRewardList" class="list-contain" v-if="item.isOpen===0">
                            <div class="item" v-if="item.voucherCode==='e47605d8d3514fa09c2b30e55c55f915'">
                                <img src="/static/images/activity/applet/buyCoupons/rebate_5.png" alt="" class="bg">
                                <p class="value">5.00元</p>
                                <p class="info"><img :src="item.headPicUrl" alt="" class="headPic">{{item.nickName}}</p>
                                <p class="tip">购买了代金券，并送了您一个红包</p>
                            </div>
                            <div class="item" v-if="item.voucherCode==='3740359ecdce11e78c93704d7b87a020'">
                                <img src="/static/images/activity/applet/buyCoupons/rebate_10.png" alt="" class="bg">
                                <p class="value">10.00元</p>
                                <p class="info"><img :src="item.headPicUrl" alt="" class="headPic">{{item.nickName}}</p>
                                <p class="tip">购买了代金券，并送了您一个红包</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="getReward" @click="pickUpRedPacket">领红包<span :class="'light ' + transform"></span></div>
            </div>
        </div>
        <!-- 分享成功 -->
        <div class="shareSuccess popWindow" v-show="shareSuccessShow">
            <div class="mask" @click="shareSuccessShow=false;"></div>
            <div class="shareSuccess-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/buyCoupons/share_success.png" alt="">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="shareSuccessShow=false;">
                <div class="btn-contain">
                    <div class="btn btn-bind" @click="rebateRouter">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import wxShareTip from "@/components/common/wxShareTip"

    import api from '../../../../fetch/api'
    import * as _tool from "../../../../util/tool"
    import _urlConfig from "../../../../util/urlConfig"
    export default {
        components: {
            wxShareTip
        },
        //判断登录
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                if(sessionStorage.entryMark !== "marked"){
                    sessionStorage.entryMark = "marked"
                    vm.$router.go(0);
                    return;
                }
            })
        },
        computed: {
            tokenInfo () {
                let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
                return tokenInfo
            },
            openId(){
                let openId = this.$store.state.user.openId;
                return openId;
            }
        },
        data() {
            return {
                xd_code: this.$route.query.xd_code,
                shareTipShow: false,
                activityInfo: {},
                showRebateList: false,
                shareSuccessShow: false,
                transform: "",
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
            },
            //rebateRouter
            rebateRouter: function(){
                let src = "/activity/coupons_rebate?xd_code=" + this.xd_code;
                this.$router.push({
                    "path": src
                });
            },
            //领取红包
            pickUpRedPacket: function(){
                api.pickUpRedPacket("get",{},this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.transform = "running";
                        setTimeout(()=>{
                            this.showRebateList = false;
                            this.rebateRouter();
                        },2200);
                    }else{
                        alert(res.message);
                    }
                })
            },
            //是否参加活动
            whetherAttend: function(){
                api.whetherAttendArtifactActivity("get",{},this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        //未参加跳转至介绍页
                        if (res.returnContent.attendFlag===0) {
                            let src = "/activity/coupons_introduce?xd_code=" + this.xd_code;
                            this.$router.replace(src);
                            return;
                        }
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0009",
                            "activityCode": "b94f745886cb42219d22250d4bb51f47",
                            "openId": this.openId
                        });
                        this.activityInfo = res.returnContent;
                        this.initWxShare();
                        if (this.activityInfo.activityInfo!==null&&this.activityInfo.activityInfo.hasNotOpened!==0) {
                            this.showRebateList = true;
                        }
                    }else if(res.returnCode==="10"){
                        let href = location.origin + location.pathname + "?xd_code=" + this.xd_code;
                        location.href = _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                    }else{
                        alert(res.message);
                    }
                })
            },
            //分享完成
            shareArtifactActivity: function(){
                api.shareArtifactActivity("get",{id: this.activityInfo.id},this.tokenInfo.token).then((res)=>{
                    if (res.returnCode==="0") {
                        this.activityInfo.isAlreadyShare = 1;
                        this.shareSuccessShow = true;
                    }else{
                        alert(res.message);
                    }
                });
            },
            //初始化分享
            initWxShare: function(){
                let _this = this;
                window.wx.ready(function(){
                    // wx.showMenuItems({
                    //     menuList: [
                    //         "menuItem:share:appMessage",
                    //         "menuItem:share:timeline"
                    //     ] // 要显示的菜单项，所有menu项见附录3
                    // });
                    wx.onMenuShareAppMessage({
                        title: '超值礼包免费送，立即领取！', // 分享标题
                        desc: '198瘦脸神器和218电动牙刷免费送，邀请好友参加，还有惊喜等着您！赶紧和好友一起分享吧！', // 分享描述
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity/coupons_introduce?xd_code=XD0005&storeCode=' + _this.activityInfo.storeCode + '&staffCode=' + _this.activityInfo.staffCode + '&memberCode=' + _this.activityInfo.memberCode), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0008",
                                "activityCode": "b94f745886cb42219d22250d4bb51f47",
                                "openId": _this.openId
                            });
                            // 用户确认分享后执行的回调函数
                            if (_this.activityInfo.isAlreadyShare === 0) {
                                _this.shareArtifactActivity();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: '超值礼包免费送，立即领取！', // 分享标题
                        desc: '198瘦脸神器和218电动牙刷免费送，邀请好友参加，还有惊喜等着您！赶紧和好友一起分享吧！', // 分享描述
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity/coupons_introduce?xd_code=XD0005&storeCode=' + _this.activityInfo.storeCode + '&staffCode=' + _this.activityInfo.staffCode + '&memberCode=' + _this.activityInfo.memberCode), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        success: function () {
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0008",
                                "activityCode": "b94f745886cb42219d22250d4bb51f47",
                                "openId": _this.openId
                            });
                            // 用户确认分享后执行的回调函数
                            if (_this.activityInfo.isAlreadyShare === 0) {
                                _this.shareArtifactActivity();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            //初始化微信
            initWxConfig(){
                api.getSignMap("post",{url: location.href}).then(res => {
                    let content = res.returnContent;
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: content.appId, // 必填，公众号的唯一标识
                        timestamp: content.timestamp, // 必填，生成签名的时间戳
                        nonceStr: content.nonceStr, // 必填，生成签名的随机串
                        signature: content.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','showMenuItems','hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    // window.wx.ready(function(){
                    //     // 邀请成功前屏蔽所有按钮
                    //     window.wx.hideOptionMenu();
                    // });
                });
            },
        },
        mounted(){
            if(sessionStorage.entryMark !== "marked"){
                return;
            }
            this.initWxConfig();
            this.whetherAttend();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    @keyframes scale
    {
        0%   {
            transform: scale(1);
            opacity: 0;
        }
        25%  {
            transform: scale(3.6);
            opacity: .3;
        }
        50%  {
            transform: scale(4.5);
            opacity: .2;
        }
        75%  {
            transform: scale(4.5);
            opacity: .2;
        }
        100% {
            transform: scale(3.6);
            opacity: 0;
        }
    }
    @keyframes jump
    {
        0%   {
            top: 0;
            left: 0;
            transform: scale(1);
            opacity: 1;
        }
        25{
            top: -10%;
            left: 5%;
            transform: scale(.5);
            opacity: .8;
        }
        50%{
            top: -20%;
            left: 10%;
            transform: scale(.5);
            opacity: .6;
        }
        // 75%{
        //     top: 30%;
        //     left: 15%;
        //     transform: scale(.5);
        //     opacity: 1;
        // }
        100% {
            top: 80%;
            left: 20%;
            transform: scale(.1);
            opacity: 0;
        }
    }
    @keyframes fade
    {
        0%   {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .guide-october-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            height: 100%;
            .main_bg{
                display: block;
                width: 100%;
            }
            .success-content{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                color: #fff;
                .store-info{
                    margin-top: px2rem(525px);
                    font-size: px2rem(24px);
                    line-height: px2rem(36px);
                    text-align: center;
                    .yellow{
                        color: #fff000;
                    }
                }
                .mygifts-tit{
                    display: block;
                    width: px2rem(750px);
                    margin: px2rem(70px) auto 0;
                }
                .select-tip{
                    display: block;
                    width: px2rem(340px);
                    margin: px2rem(40px) auto 0;
                }
                .gitfts-box{
                    position: relative;
                    overflow: hidden;
                    width: px2rem(560px);
                    margin: px2rem(55px) auto 0;
                    .item{
                        float: left;
                        width: px2rem(240px);
                        &.item2{
                            float: right;
                        }
                        img{
                            display: block;
                            width: 100%;
                            border-radius: px2rem(8px);
                        }
                        p{
                            margin-top: px2rem(32px);
                            font-size: px2rem(24px);
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
                .share-tip{
                    margin-top: px2rem(80px);
                    font-size: px2rem(24px);
                    text-align: center;
                }
                .share-btn{
                    position: relative;
                    margin: px2rem(70px) auto 0;
                    width: px2rem(614px);
                    height: px2rem(119px);
                    line-height: px2rem(119px);
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    background: url(/static/images/activity/applet/buyCoupons/btn_bg.png);
                    background-size: contain;
                    border-radius: px2rem(100px);
                }
            }
        }
        .rebateList-box{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            &.running{
                animation: fade 1000ms linear;
                -moz-animation: fade 1000ms linear;
                -webkit-animation: fade 1000ms linear;
                -o-animation: fade 1000ms linear;
                animation-delay: 1200ms;
                -moz-animation: 1200ms;
                -webkit-animation-delay: 1200ms;
                -o-animation: 1200ms;
                animation-fill-mode: forwards;
                -moz-animation-fill-mode: forwards;
                -webkit-animation-fill-mode: forwards;
                -o-animation-fill-mode: forwards;
            }
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.6);
            }
            .content-contain{
                position: relative;
                height: 100%;
                .rebateList{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: px2rem(120px);
                    .list-wrap{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        &.running{
                            animation: jump 1000ms linear;
                            -moz-animation: jump 1000ms linear;
                            -webkit-animation: jump 1000ms linear;
                            -o-animation: jump 1000ms linear;
                            animation-delay: 600ms;
                            -moz-animation: 600ms;
                            -webkit-animation-delay: 600ms;
                            -o-animation: 600ms;
                            animation-fill-mode: forwards;
                            -moz-animation-fill-mode: forwards;
                            -webkit-animation-fill-mode: forwards;
                            -o-animation-fill-mode: forwards;
                        }
                    }
                    .list-contain{
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 100%;
                        max-height: 100%;
                        overflow-x: hidden;
                        overflow-y: auto;
                        scroll-behavior: smooth;
                        -webkit-overflow-scrolling : touch;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        .item{
                            position: relative;
                            width: px2rem(750px);
                            margin: px2rem(30px) auto 0;
                            overflow: hidden;
                            .bg{
                                display: block;
                                width: 100%;
                            }
                            .value{
                                position: absolute;
                                top: px2rem(182px);
                                left: px2rem(70px);
                                width: px2rem(145px);
                                text-align: center;
                                font-size: px2rem(24px);
                                color: #ff5c52;
                            }
                            .info{
                                position: absolute;
                                top: px2rem(94px);
                                left: px2rem(250px);
                                overflow: hidden;
                                line-height: px2rem(68px);
                                font-size: px2rem(24px);
                                color: #fff;
                                .headPic{
                                    float: left;
                                    width: px2rem(68px);
                                    height: px2rem(68px);
                                    border-radius: 50%;
                                    background-color: #fff;
                                    margin-right: px2rem(15px);
                                }
                            }
                            .tip{
                                position: absolute;
                                top: px2rem(194px);
                                left: px2rem(250px);
                                font-size: px2rem(24px);
                                color: #fff;
                            }
                        }
                    }
                }
                .getReward{
                    position: absolute;
                    bottom: px2rem(100px);
                    left: 50%;
                    margin-left: px2rem(-307px);
                    width: px2rem(614px);
                    height: px2rem(119px);
                    line-height: px2rem(119px);
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    background: url(/static/images/activity/applet/buyCoupons/btn_bg.png);
                    background-size: contain;
                    border-radius: px2rem(100px);
                    z-index: 999;
                    .light{
                        position: absolute;
                        top: 30%;
                        right: px2rem(130px);
                        width: px2rem(100px);
                        height: px2rem(100px);
                        background-color: #fff;
                        opacity: 0;
                        border-radius: 50%;
                        &.running{
                            animation: scale 600ms linear;
                            -moz-animation: scale 600ms linear;
                            -webkit-animation: scale 600ms linear;
                            -o-animation: scale 600ms linear;
                        }
                    }
                }
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
                width: px2rem(600px);
                margin-top: px2rem(-510px);
                margin-left: px2rem(-300px);
                overflow: hidden;
                .pop_bg{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .close{
                    position: absolute;
                    top: px2rem(70px);
                    right: px2rem(30px);
                    width: px2rem(40px);
                    height: px2rem(40px);
                    z-index: 9;
                }
                .content-box{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }
            //分享成功
            .shareSuccess-contain{
                position: relative;
                height: px2rem(698px);
                border-radius: 0 0 px2rem(8px) px2rem(8px);
                .close{
                    top: px2rem(25px);
                }
                .pop_bg{
                    height: px2rem(698px);
                }
                .btn-contain{
                    position: absolute;
                    top: px2rem(540px);
                    width: 100%;
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(454px);
                        height: px2rem(119px);
                        line-height: px2rem(119px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background: url(/static/images/activity/applet/buyCoupons/btn_bg.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }

</style>
