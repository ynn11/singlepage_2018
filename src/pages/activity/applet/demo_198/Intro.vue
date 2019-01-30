<template>
    <div class="demo_198-box">
        <div class="mainContent">
<!--             <img src="/static/images/activity/applet/198/main_title.png" class="main_bg" alt="">
            <img src="/static/images/activity/applet/198/card.png" class="main_bg" alt=""> -->
            <img src="/static/images/activity/applet/198/content2.png" class="main_bg" alt="">
            <div class="btn tobuy" @click="tobuy">立即办卡</div>
        </div>
        <v-loading v-show="loading"></v-loading>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <!-- <img class="pop_bg" src="/static/images/activity/applet/demonstration/pop_bind.png" alt=""> -->
                <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="bindMobileNumShow=false;">
                <div class="content-box">
                    <img src="/static/images/activity/applet/198/bind_title.png" alt="" class="title">
                    <input type="number" class="mobileNum" v-model="mobileNum" placeholder="输入您的手机号码">
                    <div class="btn-contain">
                        <div class="btn btn-bind" @click="bindMobileNum">绑定</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../../fetch/api'
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"
import * as _validate from "../../../../util/validate"

import loading from '@/components/common/loading'
export default {
    components: {
        "v-loading": loading,
    },
    data() {
        return {
            storeCode: this.$route.query.storeCode,
            staffCode: this.$route.query.staffCode,
            memberCode: this.$route.query.memberCode,
            mobileNum: "",
            bindMobileNumShow: false,
            loading: false,
            activityInfo: {}
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
        //浏览活动链接
        browseVipActivity: function(){
            api.browseVipActivity("get",{
                staffCode: this.staffCode,
                memberCode: this.memberCode
            },this.tokenInfo.token).then((res)=>{

            });
        },
        //粉丝关注/用户关注
        concernStore: function(){
            let data = {
                "storeCode": this.storeCode,
                "staffCode": this.staffCode,
                "mobileNum": "",
                "verificationCode": "",
                "appEntranceType": 3,
                "trueName": ""
            }
            api.followStoreStaffByShare("post",data,this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){

                }else{
                    this.$toast(res.message);
                }
            })
        },
        //前往购买
        tobuy: function(){
            if (this.tokenInfo.imInfo===null){
                this.bindMobileNumShow = true;
                return;
            }
            this.attendActivity();
        },
        attendActivity: function(){
            api.purchaseVipActivity("post",{
                openId: this.openId,
                staffCode: this.staffCode,
                memberCode: this.memberCode||null
            },this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    wx.chooseWXPay({
                        timestamp: res.returnContent.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.returnContent.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.returnContent.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.returnContent.paySign, // 支付签名
                        success: (sres)=> {
                            api.confirmVipActivityOrderPaid("get",{
                                orderNum: res.returnContent.orderNum
                            },this.tokenInfo.token).then((res)=>{
                                this.$toast("您已成功参与！");
                                let src = "/activity_2018/demo_198_success?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
                                this.$router.replace(src);
                            })
                        },
                        fail: (fres)=>{
                            this.$toast("支付失败！");
                        }
                    });
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    this.$toast(res.message);
                }
            })
        },
        //绑定手机号
        bindMobileNum() {
            let data = {
                "mobileNum": this.mobileNum,
                "appEntranceType": 3
            }
            if (_validate.mobile(data.mobileNum)!==true) {
                this.$toast(_validate.mobile(data.mobileNum));
                return;
            }
            api.memFansBindMobileNumNotVerifying("post",data,this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    this.$store.dispatch("_login",{tokenInfo: JSON.stringify(res.returnContent),openId: this.openId});
                    this.attendActivity();
                    this.bindMobileNumShow = false;
                }else{
                    this.$toast(res.message);
                    this.bindMobileNumShow = false;
                }
            })
        },
        //是否参加活动
        whetherAttend: function(){
            api.whetherAttendVipActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    if (res.returnContent.attendFlag===1) {
                        let src = "/activity_2018/demo_198_success?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
                        this.$router.replace(src);
                    }else{
                        this.loading = false;
                    }
                    this.activityInfo = res.returnContent;
                    this.loading = false;
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    this.$toast(res.message);
                }
            })
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
                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            });
        },
    },
    mounted(){
        //如果是小白，且为导购分享链接，则关注门店
        if (this.storeCode) {
            this.concernStore();
        }
        this.browseVipActivity();
        if (this.tokenInfo.imInfo===null){
            this.bindMobileNumShow = true;
            this.loading = false;
        }else{
            this.whetherAttend();
        }
        this.initWxConfig();
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .demo_198-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            /*height: 100%;*/
            // padding:px2rem(150px) 0 px2rem(220px);
            // background: url(/static/images/activity/applet/198/bg.jpg) center repeat-y /100% auto;
            .main_bg{
                display: block;
                width: 100%;
            }
            .introduce-content{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                .coupons-contain{
                    width: px2rem(640px);
                    background-color: #fff;
                    overflow: hidden;
                    margin: 0 auto;
                    border-radius: px2rem(24px);
                    margin-top: px2rem(668px);
                    box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    -moz-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    -webkit-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    &.coupons-contain2{
                        margin-top: px2rem(45px);
                    }
                    .item{
                        display: block;
                        width: px2rem(578px);
                        margin: px2rem(32px) auto;
                        &.select-tip{
                            width: px2rem(340px);
                        }
                    }
                }
                .handle-tip{
                    display: block;
                    margin: px2rem(80px) auto 0;
                    width: px2rem(750px);
                }
                .rules-contain{
                    position: relative;
                    margin-top: px2rem(64px);
                    .introduce-tit{
                        display: block;
                        width: px2rem(750px);
                        margin: 0 auto;
                    }
                    .item{
                        font-size: px2rem(24px);
                        color: #fff;
                        text-indent: px2rem(60px);
                        margin-top: px2rem(24px);
                    }
                }
            }
            .btn{
                position: fixed;
                bottom: px2rem(78px);
                left: 50%;
                margin-left: px2rem(-307px);
                width: px2rem(584px);
                height: px2rem(90px);
                line-height: px2rem(90px);
                font-size: px2rem(36px);
                color: #fff;
                text-align: center;
                background: linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                background: -webkit-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                background: -moz-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                border-radius: px2rem(100px);
                z-index: 4;
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
            //用户绑定弹窗
            .bindMobileNum-contain{
                width: px2rem(606px);
                height: px2rem(554px);
                background-color: #fff;
                border-radius: px2rem(8px);
                .close{
                    top: px2rem(50px);
                }
                .title{
                    display: block;
                    width: px2rem(362px);
                    margin: px2rem(90px) auto;
                }
                .mobileNum{
                    display: block;
                    width: px2rem(520px);
                    margin: px2rem(20px) auto 0;
                    height: px2rem(90px);
                    font-size: px2rem(28px);
                    background-color: #fff;
                    text-indent: px2rem(8px);
                    border-bottom: 1px solid #dededf;
                    text-align: center;
                }
                .btn-contain{
                    margin-top: px2rem(70px);
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(424px);
                        height: px2rem(90px);
                        line-height: px2rem(90px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background: linear-gradient(90deg,#7f3292, #e84d5d);
                        background: -webkit-linear-gradient(90deg,#7f3292, #e84d5d);
                        background: -moz-linear-gradient(90deg,#7f3292, #e84d5d);
                        border-radius: px2rem(50px);
                    }
                }
            }
        }
    }
</style>
