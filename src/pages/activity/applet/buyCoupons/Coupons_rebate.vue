<template>
    <div class="myCoupons-rebate-box">
        <div class="mainContent">
            <div class="main_bg">
                <img src="/static/images/activity/applet/buyCoupons/rebate_bg.jpg" alt="">
            </div>
            <div class="rebate-content">
                <img src="/static/images/activity/applet/buyCoupons/rebate_tit.png" alt="" class="rebate-tit">
                <div class="rebate-list">
                    <div class="list-contain">
                        <div class="item" v-for="(item,index) in rebateList.invitedRewardList">
                            <img :src="item.headPicUrl" alt="" class="headpic">
                            <p>{{item.nickName}}  购买了  <i v-if="item.voucherCode==='e47605d8d3514fa09c2b30e55c55f915'">30抵100代金券<br>您获得 <span>5元</span> 奖励</i><i v-if="item.voucherCode==='3740359ecdce11e78c93704d7b87a020'">60抵200代金券<br>您获得 <span>10元</span> 奖励</i></p>
                        </div>
                    </div>
                    <div class="rebate-sum">您已经获得奖励，合计：<span>{{rebateList.totalRewardMoney}}</span> 元</div>
                </div>
                <img src="/static/images/activity/applet/buyCoupons/invite_tit.png" alt="" class="invite-tit">
                <div v-for="(item,index) in storeSet.voucherList">
                    <img src="/static/images/activity/applet/buyCoupons/invite_tip1.png" alt="" class="invite-tip" v-if="item.voucherCode==='e47605d8d3514fa09c2b30e55c55f915'">
                    <img src="/static/images/activity/applet/buyCoupons/invite_tip2.png" alt="" class="invite-tip" v-if="item.voucherCode==='3740359ecdce11e78c93704d7b87a020'">
                </div>
                <div class="share-btn" @click="shareTipShow=true;">好消息告知好友</div>
            </div>
        </div>
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
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
                if(sessionStorage.entryMark1 !== "marked"){
                    sessionStorage.entryMark1 = "marked"
                    vm.$router.go(0);
                    return;
                }
            })
        },
        data() {
            return {
                xd_code: this.$route.query.xd_code,
                shareTipShow: false,
                activityInfo: {},
                rebateList: [],
                storeSet: {}
            }
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
        methods: {
            //数据收集
            collect: function(data){
                api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
            },
            //获取门店活动设置
            getStoreSet: function(storeCode){
                let data = {
                    "storeCode": storeCode
                }
                api.getAttendArtifactActivityStore("get",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.storeSet = res.returnContent;
                    }else{
                        alert(res.message);
                    }
                })
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
                        this.activityInfo = res.returnContent;
                        this.rebateList = res.returnContent.activityInfo;
                        this.initWxShare();
                        this.getStoreSet(res.returnContent.storeCode);
                    }else{
                        alert(res.message);
                    }
                })
            }
        },
        mounted(){
            if(sessionStorage.entryMark1 !== "marked"){
                return;
            }
            this.initWxConfig();
            this.whetherAttend();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .myCoupons-rebate-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            background-color: #d23ccf;
            overflow-y: auto;
            .main_bg{
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .rebate-content{
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                color: #fff;
                overflow: hidden;
                margin-bottom: px2rem(350px);
                .rebate-tit{
                    display: block;
                    width: px2rem(750px);
                    margin: px2rem(610px) auto 0;
                }
                .rebate-list{
                    width: px2rem(638px);
                    margin: px2rem(40px) auto 0;
                    background-color: #fff;
                    border-radius: px2rem(20px);
                    box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.75);
                    -moz-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.75);
                    -webkit-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.75);
                    .list-contain{
                        width: px2rem(610px);
                        margin: 0 auto;
                        overflow-x: hidden;
                        overflow-y: auto;
                        max-height: px2rem(590px);
                        .item{
                            position: relative;
                            width: 100%;
                            height: px2rem(145px);
                            overflow: hidden;
                            &:after{
                                content: "";
                                position: absolute;
                                left: 50%;
                                bottom: 0;
                                width: px2rem(566px);
                                height: 1px;
                                margin-left: px2rem(-283px);
                                background-color: #e4e3e3;
                            }
                            img{
                                float: left;
                                width: px2rem(70px);
                                height: px2rem(70px);
                                border-radius: 50%;
                                background-color: #ccc;
                                margin: px2rem(37px) px2rem(20px);
                            }
                            p{
                                margin-top: px2rem(36px);
                                font-size: px2rem(24px);
                                line-height: px2rem(36px);
                                color: #212121;
                                i{
                                    font-style: normal;
                                }
                                span{
                                    color: #f7673a;
                                }
                            }
                        }
                    }
                    .rebate-sum{
                        font-size: px2rem(24px);
                        color: #303030;
                        text-align: center;
                        height: px2rem(100px);
                        line-height: px2rem(100px);
                        box-shadow: 0 px2rem(-6px) px2rem(35px) 0 rgba(109,20,110,.1);
                        -moz-box-shadow: 0 px2rem(-6px) px2rem(35px) 0 rgba(109,20,110,.1);
                        -webkit-box-shadow: 0 px2rem(-6px) px2rem(35px) 0 rgba(109,20,110,.1);
                        span{
                            color: #f7673a;
                        }
                    }
                }
                .invite-tit{
                    display: block;
                    width: px2rem(750px);
                    margin: px2rem(80px) auto 0;
                }
                .invite-tip{
                    display: block;
                    width: px2rem(750px);
                    margin: px2rem(45px) auto 0;
                }
                .share-btn{
                    position: fixed;
                    bottom: px2rem(78px);
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
                    z-index: 4;
                }
            }
        }
    }
</style>
