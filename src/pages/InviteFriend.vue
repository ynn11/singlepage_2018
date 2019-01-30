<template>
    <div class="sharePoints-box">
        <div class="head">
            <img src="../assets/images/sharePoints/SP_bg.jpg" alt="">
        </div>
        <div class="contain">
            <img src="../assets/images/sharePoints/words_1.png" alt="" class="words">
            <p class="tip">&nbsp;<span>{{tip}}</span>&nbsp;</p>
            <input type="phone" placeholder="您好友的手机号码" class="phone" v-model="phoneNum" @click="clearTip">
            <div class="submit" @click="sendInvitation">邀请</div>
            <div class="rules">
                <p class="center">活动规则</p>
                <p>1.所有符合活动的门店会员均由门店自行选择权限开通。</p>
                <p>2.每位具备权限的会员，最多只能邀请2名好友参加。</p>
                <p>3.每位被邀请会员需关注好友所分享的店铺，才能获得 好友邀请时所拥有的50%积分复制。</p>
                <p>4.积分只能在关注门店内的积分商城兑换礼品，不可做 为其他用途。</p>
                <p>5.每位被邀请会员能且只能被邀请一次，且不是被邀请 商户的会员。</p>
                <p>6.本次活动最终解释权归门店所有。</p>
            </div>
        </div>
        <div class="shareTip" v-if="fromWX=='fromWX'" v-show="showShareTip" @click="closeToast">
            <div class="mask"></div>
            <img src="../assets/images/sharePoints/shareTip.png" alt="">
        </div>
        <div class="rs_toast" v-show="showToast">
            <div class="mask"></div>
            <div class="window">
                <div class="close" @click="closeToast">X</div>
                <img src="../assets/images/sharePoints/if_toast.jpg" alt="" class="if_bg">
                <img src="../assets/images/sharePoints/if_success.png" alt="" class="if_success">
                <div class="submit" @click="doInvited">点击告诉你的好友吧！</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../fetch/api'
import * as _validate from "../util/validate"
export default {
    components: {
    },
    data() {
        return {
            appUserCode: this.$route.query.appUserCode,
            memberCode: this.$route.query.memberCode,
            merchantCode: this.$route.query.merchantCode,
            storeCode: this.$route.query.storeCode,
            fromWX: this.$route.query.fromWX,
            token: this.$route.query.token,
            phoneNum: "",
            tip: "",
            tips:{
                left1: "邀请成功，还剩一个名额",
                left0: "邀请成功，该店铺邀请名额用完啦",
                nomore: "您在该店铺的邀请名额不足",
                repeat: "您已邀请过该好友",
                isVip: "该用户不满足活动要求",
                errorNum: "输入号码有误"
            },
            receiveUrl: "",
            showToast: false,
            showShareTip: false,
            userInfo: {},
            storeInfo: {}
        }
    },
    methods: {
        sendInvitation() {
            let data = {
                appUserCode: this.appUserCode,
                memberCode: this.memberCode,
                merchantCode: this.merchantCode,
                storeCode: this.storeCode,
                inviteMobileNum: this.phoneNum
            };
            if (_validate.mobile(data.inviteMobileNum)!==true) {
                this.tip = _validate.mobile(data.inviteMobileNum);
                return;
            }
            api.sendInvitation("post",data,this.token)
                .then(res => {
                    //接口返回失败
                    if (res.returnCode==="-1") {
                        alert(res.message);
                    }
                    //邀请成功
                    if (res.returnCode==="101") {
                        this.tip = res.message;
                        this.showToast = true;
                        this.receiveUrl = res.returnContent;
                    }
                    //邀请失败（102）
                    else{
                        this.tip = res.message;
                    }
                })
        },
        closeToast(){
            this.showToast = false;
            this.showShareTip = false;
        },
        clearTip(){
            this.tip = "";
        },
        doInvited(){
            var _this = this;
            //拦截安卓，ios调用分享
            if(_this.fromWX==="fromWX"){
                _this.showShareTip = true;
                //微信调用
                window.wx.ready(function(){
                    // 只显示分享给朋友
                    window.wx.showMenuItems({
                        menuList: [
                            "menuItem:share:appMessage"
                        ]
                    });
                    // 注册分享内容
                    window.wx.onMenuShareAppMessage({
                        title: '免费拿积分，商品免费换', // 分享标题
                        desc: '您的好友' + _this.userInfo.mobileNum + '邀请您关注' + _this.storeInfo.storeName + '店铺，并将他积分的一半' + Math.floor(_this.storeInfo.score/2) + '分享给您，赶紧领取积分免费换商品吧', // 分享描述
                        link: encodeURI(_this.receiveUrl), // 分享链接
                        imgUrl: _this.storeInfo.storeLogoUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
                return;
            }
            //app页面分享调起
            if(window.android){
                //调起Android分享
                window.android.doInvited(encodeURI(this.receiveUrl));
            }else{
                //调起Ios分享
                window.location.href = "doiosshare://doInvited?receiveUrl=" + encodeURI(this.receiveUrl);
            }
        }
    },
    mounted(){
        console.log(this.token)
        //获取用户信息
        api.getAppUserInfo("get",{appUserCode: this.appUserCode},this.token)
            .then(res => {
                if(res.returnCode==="0"){
                    //获取推送
                    this.userInfo = res.returnContent;
                }else{
                    //错误处理
                    alert(res.message);
                }
            });
        //获取已关注门店信息
        api.getMemberAttractStoreListByAppUserCode("get",{appUserCode: this.appUserCode},this.token)
            .then(res => {
                if(res.returnCode==="0"){
                    if(res.returnContent.length===0){
                        //没有门店处理
                    }else{
                        for (let i = 0; i < res.returnContent.length; i++) {
                            if(res.returnContent[i].storeCode === this.storeCode){
                                this.storeInfo = res.returnContent[i];
                            }
                        }
                    }
                }else{
                    //错误处理
                    alert(res.message);
                }
            });
        //获取微信签名并做微信配置
        let localHref = window.location.href;
        api.getSignMap("post",{url: localHref},this.token)
            .then(res => {
                if (res.returnCode==="0") {
                    let content = res.returnContent;
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: content.appId, // 必填，公众号的唯一标识
                        timestamp: content.timestamp, // 必填，生成签名的时间戳
                        nonceStr: content.nonceStr, // 必填，生成签名的随机串
                        signature: content.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage','showMenuItems','hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    window.wx.ready(function(){
                        // 邀请成功前屏蔽所有按钮
                        window.wx.hideOptionMenu();
                        //按照功能屏蔽微信按钮，已改用屏蔽全部按钮
                        // window.wx.hideMenuItems({
                        //     menuList: [
                        //         "menuItem:share:appMessage",
                        //         "menuItem:share:timeline",
                        //         "menuItem:share:qq",
                        //         "menuItem:share:weiboApp",
                        //         "menuItem:favorite",
                        //         "menuItem:share:facebook",
                        //         "menuItem:share:QZone"
                        //     ]
                        // });
                    });
                }else{
                    //错误处理
                    alert(res.message);
                }
            })
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../assets/css/function';
    .sharePoints-box{
        position: relative;
        height: 100%;
        background-color: #ff6d50;
        overflow-x: hidden;
        overflow-y: auto;
        .submit{
            position: relative;
            display: block;
            width: px2rem(548px);
            height: px2rem(90px);
            margin: px2rem(38px) auto px2rem(65px);
            line-height: px2rem(90px);
            background-color: #ffe23f;
            color: #302950;
            font-size: px2rem(30px);
            border: px2rem(5px) solid #272440;
            text-align: center;
            border-radius: px2rem(50px);
            &:before{
                position: absolute;
                top: px2rem(10px);
                left: px2rem(42px);
                content: " ";
                width: px2rem(10px);
                height: px2rem(10px);
                border-radius: 50%;
                background-color: #FFF;
            }
            &:after{
                position: absolute;
                top: px2rem(10px);
                left: px2rem(58px);
                content: " ";
                width: px2rem(70px);
                height: px2rem(10px);
                border-radius: px2rem(10px);
                background-color: #FFF;
            }
        }
        &:before{
            position: absolute;
            top: px2rem(745px);
            z-index: 1;
            content: " ";
            width: 0;
            height: 0;
            border-right: px2rem(750px) solid #fd6243;
            border-top: px2rem(750px) solid transparent;
            border-bottom: px2rem(750px) solid transparent;
        }
        .head{
            position: relative;
            z-index: 2;
            img{
                display: block;
                width: 100%;
            }
        }
        .contain{
            position: relative;
            z-index: 2;
            .words{
                margin: px2rem(40px) auto px2rem(20px);
                display: block;
                width: px2rem(575px);
            }
            .tip{
                color: #ffe448;
                font-size: px2rem(24px);
                margin-bottom: px2rem(10px);
                text-align: center;
            }
            .phone{
                display: block;
                width: px2rem(548px);
                height: px2rem(90px);
                margin: 0 auto;
                text-align: center;
                font-size: px2rem(24px);
                border: px2rem(5px) solid #FFF;
                border-radius: px2rem(50px);
                background-color: #FFF;
            }
            .rules{
                width: px2rem(645px);
                margin: 0 auto px2rem(95px);
                border: px2rem(3px) dashed #FFF;
                border-radius: px2rem(25px);
                padding: px2rem(25px) px2rem(16px);
                p{
                    font-size: px2rem(24px);
                    line-height: px2rem(38px);
                    color: #FFF;
                    margin: px2rem(25px) 0;
                    &.center{
                        text-align: center;
                    }
                }
            }
        }
        .rs_toast{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            text-align: center;
            z-index: 3;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.8);
                z-index: 1;
            }
            .window{
                position: relative;
                width: px2rem(660px);
                vertical-align: middle;
                margin: px2rem(340px) auto 0;
                background-color: #FFF;
                border-radius: px2rem(15px);
                padding-bottom: 1px;
                overflow: hidden;
                z-index: 2;
                &.down{
                    z-index: 0;
                }
                .close{
                    position: absolute;
                    top: px2rem(32px);
                    right: px2rem(32px);
                    width: px2rem(20px);
                    height: px2rem(20px);
                    line-height: px2rem(20px);
                    color: #FFF;
                    z-index: 999;
                }
                .if_bg{
                    width: 100%;
                }
                .if_success{
                    width: px2rem(240px);
                    margin: px2rem(80px) auto px2rem(24px);
                }
            }
        }
        .shareTip{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 4;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.8);
                z-index: 1;
            }
            img{
                position: absolute;
                top: px2rem(100px);
                width: 100%;
                z-index: 2;
            }
        }
    }
</style>
